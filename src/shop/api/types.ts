export type UserSession = {
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
export type PaymentStatus = "created" | "authorized" | "captured" | "failed";

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
  paymentStatus?: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: string | null;
  paymentUpdatedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type RazorpayOrderResponse = {
  keyId: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
};
