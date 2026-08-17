"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { MOCK_PRODUCTS } from "@/servises/products.mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { PRODUCTS_PAGE_SIZE, parsePageParam } from "@/components/products/pagination";
import { useProductVariantsMap } from "@/hooks/useProductVariantsMap";
import type { Product, ProductVariantDto } from "@/shemas/product.shema";
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

function isOutOfStock(product: Product, variantsByProductId: Map<number, ProductVariantDto[]>): boolean {
  const variants = variantsByProductId.get(product.id) ?? [];
  return variants.length === 0 || variants.every((v) => v.stockQty <= 0);
}

export function ProductsGrid({ products = [], isLoading, selectedColors, selectedSizes, newestProductIds }: ProductsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { variantsByProductId, isLoading: variantsLoading } = useProductVariantsMap(products, true);

  // Stable sort: out-of-stock products sink to the end of the list while the
  // caller's chosen order (newest, price, etc.) is preserved within each group.
  const orderedProducts = products
    .slice()
    .sort((a, b) => Number(isOutOfStock(a, variantsByProductId)) - Number(isOutOfStock(b, variantsByProductId)));

  const effectiveLoading = isLoading || variantsLoading;

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

  if (effectiveLoading) {
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

  if (products.length === 0) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-(family-name:--font-jost) text-base font-light text-gray-500">No results were found.</p>
        </div>
      </Container>
    );
  }

  const totalPages = Math.ceil(orderedProducts.length / PRODUCTS_PAGE_SIZE);
  const pageProducts = orderedProducts.slice((page - 1) * PRODUCTS_PAGE_SIZE, page * PRODUCTS_PAGE_SIZE);

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
