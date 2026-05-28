import { ApiError } from "../middlewares/error";
import { PipelineStage } from "mongoose";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";
import { hashPassword } from "../utils/password";
import { buildPagination } from "../utils/pagination";

export async function listCustomers(query: { search?: string; page: number; limit: number }) {
  const { page, limit, skip } = buildPagination(query.page, query.limit);
  const match: Record<string, unknown> = { role: "customer" };
  if (query.search) {
    match.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];
  }

  const pipeline: PipelineStage[] = [
    { $match: match },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customer",
        as: "orders",
      },
    },
    {
      $addFields: {
        ordersCount: { $size: "$orders" },
        spent: { $sum: "$orders.total" },
      },
    },
    {
      $project: {
        orders: 0,
        passwordHash: 0,
      },
    },
  ];

  const [items, total] = await Promise.all([
    User.aggregate(pipeline),
    User.countDocuments(match),
  ]);

  return { items, total, page, limit };
}

export async function createCustomer(data: { name: string; email: string; password: string; tier: "VIP" | "Returning" | "New" }) {
  const exists = await User.findOne({ email: data.email }).lean();
  if (exists) throw new ApiError(409, "Email already in use");

  const passwordHash = await hashPassword(data.password);
  return User.create({ name: data.name, email: data.email, passwordHash, role: "customer", tier: data.tier });
}

export async function updateCustomer(id: string, data: Partial<{ name: string; email: string; password: string; tier: "VIP" | "Returning" | "New" }>) {
  const update: Record<string, unknown> = { ...data };
  if (data.password) {
    update.passwordHash = await hashPassword(data.password);
    delete update.password;
  }

  const user = await User.findOneAndUpdate({ _id: id, role: "customer" }, update, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "Customer not found");
  return user;
}

export async function deleteCustomer(id: string) {
  const user = await User.findOneAndDelete({ _id: id, role: "customer" });
  if (!user) throw new ApiError(404, "Customer not found");

  await RefreshToken.deleteMany({ user: user._id });
}
