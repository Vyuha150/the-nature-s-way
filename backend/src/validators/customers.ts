import { z } from "zod";

export const customerCreateSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(200),
  tier: z.enum(["VIP", "Returning", "New"]).default("New"),
});

export const customerUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(200).optional(),
  tier: z.enum(["VIP", "Returning", "New"]).optional(),
});

export const customerQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
