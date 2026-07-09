"use client";

// import { MOCK_PRODUCTS } from "@/servises/products.mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import type { Product } from "@/shemas/product.shema";
import { Container } from "./Container";

interface ProductsGridProps {
  products?: Product[];
  isLoading?: boolean;
  selectedColors?: string[];
  selectedSizes?: string[];
  newestProductIds?: Set<number>;
}

export function ProductsGrid({ products = [], isLoading, selectedColors, selectedSizes, newestProductIds }: ProductsGridProps) {
  if (isLoading) {
    return (
      <Container>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,302px)] justify-center gap-x-4 gap-y-6 px-6 py-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,302px)] justify-center gap-x-6 gap-y-10 px-6 py-10">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} selectedColors={selectedColors} selectedSizes={selectedSizes} isNew={newestProductIds?.has(product.id)} />
        ))}
      </div>
    </Container>
  );
}
