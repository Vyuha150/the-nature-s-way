import type { AnalyticsDashboard, AnalyticsOverview, Customer, Order, Page, Paginated, Product, Section } from "./types";
import { api } from "./client";

export const adminApi = {
  listProducts(params: { search?: string; status?: string; page?: number; limit?: number }) {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.status) qs.set("status", params.status);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return api.request<Paginated<Product>>(`/admin/products?${qs.toString()}`);
  },
  createProduct(data: { name: string; category: string; price: number; stock: number; status: string; description?: string }) {
    return api.request<Product>("/admin/products", { method: "POST", body: JSON.stringify(data) });
  },
  updateProduct(id: string, data: Partial<{ name: string; category: string; price: number; stock: number; status: string; description?: string }>) {
    return api.request<Product>(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  deleteProduct(id: string) {
    return api.request<void>(`/admin/products/${id}`, { method: "DELETE" });
  },

  listOrders(params: { search?: string; status?: string; page?: number; limit?: number }) {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.status) qs.set("status", params.status);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return api.request<Paginated<Order>>(`/admin/orders?${qs.toString()}`);
  },
  updateOrderStatus(id: string, status: string) {
    return api.request<Order>(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  deleteOrder(id: string) {
    return api.request<void>(`/admin/orders/${id}`, { method: "DELETE" });
  },
  refreshOrderPayment(id: string) {
    return api.request<Order>(`/admin/orders/${id}/refresh-payment`, { method: "POST" });
  },

  listCustomers(params: { search?: string; page?: number; limit?: number }) {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return api.request<Paginated<Customer>>(`/admin/customers?${qs.toString()}`);
  },
  createCustomer(data: { name: string; email: string; password: string; tier: string }) {
    return api.request<Customer>("/admin/customers", { method: "POST", body: JSON.stringify(data) });
  },
  updateCustomer(id: string, data: Partial<{ name: string; email: string; password: string; tier: string }>) {
    return api.request<Customer>(`/admin/customers/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  deleteCustomer(id: string) {
    return api.request<void>(`/admin/customers/${id}`, { method: "DELETE" });
  },

  listPages() {
    return api.request<Page[]>("/admin/content/pages");
  },
  createPage(data: { slug: string; title: string; route: string; status: string }) {
    return api.request<Page>("/admin/content/pages", { method: "POST", body: JSON.stringify(data) });
  },
  updatePage(slug: string, data: Partial<{ title: string; route: string; status: string }>) {
    return api.request<Page>(`/admin/content/pages/${slug}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  deletePage(slug: string) {
    return api.request<void>(`/admin/content/pages/${slug}`, { method: "DELETE" });
  },

  listSections(params?: { pageSlug?: string; pageTitle?: string }) {
    const qs = new URLSearchParams();
    if (params?.pageSlug) qs.set("pageSlug", params.pageSlug);
    if (params?.pageTitle) qs.set("pageTitle", params.pageTitle);
    const suffix = qs.toString();
    return api.request<Section[]>(`/admin/content/sections${suffix ? `?${suffix}` : ""}`);
  },
  createSection(data: { pageSlug: string; pageTitle: string; key: string; heading: string; body: string }) {
    return api.request<Section>("/admin/content/sections", { method: "POST", body: JSON.stringify(data) });
  },
  updateSection(id: string, data: Partial<{ pageSlug: string; pageTitle: string; key: string; heading: string; body: string }>) {
    return api.request<Section>(`/admin/content/sections/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  deleteSection(id: string) {
    return api.request<void>(`/admin/content/sections/${id}`, { method: "DELETE" });
  },

  getAnalyticsOverview(params?: { from?: string; to?: string }) {
    const qs = new URLSearchParams();
    if (params?.from) qs.set("from", params.from);
    if (params?.to) qs.set("to", params.to);
    const suffix = qs.toString();
    return api.request<AnalyticsOverview>(`/admin/analytics/overview${suffix ? `?${suffix}` : ""}`);
  },
  getAnalyticsDashboard() {
    return api.request<AnalyticsDashboard>("/admin/analytics/dashboard");
  },
};
