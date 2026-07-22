"use client";

import { useState } from "react";
// import { MOCK_PRODUCTS } from "@/servises/products.mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
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

const PAGE_SIZE = 12;

export function ProductsGrid({ products = [], isLoading, selectedColors, selectedSizes, newestProductIds }: ProductsGridProps) {
  const [page, setPage] = useState(1);
  const idsKey = products.map((product) => product.id).join(",");
  const [prevIdsKey, setPrevIdsKey] = useState(idsKey);
  if (idsKey !== prevIdsKey) {
    setPrevIdsKey(idsKey);
    setPage(1);
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

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const pageProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Container>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,302px)] justify-center gap-x-6 gap-y-10 px-6 py-10">
        {pageProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} selectedColors={selectedColors} selectedSizes={selectedSizes} isNew={newestProductIds?.has(product.id)} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Container>
  );
}
