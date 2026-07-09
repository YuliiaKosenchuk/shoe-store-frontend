"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";
import { useWishlistStore } from "@/store/wishlist.store";
import { QuantitySelect } from "./QuantitySelect";
import { RemoveItemModal } from "./RemoveItemModal";

interface CartPageItemProps {
  item: CartItemDto;
  product?: Product;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  isRemovePending: boolean;
  isUpdatePending: boolean;
  errorMessage?: string;
  maxQuantity?: number;
}

export function CartPageItem({
  item,
  product,
  onRemove,
  onQuantityChange,
  isRemovePending,
  isUpdatePending,
  errorMessage,
  maxQuantity,
}: CartPageItemProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const { hasHydrated, isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = hasHydrated && !!product && isInWishlist(product.id);

  return (
    <div className="flex gap-3 sm:gap-6">
      <div className="relative h-24 w-19 shrink-0 bg-[#F8F8F8] sm:h-42 sm:w-36">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 76px, 144px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-7 flex items-start justify-between gap-2">
          <p className="font-(family-name:--font-cormorant-garamond) font-semibold text-[20px] text-black leading-[1.3]">
            {item.name}
          </p>
          <div className="flex shrink-0 items-center gap-2 text-[#010101]">
            <button
              onClick={() => product && toggleItem(product)}
              disabled={!product}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="p-2 transition-colors hover:text-[#7A2633] disabled:opacity-40"
            >
              <Heart
                size={24}
                strokeWidth={1.25}
                className={wishlisted ? "fill-current" : ""}
              />
            </button>
            <button
              onClick={() => setShowRemoveConfirm(true)}
              disabled={isRemovePending}
              aria-label="Remove item"
              className="p-2 transition-colors hover:text-[#7A2633]"
            >
              <X size={24} strokeWidth={1.25} />
            </button>
          </div>
        </div>
        <div className="mb-3.5 flex items-center gap-2 font-(family-name:--font-jost) text-[14px] leading-normal text-[#4E4E4E]">
          <span>
            Size: <span className="ml-2 text-[#010101]">{item.size}</span>
          </span>
          <span className="mx-4 h-4.5 w-px bg-[#818181]" />
          <span>
            Colour: <span className="ml-2 text-[#010101]">{item.color}</span>
          </span>
        </div>

        <div className="mb-5.5">
          <QuantitySelect
            quantity={item.quantity}
            onChange={onQuantityChange}
            disabled={isUpdatePending || isRemovePending}
            max={maxQuantity}
          />
        </div>
        {errorMessage && (
          <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441] leading-[1.3]">
            {errorMessage}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {item.priceOld > item.price && (
              <span className="font-(family-name:--font-jost) text-sm text-[#818181] leading-[1.3] line-through">
                € {item.priceOld.toLocaleString()}
              </span>
            )}
            <span
              className={`font-(family-name:--font-jost) text-base leading-[1.3] ${
                item.priceOld > item.price ? "text-[#DF4441]" : "text-[#010101]"
              }`}
            >
              € {item.price.toLocaleString()}
            </span>
          </div>
          <span className="font-(family-name:--font-jost) font-medium text-base text-[#010101] leading-[1.3]">
            € {item.subtotal.toLocaleString()}
          </span>
        </div>
      </div>

      <RemoveItemModal
        open={showRemoveConfirm}
        itemName={item.name}
        loading={isRemovePending}
        variant="page"
        onConfirm={() => {
          onRemove();
          setShowRemoveConfirm(false);
        }}
        onCancel={() => setShowRemoveConfirm(false)}
      />
    </div>
  );
}
