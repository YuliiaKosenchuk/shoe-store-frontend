"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { ProductsGrid } from "@/components/ui/ProductsGrid";
import type { Product } from "@/shemas/product.shema";

export type ProductPageFilter = "shoes" | "bags" | "accessories" | "sale" | "bestsellers";

const FILTERS: Record<ProductPageFilter, (p: Product) => boolean> = {
  shoes: (p) => p.category.toLowerCase() === "shoes",
  bags: (p) => p.category.toLowerCase() === "bags",
  accessories: (p) => p.category.toLowerCase() === "accessories",
  sale: (p) => p.priceOld > 0 && p.priceOld > p.price,
  bestsellers: () => true,
};

export function ProductsPageContent({ filter }: { filter: ProductPageFilter }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    staleTime: 1000 * 60 * 5,
  });

  const products = data.filter(FILTERS[filter]);
  return <ProductsGrid products={products} isLoading={isLoading} />;
}
