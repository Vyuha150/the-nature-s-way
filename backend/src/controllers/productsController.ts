import { ApiError } from "../middlewares/error";
import { Product } from "../models/Product";
import { buildPagination } from "../utils/pagination";

export async function listProducts(query: {
  search?: string;
  status?: "Active" | "Draft" | "Archived";
  page: number;
  limit: number;
  includeAll?: boolean;
}) {
  const { page, limit, skip } = buildPagination(query.page, query.limit);
  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.status) {
    filter.status = query.status;
  } else if (!query.includeAll) {
    filter.status = "Active";
  }

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function getProduct(id: string) {
  const product = await Product.findById(id).lean();
  if (!product) throw new ApiError(404, "Product not found");
  return product;
}

export async function createProduct(data: {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Archived";
  description?: string;
}) {
  return Product.create(data);
}

export async function updateProduct(id: string, data: Partial<{ name: string; category: string; price: number; stock: number; status: string; description?: string }>) {
  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!product) throw new ApiError(404, "Product not found");
  return product;
}

export async function deleteProduct(id: string) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
}
