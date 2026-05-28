import { ApiError } from "../middlewares/error";
import { Page } from "../models/Page";
import { Section } from "../models/Section";

export async function listPages() {
  return Page.find().sort({ title: 1 }).lean();
}

export async function listPublishedPages() {
  return Page.find({ status: "Published" }).sort({ title: 1 }).lean();
}

export async function createPage(data: { slug: string; title: string; route: string; status: "Published" | "Draft" }) {
  return Page.create(data);
}

export async function updatePage(slug: string, data: { title?: string; route?: string; status?: "Published" | "Draft" }) {
  const page = await Page.findOneAndUpdate({ slug }, data, { new: true, runValidators: true });
  if (!page) throw new ApiError(404, "Page not found");
  return page;
}

export async function deletePage(slug: string) {
  const page = await Page.findOneAndDelete({ slug });
  if (!page) throw new ApiError(404, "Page not found");
}

export async function listSections(query: { pageSlug?: string; pageTitle?: string }) {
  const filter: Record<string, unknown> = {};
  if (query.pageSlug) filter.pageSlug = query.pageSlug;
  if (query.pageTitle) filter.pageTitle = query.pageTitle;
  return Section.find(filter).sort({ updatedAt: -1 }).lean();
}

export async function listPublishedSections(query: { pageSlug?: string }) {
  const filter: Record<string, unknown> = {};
  if (query.pageSlug) filter.pageSlug = query.pageSlug;
  return Section.find(filter).sort({ updatedAt: -1 }).lean();
}

export async function createSection(data: { pageSlug: string; pageTitle: string; key: string; heading: string; body: string }) {
  return Section.create(data);
}

export async function updateSection(id: string, data: Partial<{ pageSlug: string; pageTitle: string; key: string; heading: string; body: string }>) {
  const section = await Section.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!section) throw new ApiError(404, "Section not found");
  return section;
}

export async function deleteSection(id: string) {
  const section = await Section.findByIdAndDelete(id);
  if (!section) throw new ApiError(404, "Section not found");
}
