import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { CartItemDto } from "@/shemas/cart.shema";
import { RemoveItemModal } from "./RemoveItemModal";

interface CartDrawerItemProps {
  item: CartItemDto;
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  isRemovePending: boolean;
  isUpdatePending: boolean;
  errorMessage?: string;
  maxQuantity?: number;
}

export function CartDrawerItem({
  item,
  onRemove,
  onDecrease,
  onIncrease,
  isRemovePending,
  isUpdatePending,
  errorMessage,
  maxQuantity,
}: CartDrawerItemProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const canIncrease = maxQuantity === undefined || item.quantity < maxQuantity;

  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-20 w-16 shrink-0 bg-[#F8F8F8] md:h-36.25 md:w-30.5">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 122px, 64px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="mb-3.5 font-(family-name:--font-cormorant-garamond) font-semibold text-[20px] text-black leading-[1.3]">{item.name}</p>
          <button
            onClick={() => setShowRemoveConfirm(true)}
            disabled={isRemovePending}
            aria-label="Remove item"
            className="shrink-0 p-2 text-black hover:text-[#7A2633] transition-colors"
          >
            <X size={24} strokeWidth={1.25} />
          </button>
        </div>
        <p className="mb-2 font-(family-name:--font-jost) text-[14px] text-[#4E4E4E] leading-normal">
          Size: <span className="text-black">{item.size}</span>
        </p>
        <p className="font-(family-name:--font-jost) text-[14px] text-[#4E4E4E] leading-normal">
          Colour: <span className="text-black">{item.color}</span>
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3 py-1">
            <button
              onClick={() => (item.quantity <= 1 ? setShowRemoveConfirm(true) : onDecrease())}
              disabled={isUpdatePending || isRemovePending}
              aria-label={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
              className="flex items-center justify-center text-black hover:text-[#7A2633] transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#010101]">{item.quantity}</span>
            <button
              onClick={onIncrease}
              disabled={isUpdatePending || !canIncrease}
              aria-label={canIncrease ? "Increase quantity" : "No more stock available"}
              className="flex items-center justify-center text-black hover:text-[#7A2633] transition-colors disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="font-(family-name:--font-jost) font-medium text-[16px] text-[#010101] leading-[1.3]">
            € {item.subtotal.toLocaleString()}
          </span>
        </div>
        {errorMessage && (
          <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441]">{errorMessage}</p>
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
    </li>
  );
}
