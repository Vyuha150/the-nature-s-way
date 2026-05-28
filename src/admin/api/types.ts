export type AdminSession = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  tier: "VIP" | "Returning" | "New";
  createdAt: string;
};

export type ProductStatus = "Active" | "Draft" | "Archived";

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = "Pending" | "Paid" | "Shipped" | "Delivered" | "Refunded";

export type OrderItem = {
  product: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  _id: string;
  orderNumber: string;
  customer: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  source?: string;
  paymentStatus?: "created" | "authorized" | "captured" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: string | null;
  paymentUpdatedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  _id: string;
  name: string;
  email: string;
  tier: "VIP" | "Returning" | "New";
  ordersCount?: number;
  spent?: number;
  createdAt: string;
  updatedAt: string;
};

export type Page = {
  _id: string;
  slug: string;
  title: string;
  route: string;
  status: "Published" | "Draft";
  createdAt: string;
  updatedAt: string;
};

export type Section = {
  _id: string;
  pageSlug: string;
  pageTitle: string;
  key: string;
  heading: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type AnalyticsOverview = {
  salesByMonth: { month: string; sales: number; visitors: number }[];
  categoryPerformance: { category: string; sales: number }[];
  topProducts: { id: string; name: string; revenue: number; sales: number; stock: number; category: string }[];
  topCustomers: { id: string; name: string; orders: number; spent: number; ltv: number }[];
  cohortRetention: { week: string; retention: number }[];
};

export type AnalyticsDashboard = {
  kpis: {
    revenue: { value: number; delta: number };
    orders: { value: number; delta: number };
    customers: { value: number; delta: number };
    conversion: { value: number; delta: number };
  };
  trafficSources: { name: string; value: number }[];
  recentOrders: { id: string; orderNumber: string; customer: string; total: number; status: OrderStatus; date: string }[];
  salesByMonth: { month: string; sales: number; visitors: number }[];
  topProducts: { id: string; name: string; revenue: number; sales: number; stock: number; category: string }[];
};
