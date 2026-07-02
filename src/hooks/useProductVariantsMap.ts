"use client";

import { useQueries } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import type { Product, ProductVariantDto } from "@/shemas/product.shema";

// GET /api/products (the list endpoint) doesn't return per-size stock —
// that only comes from GET /api/products/:id/variants. Shares the
// "product-variants" query key/cache with ProductCard's hover fetch.
export function useProductVariantsMap(products: Product[], enabled: boolean) {
  const results = useQueries({
    queries: products.map((product) => ({
      queryKey: ["product-variants", product.id],
      queryFn: () => ProductsService.getVariants(product.id),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const variantsByProductId = new Map<number, ProductVariantDto[]>();
  products.forEach((product, i) => {
    variantsByProductId.set(product.id, results[i]?.data ?? []);
  });

  return {
    variantsByProductId,
    isLoading: enabled && results.some((r) => r.isLoading),
  };
}
