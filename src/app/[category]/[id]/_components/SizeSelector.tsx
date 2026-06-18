"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";
import type { ProductSize } from "@/shemas/product.shema";
import { NotifyModal } from "./NotifyModal";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: number | null;
  onChange: (size: number) => void;
}

export function SizeSelector({ sizes, selectedSize, onChange }: SizeSelectorProps) {
  const [notifySize, setNotifySize] = useState<number | null>(null);

  return (
    <>
      <div>
        <p className=" mb-4 font-(family-name:--font-jost) text-sm tracking-widest text-[#4E4E4E]">
          Size:{" "}
          {selectedSize && (
            <span className="font-medium text-[16px] text-[#010101] leading-[1.3]">
              {selectedSize}
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-5 font-(family-name:--font-jost) text-sm text-[#010101] leading-normal">
          {sizes.map((item) => {
            const isSelected = item.size === selectedSize;
            const isLowStock = item.available && item.stock <= 2;

            return (
              <div key={item.size} className="relative">
                {!item.available ? (
                  <button
                    type="button"
                    onClick={() => setNotifySize(item.size)}
                    className="absolute -top-1 -right-3 -translate-x-1/2 text-[#818181] transition-colors"
                    aria-label={`Notify me when size ${item.size} is available`}
                  >
                    <BellRing size={11} strokeWidth={1} />
                  </button>
                ) : isLowStock ? (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#EAA51C]" />
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    if (!item.available) return;
                    onChange(item.size);
                  }}
                  disabled={!item.available}
                  aria-pressed={isSelected}
                  className={`font-(family-name:--font-jost) text-sm font-light px-0.5 transition-colors duration-150 ${
                    !item.available
                      ? "text-[#818181] cursor-not-allowed"
                      : "text-[#010101] cursor-pointer hover:text-[#7A2633]"
                  }`}
                >
                  <span className={isSelected ? "border-b border-[#010101]" : ""}>
                    {item.size}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {notifySize !== null && (
        <NotifyModal size={notifySize} onClose={() => setNotifySize(null)} />
      )}
    </>
  );
}
