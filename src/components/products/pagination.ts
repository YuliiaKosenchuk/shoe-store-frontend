export const PRODUCTS_PAGE_SIZE = 12;

export function parsePageParam(searchParams: { get(key: string): string | null }): number {
  const raw = Number(searchParams.get("page"));
  return Number.isInteger(raw) && raw > 0 ? raw : 1;
}

export function getPageItemCount(total: number, page: number, pageSize = PRODUCTS_PAGE_SIZE): number {
  return Math.max(0, Math.min(page * pageSize, total));
}
