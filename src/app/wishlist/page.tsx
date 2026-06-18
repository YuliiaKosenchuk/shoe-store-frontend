"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductsGrid } from "@/components/ui/ProductsGrid";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <main className="px-8 py-12">
      <h1 className="font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase mb-10">
        Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-(family-name:--font-jost) text-base font-light text-gray-500">
            Your wishlist is empty.
          </p>
          <Link
            href="/shoes"
            className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
          >
            Browse shoes
          </Link>
        </div>
      ) : (
        <ProductsGrid products={items} />
      )}
    </main>
  );
}
