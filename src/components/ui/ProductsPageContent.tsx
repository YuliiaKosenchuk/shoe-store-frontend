"use client";

import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { ProductsGrid } from "@/components/ui/ProductsGrid";
import { ProductFilterBar } from "@/components/products/ProductFilterBar";
import { applyProductFilters } from "@/components/products/applyProductFilters";
import { getNewestProductIds } from "@/components/products/getNewestProductIds";
import { getPageItemCount, parsePageParam } from "@/components/products/pagination";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useProductVariantsMap } from "@/hooks/useProductVariantsMap";
import type { Product } from "@/shemas/product.shema";

export type ProductPageFilter = "shoes" | "bags" | "accessories" | "sale" | "bestsellers" | "new-arrivals" | "search";

const FILTERS: Record<ProductPageFilter, (p: Product) => boolean> = {
  shoes: (p) => p.category.toLowerCase() === "shoes",
  bags: (p) => p.category.toLowerCase() === "bags",
  accessories: (p) => p.category.toLowerCase() === "accessories",
  sale: (p) => p.priceOld > 0 && p.priceOld > p.price,
  bestsellers: () => true,
  "new-arrivals": () => true,
  search: () => true,
};

export function ProductsPageContent({ filter }: { filter: ProductPageFilter }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    staleTime: 1000 * 60 * 5,
  });

  const searchParams = useSearchParams();
  const searchQuery = filter === "search" ? (searchParams.get("q") ?? "").trim().toLowerCase() : "";

  const newestProductIds = getNewestProductIds(data);
  const baseProducts =
    filter === "new-arrivals"
      ? data.filter((p) => newestProductIds.has(p.id))
      : filter === "search"
        ? data.filter((p) => p.name.toLowerCase().includes(searchQuery))
        : data.filter(FILTERS[filter]);
  const { filters, sort } = useProductFilters();
  const sizeFilterActive = filters.size.length > 0;
  const { variantsByProductId, isLoading: variantsLoading } = useProductVariantsMap(baseProducts, sizeFilterActive);
  const products = applyProductFilters(baseProducts, filters, sort, variantsByProductId);

  const page = parsePageParam(searchParams);
  const shownCount = getPageItemCount(products.length, page);

  // These queries have no SSR prefetch, so isLoading only ever resolves
  // client-side. Reporting the real value before hydration finishes lets the
  // client's first render (loaded) diverge from the server's (loading) —
  // hasMounted keeps both loading flags pinned to "loading" until past hydration.
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const gridLoading = !hasMounted || isLoading;
  const combinedLoading = !hasMounted || isLoading || variantsLoading;

  return (
    <>
      <ProductFilterBar baseProducts={baseProducts} totalFilteredCount={products.length} shownCount={shownCount} isLoading={combinedLoading} category={filter} />
      <ProductsGrid products={products} isLoading={gridLoading} selectedColors={filters.colour} selectedSizes={filters.size} newestProductIds={newestProductIds} />
    </>
  );
}
