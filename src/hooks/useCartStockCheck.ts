"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { findVariantForCartItem } from "@/lib/cartStock";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product, ProductVariantDto } from "@/shemas/product.shema";

export interface CartStockCheckResult {
  ok: boolean;
  unavailableItems: CartItemDto[];
}

// Hard gate for checkout, unlike the reactive useCartItemsStock (which is
// fine to read from a 5-minute cache to disable a "+" button). Forces a
// fresh read at the moment of the check via staleTime: 0 — this shares the
// same query keys as useCartItemsStock/useProductVariantsMap, so it also
// refreshes what those hooks read from.
export function useCartStockCheck() {
  const queryClient = useQueryClient();

  async function checkStock(items: CartItemDto[]): Promise<CartStockCheckResult> {
    console.log("[Stock] checkStock: checking", items.length, "item(s)");

    if (items.length === 0) {
      return { ok: true, unavailableItems: [] };
    }

    try {
      const products = await queryClient.fetchQuery({
        queryKey: ["products"],
        queryFn: () => ProductsService.getProducts(),
        staleTime: 0,
      });

      const productByItemId = new Map<number, Product | undefined>();
      items.forEach((item) => {
        productByItemId.set(item.id, products.find((p) => p.name === item.name));
      });

      const uniqueProducts = Array.from(
        new Map(
          Array.from(productByItemId.values())
            .filter((p): p is Product => !!p)
            .map((p) => [p.id, p])
        ).values()
      );

      const variantsByProductId = new Map<number, ProductVariantDto[]>();
      await Promise.all(
        uniqueProducts.map(async (product) => {
          const variants = await queryClient.fetchQuery({
            queryKey: ["product-variants", product.id],
            queryFn: () => ProductsService.getVariants(product.id),
            staleTime: 0,
          });
          variantsByProductId.set(product.id, variants);
        })
      );

      const unavailableItems = items.filter((item) => {
        const variant = findVariantForCartItem(item, products, variantsByProductId);
        return !variant || variant.stockQty < item.quantity;
      });

      const result = { ok: unavailableItems.length === 0, unavailableItems };
      console.log("[Stock] checkStock: result", {
        ok: result.ok,
        unavailableCount: unavailableItems.length,
        unavailableItems,
      });
      return result;
    } catch (error) {
      console.error("[Stock] checkStock failed, failing open:", error);
      return { ok: true, unavailableItems: [] };
    }
  }

  return { checkStock };
}
