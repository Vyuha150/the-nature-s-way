import { z } from "zod";

export const pageUpdateSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  route: z.string().min(1).max(200).optional(),
  status: z.enum(["Published", "Draft"]).optional(),
});

export const pageCreateSchema = z.object({
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(120),
  route: z.string().min(1).max(200),
  status: z.enum(["Published", "Draft"]).default("Draft"),
});

export const sectionCreateSchema = z.object({
  pageSlug: z.string().min(1).max(120),
  pageTitle: z.string().min(1).max(120),
  key: z.string().min(1).max(120),
  heading: z.string().min(1).max(200),
  body: z.string().min(1).max(5000),
});

export const sectionUpdateSchema = sectionCreateSchema.partial();

export const sectionQuerySchema = z.object({
  pageSlug: z.string().optional(),
  pageTitle: z.string().optional(),
});
