"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";

// Cart line items don't carry a productId (see cart.shema.ts), so the only
// way to resolve the underlying Product (needed for wishlist toggling) is to
// match on name — same approach already used by useCartItemsStock, and it
// shares that hook's ["products"] query cache.
export function useCartItemsProducts(items: CartItemDto[]) {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  return useMemo(() => {
    const productByCartItemId = new Map<number, Product>();
    items.forEach((item) => {
      const product = products.find((p) => p.name === item.name);
      if (product) productByCartItemId.set(item.id, product);
    });
    return productByCartItemId;
  }, [items, products]);
}
