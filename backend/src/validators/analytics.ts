import { z } from "zod";

export const analyticsQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});
