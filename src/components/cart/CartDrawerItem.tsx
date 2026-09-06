import { useState } from "react";
import { CloudinaryImage as Image } from "@/components/ui/CloudinaryImage";
import { BellRing, Heart, Minus, Plus, X } from "lucide-react";
import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product } from "@/shemas/product.shema";
import { useWishlistStore } from "@/store/wishlist.store";
import { NotifyModal } from "@/components/products/NotifyModal";
import { OutOfStockBadge } from "./OutOfStockBadge";
import { RemoveItemModal } from "./RemoveItemModal";

interface CartDrawerItemProps {
  item: CartItemDto;
  product?: Product;
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  isRemovePending: boolean;
  isUpdatePending: boolean;
  errorMessage?: string;
  maxQuantity?: number;
  outOfStock?: boolean;
}

export function CartDrawerItem({
  item,
  product,
  onRemove,
  onDecrease,
  onIncrease,
  isRemovePending,
  isUpdatePending,
  errorMessage,
  maxQuantity,
  outOfStock = false,
}: CartDrawerItemProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const { hasHydrated, isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = hasHydrated && !!product && isInWishlist(product.id);
  const canIncrease = maxQuantity === undefined || item.quantity < maxQuantity;

  return (
    <li className="flex gap-4 py-4">
      <div className="relative min-h-42 w-36 shrink-0 bg-[#F8F8F8]">
        {outOfStock && <OutOfStockBadge />}
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className="mb-3.5 min-w-0 truncate font-(family-name:--font-cormorant-garamond) font-semibold text-[20px] text-black leading-[1.3]"
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
        <p className="mb-2 font-(family-name:--font-jost) text-[14px] text-[#4E4E4E] leading-normal">
          Size: <span className="text-black">{item.size}</span>
        </p>
        <p className="font-(family-name:--font-jost) text-[14px] text-[#4E4E4E] leading-normal">
          Colour: <span className="text-black">{item.color}</span>
        </p>
        <div className="mt-2 flex items-center justify-between">
          {outOfStock ? (
            <button
              type="button"
              onClick={() => setShowNotify(true)}
              className="flex w-full items-center justify-center gap-2 border border-black bg-white py-2.5 font-(family-name:--font-jost) text-sm text-black transition-colors hover:bg-[#F8F8F8]"
            >
              {/* <BellRing size={15} strokeWidth={1.25} /> */}
              Notify me
            </button>
          ) : (
            <div className="flex items-center gap-2 border border-[#CDCDCD] p-1">
              <button
                onClick={() => (item.quantity <= 1 ? setShowRemoveConfirm(true) : onDecrease())}
                disabled={isUpdatePending || isRemovePending}
                aria-label={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                className="flex items-center justify-center text-black hover:text-[#7A2633] transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#010101]">{item.quantity}</span>
              <button
                onClick={onIncrease}
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
          <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441]">{errorMessage}</p>
        )}
        {!outOfStock && (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
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
    </li>
  );
}
