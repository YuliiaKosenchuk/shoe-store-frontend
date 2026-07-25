"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { MOCK_PRODUCTS } from "@/servises/products.mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { PRODUCTS_PAGE_SIZE, parsePageParam } from "@/components/products/pagination";
import type { Product } from "@/shemas/product.shema";
import { Container } from "./Container";

interface ProductsGridProps {
  products?: Product[];
  isLoading?: boolean;
  selectedColors?: string[];
  selectedSizes?: string[];
  newestProductIds?: Set<number>;
}

// Two rows at every breakpoint: 1 col on mobile (2 cards), 2 cols on sm (4 cards), 4 cols on lg (8 cards).
const SKELETON_VISIBILITY = ["", "", "hidden sm:block", "hidden sm:block", "hidden lg:block", "hidden lg:block", "hidden lg:block", "hidden lg:block"];

export function ProductsGrid({ products = [], isLoading, selectedColors, selectedSizes, newestProductIds }: ProductsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePageParam(searchParams);

  const idsKey = products.map((product) => product.id).join(",");
  const prevIdsKeyRef = useRef(idsKey);

  useEffect(() => {
    if (prevIdsKeyRef.current === idsKey) return;
    prevIdsKeyRef.current = idsKey;
    if (page !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }, [idsKey, page, pathname, router, searchParams]);

  function goToPage(next: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (next <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(next));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  if (isLoading) {
    return (
      <Container>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-x-4 gap-y-6 px-6 py-10">
          {SKELETON_VISIBILITY.map((visibility, i) => (
            <ProductCardSkeleton key={i} className={visibility} />
          ))}
        </div>
      </Container>
    );
  }

  const totalPages = Math.ceil(products.length / PRODUCTS_PAGE_SIZE);
  const pageProducts = products.slice((page - 1) * PRODUCTS_PAGE_SIZE, page * PRODUCTS_PAGE_SIZE);

  return (
    <Container>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,302px)] justify-start gap-x-6 gap-y-10 px-6 py-10">
        {pageProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} selectedColors={selectedColors} selectedSizes={selectedSizes} isNew={newestProductIds?.has(product.id)} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={goToPage} />
    </Container>
  );
}
