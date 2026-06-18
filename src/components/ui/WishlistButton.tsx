"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/shemas/product.shema";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  activeIconClass?: string;
  defaultIconClass?: string;
}

export function WishlistButton({
  product,
  className = "",
  activeIconClass,
  defaultIconClass,
}: WishlistButtonProps) {
  const { hasHydrated, isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = hasHydrated && isInWishlist(product.id);

  return (
    <button
      className={`group/wishlist p-1 transition-colors ${className}`}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
    >
      <Heart
        size={24}
        strokeWidth={1}
        className={`transition-colors ${
          wishlisted
            ? (activeIconClass ?? "text-[#7A2633] fill-[#7A2633]")
            : (defaultIconClass ?? "text-gray-800 group-hover/wishlist:text-[#7A2633]")
        }`}
      />
    </button>
  );
}
