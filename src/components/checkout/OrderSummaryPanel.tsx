import Image from "next/image";
import type { ReactNode } from "react";
import { useCart } from "@/hooks/useCart";

interface OrderSummaryPanelProps {
  children?: ReactNode;
  showItems?: boolean;
}

export function OrderSummaryPanel({ children, showItems = true }: OrderSummaryPanelProps) {
  const { cart } = useCart();
  // Sort by id (= order added to cart) for a stable, predictable display order.
  const items = [...(cart?.cartItems ?? [])].sort((a, b) => a.id - b.id);
  const productsCount = cart?.productsCount ?? 0;
  const cartSubtotal = cart?.cartSubtotal ?? 0;

  return (
    <div className="h-fit border border-gray-200 p-6">
      <h2 className="mb-5 font-(family-name:--font-cormorant-garamond) text-2xl text-black">
        Order summary
      </h2>

      {showItems && items.length > 0 && (
        <div className="mb-5 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-12 w-10 shrink-0 bg-[#F8F8F8]">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                )}
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black font-(family-name:--font-jost) text-[9px] text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-(family-name:--font-jost) text-sm text-black">
                  {item.name}
                </p>
                <p className="font-(family-name:--font-jost) text-xs text-gray-500">
                  Size: {item.size} | Colour: {item.color}
                </p>
              </div>
              <span className="shrink-0 font-(family-name:--font-jost) text-sm text-black">
                ₴{item.subtotal.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mb-5">
        <label className="mb-2 block font-(family-name:--font-jost) text-[13px] text-[#343434]">
          Discount code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="discount code"
            disabled
            className="w-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-[#9a9a9a] outline-none"
          />
          <button
            disabled
            className="shrink-0 border border-gray-300 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-4 font-(family-name:--font-jost) text-sm text-black">
        <div className="flex justify-between">
          <span>Subtotal · {productsCount} items</span>
          <span>₴{cartSubtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-medium">
          <span>Total</span>
          <span>₴{cartSubtotal.toLocaleString()}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
