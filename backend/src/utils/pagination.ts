export function buildPagination(page: number, limit: number) {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(Math.min(limit, 100), 1);
  const skip = (safePage - 1) * safeLimit;
  return { page: safePage, limit: safeLimit, skip };
}
