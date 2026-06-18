"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface WishlistButtonProps {
  className?: string;
}

export function WishlistButton({ className = "" }: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <button
      className={`group/wishlist p-1 transition-colors ${className}`}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        setWishlisted((prev) => !prev);
      }}
    >
      <Heart
        size={24}
        strokeWidth={1}
        className={`transition-colors ${
          wishlisted
            ? "text-[#7A2633] fill-[#7A2633]"
            : "text-gray-800 group-hover/wishlist:text-[#7A2633]"
        }`}
      />
    </button>
  );
}
