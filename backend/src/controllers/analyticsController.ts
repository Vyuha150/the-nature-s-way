import { ApiError } from "../middlewares/error";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";

const revenueStatuses = ["Paid", "Shipped", "Delivered"] as const;
const DAY_MS = 24 * 60 * 60 * 1000;

function parseDateRange(from?: string, to?: string) {
  const end = to ? new Date(to) : new Date();
  const start = from ? new Date(from) : new Date(end.getFullYear(), end.getMonth() - 11, 1);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new ApiError(400, "Invalid date range");
  }

  return { start, end };
}

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function buildLastMonths(end: Date, count: number) {
  const months: { key: string; label: string; date: Date }[] = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - i, 1));
    const key = monthKey(d);
    const label = d.toLocaleString("en-US", { month: "short" });
    months.push({ key, label, date: d });
  }
  return months;
}

export async function getAnalyticsOverview(from?: string, to?: string) {
  const { start, end } = parseDateRange(from, to);
  const months = buildLastMonths(end, 12);

  const salesAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        sales: { $sum: "$total" },
        customers: { $addToSet: "$customer" },
      },
    },
  ]);

  const salesMap = new Map<string, { sales: number; visitors: number }>();
  for (const row of salesAgg) {
    const key = `${row._id.year}-${String(row._id.month).padStart(2, "0")}`;
    salesMap.set(key, { sales: row.sales, visitors: row.customers.length });
  }

  const salesByMonth = months.map((m) => {
    const stats = salesMap.get(m.key) ?? { sales: 0, visitors: 0 };
    return { month: m.label, sales: Math.round(stats.sales), visitors: stats.visitors };
  });

  const categoryPerformance = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.category",
        sales: { $sum: "$items.lineTotal" },
      },
    },
    { $sort: { sales: -1 } },
    { $limit: 8 },
    { $project: { _id: 0, category: "$_id", sales: 1 } },
  ]);

  const topProductsAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        name: { $first: "$items.name" },
        revenue: { $sum: "$items.lineTotal" },
        sales: { $sum: "$items.quantity" },
        category: { $first: "$items.category" },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 },
  ]);

  const productIds = topProductsAgg.map((p) => p._id);
  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const topProducts = topProductsAgg.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    revenue: Math.round(p.revenue),
    sales: p.sales,
    stock: productMap.get(p._id.toString())?.stock ?? 0,
    category: p.category,
  }));

  const topCustomersAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    {
      $group: {
        _id: "$customer",
        orders: { $sum: 1 },
        spent: { $sum: "$total" },
      },
    },
    { $sort: { spent: -1 } },
    { $limit: 6 },
  ]);

  const customerIds = topCustomersAgg.map((c) => c._id);
  const customers = await User.find({ _id: { $in: customerIds } }).lean();
  const customerMap = new Map(customers.map((c) => [c._id.toString(), c]));

  const topCustomers = topCustomersAgg.map((c) => ({
    id: c._id.toString(),
    name: customerMap.get(c._id.toString())?.name ?? "",
    orders: c.orders,
    spent: Math.round(c.spent),
    ltv: Math.round(c.spent),
  }));

  const users = await User.find({ role: "customer" }).select({ _id: 1, createdAt: 1 }).lean();
  const orders = await Order.find({ status: { $in: revenueStatuses } }).select({ customer: 1, createdAt: 1 }).lean();

  const totalUsers = users.length;
  const userCreated = new Map(users.map((u) => [u._id.toString(), u.createdAt]));
  const weekly: { week: number; users: Set<string> }[] = Array.from({ length: 8 }, (_v, i) => ({ week: i + 1, users: new Set() }));

  for (const order of orders) {
    const createdAt = userCreated.get(order.customer.toString());
    if (!createdAt) continue;
    const diffDays = Math.floor((order.createdAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7) + 1;
    if (week >= 1 && week <= 8) {
      weekly[week - 1].users.add(order.customer.toString());
    }
  }

  const cohortRetention = weekly.map((w) => ({
    week: `W${w.week}`,
    retention: totalUsers === 0 ? 0 : Math.round((w.users.size / totalUsers) * 100),
  }));

  return { salesByMonth, categoryPerformance, topProducts, topCustomers, cohortRetention };
}

function calcDelta(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export async function getDashboardOverview() {
  const end = new Date();
  const start = new Date(end.getTime() - 29 * DAY_MS);
  const prevEnd = new Date(start.getTime() - DAY_MS);
  const prevStart = new Date(prevEnd.getTime() - 29 * DAY_MS);

  const [currentAgg, prevAgg] = await Promise.all([
    Order.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
          customers: { $addToSet: "$customer" },
        },
      },
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: prevStart, $lte: prevEnd }, status: { $in: revenueStatuses } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
          customers: { $addToSet: "$customer" },
        },
      },
    ]),
  ]);

  const current = currentAgg[0] ?? { revenue: 0, orders: 0, customers: [] as string[] };
  const previous = prevAgg[0] ?? { revenue: 0, orders: 0, customers: [] as string[] };

  const totalCustomers = await User.countDocuments({ role: "customer" });
  const currentCustomers = current.customers.length;
  const previousCustomers = previous.customers.length;

  const conversion = currentCustomers === 0 ? 0 : Math.round((current.orders / currentCustomers) * 1000) / 10;
  const prevConversion = previousCustomers === 0 ? 0 : Math.round((previous.orders / previousCustomers) * 1000) / 10;

  const kpis = {
    revenue: { value: Math.round(current.revenue), delta: calcDelta(current.revenue, previous.revenue) },
    orders: { value: current.orders, delta: calcDelta(current.orders, previous.orders) },
    customers: { value: totalCustomers, delta: calcDelta(currentCustomers, previousCustomers) },
    conversion: { value: conversion, delta: calcDelta(conversion, prevConversion) },
  };

  const trafficSources = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    { $group: { _id: "$source", value: { $sum: 1 } } },
    { $sort: { value: -1 } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);

  const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(6).lean();

  const salesAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: new Date(end.getTime() - 365 * DAY_MS), $lte: end }, status: { $in: revenueStatuses } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        sales: { $sum: "$total" },
        customers: { $addToSet: "$customer" },
      },
    },
  ]);

  const months = buildLastMonths(end, 12);
  const salesMap = new Map<string, { sales: number; visitors: number }>();
  for (const row of salesAgg) {
    const key = `${row._id.year}-${String(row._id.month).padStart(2, "0")}`;
    salesMap.set(key, { sales: row.sales, visitors: row.customers.length });
  }

  const salesByMonth = months.map((m) => {
    const stats = salesMap.get(m.key) ?? { sales: 0, visitors: 0 };
    return { month: m.label, sales: Math.round(stats.sales), visitors: stats.visitors };
  });

  const topProductsAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end }, status: { $in: revenueStatuses } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        name: { $first: "$items.name" },
        revenue: { $sum: "$items.lineTotal" },
        sales: { $sum: "$items.quantity" },
        category: { $first: "$items.category" },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 },
  ]);

  const productIds = topProductsAgg.map((p) => p._id);
  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const topProducts = topProductsAgg.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    revenue: Math.round(p.revenue),
    sales: p.sales,
    stock: productMap.get(p._id.toString())?.stock ?? 0,
    category: p.category,
  }));

  return {
    kpis,
    trafficSources,
    recentOrders: recentOrders.map((o) => ({
      id: o._id.toString(),
      orderNumber: o.orderNumber,
      customer: o.customerName,
      total: o.total,
      status: o.status,
      date: o.createdAt.toISOString().slice(0, 10),
    })),
    salesByMonth,
    topProducts,
  };
}
