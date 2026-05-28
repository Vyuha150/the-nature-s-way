import type { Order, Paginated, Product, RazorpayOrderResponse } from "./types";
import { api } from "./client";

export const shopApi = {
  listProducts(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    const suffix = qs.toString();
    return api.request<Paginated<Product>>(`/products${suffix ? `?${suffix}` : ""}`);
  },
  getProduct(id: string) {
    return api.request<Product>(`/products/${id}`);
  },
  listOrders() {
    return api.request<Paginated<Order>>("/orders/me");
  },
  createRazorpayOrder(data: { items: { productId: string; quantity: number }[]; source?: string }) {
    return api.request<RazorpayOrderResponse>("/payments/razorpay/order", { method: "POST", body: JSON.stringify(data) });
  },
  verifyRazorpayPayment(data: { orderId: string; razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) {
    return api.request<Order>("/payments/razorpay/verify", { method: "POST", body: JSON.stringify(data) });
  },
  refreshRazorpayPayment(orderId: string) {
    return api.request<Order>(`/payments/razorpay/refresh/${orderId}`, { method: "POST" });
  },
};
