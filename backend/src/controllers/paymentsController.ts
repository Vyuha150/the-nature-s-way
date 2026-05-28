import crypto from "crypto";
import { ApiError } from "../middlewares/error";
import { env } from "../config/env";
import { razorpay } from "../utils/razorpay";
import { Order } from "../models/Order";
import { createPaymentOrder, getOrderForUser } from "./ordersController";

function verifySignature(orderId: string, paymentId: string, signature: string) {
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function mapRazorpayStatus(status: string) {
  if (status === "paid") return "captured" as const;
  if (status === "attempted") return "authorized" as const;
  if (status === "failed") return "failed" as const;
  return "created" as const;
}

export async function createRazorpayOrder(userId: string, items: { productId: string; quantity: number }[], source?: string) {
  const order = await createPaymentOrder(userId, items, source);
  if (!order) throw new ApiError(500, "Order creation failed");

  const amount = Math.round(order.total * 100);
  if (amount <= 0) throw new ApiError(400, "Invalid amount");

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: order.orderNumber,
    notes: { orderId: order._id.toString() },
  });

  await Order.updateOne(
    { _id: order._id },
    {
      $set: {
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "created",
        paymentUpdatedAt: new Date(),
      },
    },
  );

  return {
    keyId: env.RAZORPAY_KEY_ID,
    orderId: order._id.toString(),
    orderNumber: order.orderNumber,
    amount,
    currency: razorpayOrder.currency,
    razorpayOrderId: razorpayOrder.id,
  };
}

export async function verifyRazorpayPayment(userId: string, data: { orderId: string; razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) {
  const order = await getOrderForUser(userId, data.orderId);
  if (!order) throw new ApiError(404, "Order not found");
  if (order.razorpayOrderId && order.razorpayOrderId !== data.razorpayOrderId) {
    throw new ApiError(400, "Order mismatch");
  }

  const valid = verifySignature(data.razorpayOrderId, data.razorpayPaymentId, data.razorpaySignature);
  if (!valid) throw new ApiError(400, "Invalid payment signature");

  const updated = await Order.findByIdAndUpdate(
    order._id,
    {
      $set: {
        razorpayOrderId: data.razorpayOrderId,
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
        paymentStatus: "captured",
        status: order.status === "Pending" ? "Paid" : order.status,
        paidAt: new Date(),
        paymentUpdatedAt: new Date(),
      },
    },
    { new: true },
  ).lean();

  return updated;
}

export async function refreshRazorpayPaymentForUser(userId: string, orderId: string) {
  const order = await getOrderForUser(userId, orderId);
  return refreshRazorpayPayment(order._id.toString());
}

export async function refreshRazorpayPayment(orderId: string) {
  const order = await Order.findById(orderId).lean();
  if (!order) throw new ApiError(404, "Order not found");
  if (!order.razorpayOrderId) throw new ApiError(400, "Missing Razorpay order id");

  const rpOrder = await razorpay.orders.fetch(order.razorpayOrderId);
  const status = mapRazorpayStatus(rpOrder.status);

  let paymentId = order.razorpayPaymentId || "";
  let paymentStatus = status;
  let paidAt = order.paidAt ?? null;

  const payments = await razorpay.orders.fetchPayments(order.razorpayOrderId);
  const captured = payments.items?.find((p) => p.status === "captured");
  if (captured) {
    paymentId = captured.id;
    paymentStatus = "captured";
    paidAt = new Date(captured.created_at * 1000);
  }

  const nextStatus = paymentStatus === "captured" && order.status === "Pending" ? "Paid" : order.status;

  const updated = await Order.findByIdAndUpdate(
    order._id,
    {
      $set: {
        paymentStatus,
        razorpayPaymentId: paymentId,
        status: nextStatus,
        paidAt,
        paymentUpdatedAt: new Date(),
      },
    },
    { new: true },
  ).lean();

  return updated;
}
