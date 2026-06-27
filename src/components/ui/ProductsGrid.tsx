"use client";

import { MOCK_PRODUCTS } from "@/servises/products.mock";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/shemas/product.shema";
import { Container } from "./Container";
import { BackButton } from "./BackButton";

interface ProductsGridProps {
  products?: Product[];
}

export function ProductsGrid({ products = MOCK_PRODUCTS }: ProductsGridProps) {
  // if (isLoading && !data) {
  //   return (
  //     <div className="grid grid-cols-[repeat(auto-fill,302px)] justify-center gap-x-4 gap-y-10 px-6 py-10">
  //       {Array.from({ length: 8 }).map((_, i) => (
  //         <div key={i} className="animate-pulse w-full h-124">
  //           <div className="w-full h-101 bg-gray-200" />
  //           <div className="mt-3 space-y-2">
  //             <div className="h-4 bg-gray-200 rounded w-3/4" />
  //             <div className="h-3 bg-gray-200 rounded w-1/2" />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <Container>
      <BackButton />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,302px)] justify-center gap-x-4 gap-y-6 px-6 py-10">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>
    </Container>
  );
}
