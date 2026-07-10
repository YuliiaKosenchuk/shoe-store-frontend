"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { useProductVariantsMap } from "./useProductVariantsMap";
import { findVariantForCartItem } from "@/lib/cartStock";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";

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
      const variant = findVariantForCartItem(item, products, variantsByProductId);
      stockByCartItemId.set(item.id, variant?.stockQty);
    });
    return stockByCartItemId;
  }, [items, products, variantsByProductId]);
}
