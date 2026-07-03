import type { Product } from "@/shemas/product.shema";

export function getNewestProductIds(products: Product[], count = 5): Set<number> {
  return new Set(
    products
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count)
      .map((p) => p.id)
  );
}
