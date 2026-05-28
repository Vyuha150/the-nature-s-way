import mongoose from "mongoose";
import { ApiError } from "../middlewares/error";
import { Order, OrderStatus } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { buildPagination } from "../utils/pagination";

function formatOrderNumber() {
  const date = new Date();
  const y = String(date.getUTCFullYear()).slice(2);
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const rand = Math.floor(100 + Math.random() * 900);
  return `#${y}${m}${d}${rand}`;
}

async function createUniqueOrderNumber() {
  for (let i = 0; i < 5; i += 1) {
    const candidate = formatOrderNumber();
    const exists = await Order.exists({ orderNumber: candidate });
    if (!exists) return candidate;
  }
  throw new ApiError(500, "Failed to allocate order number");
}

async function reserveStock(session: mongoose.ClientSession, items: { productId: string; quantity: number }[]) {
  const orderItems = [] as { product: mongoose.Types.ObjectId; name: string; category: string; price: number; quantity: number; lineTotal: number }[];

  for (const item of items) {
    const product = await Product.findOneAndUpdate(
      { _id: item.productId, stock: { $gte: item.quantity }, status: { $ne: "Archived" } },
      { $inc: { stock: -item.quantity } },
      { new: true, session },
    );

    if (!product) {
      throw new ApiError(409, "Insufficient stock or product not available");
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    });
  }

  return orderItems;
}

export async function createOrder(userId: string, items: { productId: string; quantity: number }[], source?: string) {
  const user = await User.findById(userId).lean();
  if (!user) throw new ApiError(404, "User not found");

  const session = await mongoose.startSession();
  let orderId: mongoose.Types.ObjectId | null = null;

  await session.withTransaction(async () => {
    const orderItems = await reserveStock(session, items);
    const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const orderNumber = await createUniqueOrderNumber();
    const order = await Order.create([
      {
        orderNumber,
        customer: user._id,
        customerName: user.name,
        customerEmail: user.email,
        items: orderItems,
        status: "Pending",
        total,
        source: source ?? "Direct",
        paymentProvider: "razorpay",
        paymentStatus: "created",
      },
    ], { session });

    orderId = order[0]._id;
  });

  session.endSession();

  if (!orderId) throw new ApiError(500, "Order creation failed");
  return Order.findById(orderId).lean();
}

export async function createPaymentOrder(userId: string, items: { productId: string; quantity: number }[], source?: string) {
  return createOrder(userId, items, source);
}

export async function listMyOrders(userId: string, query: { page: number; limit: number }) {
  const { page, limit, skip } = buildPagination(query.page, query.limit);
  const filter = { customer: userId };
  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);
  return { items, total, page, limit };
}

export async function adminListOrders(query: { search?: string; status?: OrderStatus; page: number; limit: number }) {
  const { page, limit, skip } = buildPagination(query.page, query.limit);
  const filter: Record<string, unknown> = {};

  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.$or = [
      { orderNumber: { $regex: query.search, $options: "i" } },
      { customerName: { $regex: query.search, $options: "i" } },
      { customerEmail: { $regex: query.search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function getOrder(id: string) {
  const order = await Order.findById(id).lean();
  if (!order) throw new ApiError(404, "Order not found");
  return order;
}

export async function getOrderForUser(userId: string, orderId: string) {
  const order = await Order.findOne({ _id: orderId, customer: userId }).lean();
  if (!order) throw new ApiError(404, "Order not found");
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!order) throw new ApiError(404, "Order not found");
  return order;
}

export async function deleteOrder(id: string) {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new ApiError(404, "Order not found");
}
