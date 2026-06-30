"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";
import type { ProductSize } from "@/shemas/product.shema";
import { NotifyModal } from "./NotifyModal";
import { SizeGuideModal } from "./SizeGuideModal";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: number | null;
  onChange: (size: number) => void;
}

const ALL_SIZES = [35, 36, 37, 38, 39, 40, 41, 42];

export function SizeSelector({ sizes, selectedSize, onChange }: SizeSelectorProps) {
  const [notifySize, setNotifySize] = useState<number | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const allSizes = ALL_SIZES.map((size) => {
    const found = sizes.find((s) => Number(s.size) === size);
    return found ? { ...found, size } : { size, stock: 0, available: false };
  });

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-(family-name:--font-jost) text-sm tracking-widest text-[#4E4E4E]">
            Size:{" "}
            {selectedSize && (
              <span className="font-medium text-[16px] text-[#010101] leading-[1.3]">
                {selectedSize}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#7A2633] underline underline-offset-2 hover:text-[#010101] transition-colors"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-5 font-(family-name:--font-jost) text-sm text-[#010101] leading-normal">
          {allSizes.map((item) => {
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
                    <BellRing size={11} strokeWidth={1.25} />
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
      {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
      )}
    </>
  );
}
