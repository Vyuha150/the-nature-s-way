import { z } from "zod";

export const orderCreateSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1),
    }),
  ).min(1),
  source: z.string().min(1).max(80).optional(),
});

export const orderStatusSchema = z.object({
  status: z.enum(["Pending", "Paid", "Shipped", "Delivered", "Refunded"]),
});

export const orderQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Pending", "Paid", "Shipped", "Delivered", "Refunded"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
