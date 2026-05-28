import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().min(1).max(120),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  status: z.enum(["Active", "Draft", "Archived"]),
  description: z.string().max(2000).optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Active", "Draft", "Archived"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
