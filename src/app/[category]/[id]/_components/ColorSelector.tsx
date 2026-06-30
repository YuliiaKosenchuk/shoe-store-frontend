import Image from "next/image";
import type { ProductImage } from "@/shemas/product.shema";

interface ColorSelectorProps {
  images: ProductImage[];
  selectedColor: string;
  onChange: (color: string) => void;
}

export function ColorSelector({ images, selectedColor, onChange }: ColorSelectorProps) {
  if (images.length === 0) return null;

  const colorLabel = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase();

  return (
    <div className="space-y-3">
      <p className="mb-4 font-(family-name:--font-jost) text-sm tracking-widest text-[#4E4E4E]">
        Colour:{" "}
        <span className="font-medium text-[16px] text-[#010101] leading-[1.3]">{colorLabel}</span>
      </p>
      <div className="flex gap-2">
        {images.filter((img, idx, arr) => arr.findIndex((i) => i.color === img.color) === idx).map((img) => (
          <button
            key={img.color}
            onClick={() => onChange(img.color)}
            className={`relative w-18.75 h-18.75 shrink-0 overflow-hidden border transition-colors duration-150 ${
              img.color === selectedColor
                ? "border-black"
                : "border-transparent hover:border-gray-400"
            }`}
            aria-label={img.color}
            aria-pressed={img.color === selectedColor}
          >
            <Image
              src={img.mainUrl}
              alt={img.color}
              fill
              className="object-cover p-1"
              sizes="72px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
