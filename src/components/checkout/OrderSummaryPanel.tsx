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
    <div className="h-fit">
      <h2 className="mb-6 font-(family-name:--font-cormorant-garamond) text-xl text-black sm:text-[26px] leading-[1.2] font-semibold">
        Order summary
      </h2>

      {showItems && items.length > 0 && (
        <div className="mb-6 space-y-4 border-t border-b border-[#B3B3B3] py-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-stretch gap-3">
              <div className="relative h-21.5 w-21.5 shrink-0 bg-[#F8F8F8]">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="86px"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center bg-black font-(family-name:--font-jost) text-base text-white leading-[1.3]">
                  <span className="inline-block" style={{ transform: "translateY(0.5px)" }}>
                    {item.quantity}
                  </span>
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold leading-[1.3] text-black">
                    {item.name}
                  </p>
                  <span className="shrink-0 font-(family-name:--font-jost) text-base text-[#010101] leading-[1.3] font-medium">
                    € {item.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1 font-(family-name:--font-jost) text-sm text-[#4E4E4E] leading-normal font-normal">
                  <p>
                    Size: <span className="text-[#010101] font-light">{item.size}</span>
                  </p>
                  <p>
                    Colour: <span className="text-[#010101] font-light">{item.color}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-5">
        <label className="mb-2 block font-(family-name:--font-jost) text-[14px] text-[#343434] font-medium leading-normal">
          Discount code
        </label>
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="discount code"
            className="w-full border border-[#4E4E4E] bg-white px-4 py-3 text-[16px] text-[#010101] outline-none placeholder:font-(family-name:--font-jost) placeholder:text-[16px] placeholder:leading-[1.3] placeholder:font-normal placeholder:text-[#B3B3B3]"
          />
          <button className="group flex shrink-0 items-center gap-2 font-(family-name:--font-cormorant-garamond) text-[20px] text-[#010101] font-semibold leading-[1.3] transition-colors hover:text-[#7A2633]">
            Apply
            <Image
              src="/images/arrow-right-hero.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      <div className="pt-4 font-(family-name:--font-jost) text-sm text-[#4E4E4E]">
        <div className="mb-4 flex justify-between">
          <span className="inline-flex items-center">
            Subtotal
            <span className="mx-2 size-0.75 rounded-full shrink-0 bg-black text-base" />
            {productsCount} items
          </span>
          <span className="text-base text-black font-medium">€ {cartSubtotal.toLocaleString()}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span>Shipping</span>
          <span className="text-base text-black font-medium">€ 5</span>
        </div>
        <div className="flex justify-between border-t border-[#B3B3B3] pt-4 text-base font-medium leading-[1.3]">
          <span className="text-base text-black font-medium">Total</span>
          <span className="text-base text-black font-medium">€ {cartSubtotal.toLocaleString()}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
