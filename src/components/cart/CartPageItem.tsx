"use client";

import { useState } from "react";
import Image from "next/image";
import { BellRing, Heart, Minus, Plus, X } from "lucide-react";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";
import { useWishlistStore } from "@/store/wishlist.store";
import { NotifyModal } from "@/components/products/NotifyModal";
import { OutOfStockBadge } from "./OutOfStockBadge";
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
  outOfStock?: boolean;
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
  outOfStock = false,
}: CartPageItemProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const { hasHydrated, isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = hasHydrated && !!product && isInWishlist(product.id);
  const canIncrease = maxQuantity === undefined || item.quantity < maxQuantity;

  return (
    <div className="flex gap-3 sm:gap-6">
      <div className="relative h-24 w-19 shrink-0 bg-[#F8F8F8] sm:h-42 sm:w-36">
        {outOfStock && <OutOfStockBadge />}
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
          <p
            className="min-w-0 truncate font-(family-name:--font-cormorant-garamond) font-semibold text-[20px] text-black leading-[1.3]"
            title={item.name}
          >
            {item.name}
          </p>
          <div className="flex shrink-0 items-center gap-2 text-[#010101]">
            <button
              onClick={() => product && toggleItem(product)}
              disabled={!product}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="pr-2 transition-colors hover:text-[#7A2633] disabled:opacity-40"
            >
              <Heart
                size={24}
                strokeWidth={1.25}
                className={wishlisted ? "fill-current" : ""}
              />
            </button>
            {outOfStock && (
              <button
                onClick={() => setShowRemoveConfirm(true)}
                disabled={isRemovePending}
                aria-label="Remove item"
                className="transition-colors hover:text-[#7A2633]"
              >
                <X size={24} strokeWidth={1.25} />
              </button>
            )}
            {/* <button
              onClick={() => setShowRemoveConfirm(true)}
              disabled={isRemovePending}
              aria-label="Remove item"
              className="p-2 transition-colors hover:text-[#7A2633]"
            >
              <X size={24} strokeWidth={1.25} />
            </button> */}
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
          {outOfStock ? (
            <div className="flex flex-wrap items-center gap-3 bg-[#F8F8F8] px-3 py-2.5">
              <div className="flex flex-1 items-center gap-2 font-(family-name:--font-jost) text-sm text-[#4E4E4E]">
                <BellRing size={24} strokeWidth={1.25} className="shrink-0" />
                <span className="max-w-43">We&apos;ll let you know as soon as it&apos;s back in stock</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNotify(true)}
                className="border border-black bg-white px-7 py-3.25 font-(family-name:--font-jost) text-sm text-black transition-colors hover:bg-gray-50"
              >
                Notify me
              </button>
            </div>
          ) : (
            <div className="flex w-fit items-center gap-2 border border-[#CDCDCD] p-1">
              <button
                type="button"
                onClick={() =>
                  item.quantity <= 1 ? setShowRemoveConfirm(true) : onQuantityChange(item.quantity - 1)
                }
                disabled={isUpdatePending || isRemovePending}
                aria-label={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                className="flex items-center justify-center text-black hover:text-[#7A2633] transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#010101]">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(item.quantity + 1)}
                disabled={isUpdatePending || !canIncrease}
                aria-label={canIncrease ? "Increase quantity" : "No more stock available"}
                className="flex items-center justify-center text-black hover:text-[#7A2633] transition-colors disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441] leading-[1.3]">
            {errorMessage}
          </p>
        )}

        {!outOfStock && (
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
        )}
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
      {showNotify && (
        <NotifyModal
          size={Number(item.size)}
          color={item.color}
          onClose={() => setShowNotify(false)}
        />
      )}
    </div>
  );
}
