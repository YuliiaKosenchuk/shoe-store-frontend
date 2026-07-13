"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { useProductVariantsMap } from "./useProductVariantsMap";
import { findVariantForCartItem } from "@/lib/cartStock";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";

export function useCartItemsStock(items: CartItemDto[]) {
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
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

  const { variantsByProductId, isLoading: isVariantsLoading } = useProductVariantsMap(
    matchedProducts,
    matchedProducts.length > 0
  );

  const stockByCartItemId = useMemo(() => {
    const map = new Map<number, number | undefined>();
    items.forEach((item) => {
      const variant = findVariantForCartItem(item, products, variantsByProductId);
      map.set(item.id, variant?.stockQty);
    });
    return map;
  }, [items, products, variantsByProductId]);

  return { stockByCartItemId, isLoading: isProductsLoading || isVariantsLoading };
}
