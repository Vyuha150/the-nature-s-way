import mongoose, { Schema } from "mongoose";

export type OrderStatus = "Pending" | "Paid" | "Shipped" | "Delivered" | "Refunded";
export type PaymentStatus = "created" | "authorized" | "captured" | "failed";

export interface OrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderDoc {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;
  customer: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  source?: string;
  paymentProvider?: "razorpay";
  paymentStatus?: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paidAt?: Date | null;
  paymentUpdatedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema<OrderDoc>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    status: { type: String, enum: ["Pending", "Paid", "Shipped", "Delivered", "Refunded"], required: true },
    total: { type: Number, required: true, min: 0 },
    source: { type: String, default: "" },
    paymentProvider: { type: String, enum: ["razorpay"], default: "razorpay" },
    paymentStatus: { type: String, enum: ["created", "authorized", "captured", "failed"], default: "created" },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
    paidAt: { type: Date, default: null },
    paymentUpdatedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ status: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ source: 1 });
orderSchema.index({ razorpayOrderId: 1 });

export const Order = mongoose.model<OrderDoc>("Order", orderSchema);
