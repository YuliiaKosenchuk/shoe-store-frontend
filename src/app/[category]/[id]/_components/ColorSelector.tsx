"use client";

import { useState } from "react";
import Image from "next/image";
import { BellRing } from "lucide-react";
import type { ProductImage, ProductVariantDto } from "@/shemas/product.shema";
import { NotifyModal } from "@/components/products/NotifyModal";

interface ColorSelectorProps {
  images: ProductImage[];
  selectedColor: string;
  onChange: (color: string) => void;
  variants: ProductVariantDto[];
}

export function ColorSelector({ images, selectedColor, onChange, variants }: ColorSelectorProps) {
  const [notifyColor, setNotifyColor] = useState<string | null>(null);

  if (images.length === 0) return null;

  const colorLabel = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase();

  return (
    <>
      <div className="space-y-3">
        <p className="mb-4 font-(family-name:--font-jost) text-sm tracking-widest text-[#4E4E4E]">
          Colour:{" "}
          <span className="font-medium text-[16px] text-[#010101] leading-[1.3]">{colorLabel}</span>
        </p>
        <div className="flex gap-2">
          {images.map((img) => {
            const totalStock = variants
              .filter((v) => v.color === img.color)
              .reduce((sum, v) => sum + v.stockQty, 0);
            const isOutOfStock = totalStock === 0;
            const isLowStock = totalStock > 0 && totalStock <= 2;
            const isSelected = img.color === selectedColor;

            return (
              <div key={img.color} className="relative">
                {isLowStock && (
                  <span className="absolute top-1 right-1 z-10 w-2 h-2 rounded-full bg-[#EAA51C] pointer-events-none" />
                )}
                {isOutOfStock && (
                  <button
                    type="button"
                    onClick={() => setNotifyColor(img.color)}
                    className="absolute top-1 right-1 z-20 text-[#818181] hover:text-[#010101] transition-colors"
                    aria-label={`Notify me when ${img.color} is available`}
                  >
                    <BellRing size={14} strokeWidth={1.25} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onChange(img.color)}
                  className={`relative w-18.75 h-18.75 shrink-0 overflow-hidden border transition-colors duration-150 ${
                    isSelected
                      ? "border-[#010101]"
                      : isOutOfStock
                        ? "border-[#CDCDCD] hover:border-[#010101]"
                        : "border-[#CDCDCD] hover:border-[#010101]"
                  }`}
                  aria-label={img.color}
                  aria-pressed={isSelected}
                >
                  {isOutOfStock && (
                    <span className="absolute inset-0 z-10 bg-[#D9D9D9]/60 pointer-events-none" />
                  )}
                  <Image
                    src={img.mainUrl}
                    alt={img.color}
                    fill
                    className="object-cover px-2.5 py-1.25"
                    sizes="72px"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {notifyColor !== null && (
        <NotifyModal color={notifyColor} onClose={() => setNotifyColor(null)} />
      )}
    </>
  );
}
