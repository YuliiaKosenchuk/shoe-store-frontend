"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { useProductVariantsMap } from "./useProductVariantsMap";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";

// Cart line items don't carry a productVariantId (see cart.shema.ts), so the
// only way to find per-size stock is to re-resolve the product by name and
// read its variants — same (color, size) matching already used on the
// product page to line up cart items with variants.
export function useCartItemsStock(items: CartItemDto[]) {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  const matchedProducts = useMemo(() => {
    const byId = new Map<number, Product>();
    items.forEach((item) => {
      const product = products.find((p) => p.name === item.name);
      if (product) byId.set(product.id, product);
    });
    return Array.from(byId.values());
  }, [items, products]);

  const { variantsByProductId } = useProductVariantsMap(matchedProducts, matchedProducts.length > 0);

  return useMemo(() => {
    const stockByCartItemId = new Map<number, number | undefined>();
    items.forEach((item) => {
      const product = products.find((p) => p.name === item.name);
      const variants = product ? (variantsByProductId.get(product.id) ?? []) : [];
      const variant = variants.find(
        (v) => v.color === item.color && String(v.size) === String(item.size)
      );
      stockByCartItemId.set(item.id, variant?.stockQty);
    });
    return stockByCartItemId;
  }, [items, products, variantsByProductId]);
}
