"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductsGrid } from "@/components/ui/ProductsGrid";
import { Container } from "@/components/ui/Container";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const orderedItems = items.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main>
      <Container className="px-8 py-12">
      <h1 className="text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-black font-semibold"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-(family-name:--font-jost) text-base font-light text-gray-500">
            Your wishlist is empty.
          </p>
          <Link
            href="/bestsellers"
            className="font-(family-name:--font-jost) text-[16px] font-light tracking-widest underline underline-offset-4 text-[#010101] hover:opacity-70 transition-opacity"
          >
            Browse something new
          </Link>
        </div>
      ) : (
        <Suspense>
          <ProductsGrid products={orderedItems} />
        </Suspense>
      )}
      </Container>
    </main>
  );
}
