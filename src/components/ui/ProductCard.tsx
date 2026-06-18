"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { Product } from "@/shemas/product.shema";

const DEFAULT_SIZES = [35, 36, 37, 38, 39, 40, 41, 42];

const FALLBACK_IMAGES: string[] = [];

const COLOR_HEX: Record<string, string> = {
  BLACK: "#111111",
  WHITE: "#F5F0EB",
  BROWN: "#7B5B3A",
  GREEN: "#8B9B7A",
  SAGE: "#A3B18A",
  BEIGE: "#D4B896",
  GRAY: "#9E9E9E",
  RED: "#8B2520",
  BLUE: "#2C4A6E",
  CREAM: "#F0EAD6",
};

function toHex(color: string): string {
  if (color.startsWith("#")) return color;
  return COLOR_HEX[color.toUpperCase()] ?? "#C8C0B8";
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeColor, setActiveColor] = useState<string>(
    product.images[0]?.color ?? product.colors[0] ?? ""
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setActiveColor(color);
      emblaApi?.scrollTo(0);
    },
    [emblaApi]
  );

  const activeImage =
    product.images.find((img) => img.color === activeColor) ?? product.images[0];
  const rawImages = activeImage?.urls?.length
    ? activeImage.urls
    : activeImage?.mainUrl
    ? [activeImage.mainUrl]
    : [];

  // use test cloudinary images when the product has none yet
  const carouselImages = rawImages.length > 0 ? rawImages : FALLBACK_IMAGES;

  const availableSizes = new Set(product.sizes ?? DEFAULT_SIZES);

  const discount =
    product.priceOld > 0 && product.priceOld > product.price
      ? Math.round((1 - product.price / product.priceOld) * 100)
      : null;

  return (
    <div className="group flex flex-col cursor-pointer w-full h-124">
      <div
        className="relative w-full h-101 shrink-0 overflow-hidden bg-[#F8F8F8] cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {carouselImages.map((url, i) => (
              <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full bg-[#F8F8F8]">
                <Image
                  src={url}
                  alt={`${product.name} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  priority={priority && i === 0}
                  loading={priority && i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
        <WishlistButton product={product} className="absolute top-3 right-3 z-10" />
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Next image"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>

        {carouselImages.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 z-5">
            <div
              className="h-full bg-gray-800 transition-all duration-300 ease-out"
              style={{
              width: `${100 / carouselImages.length}%`,
              transform: `translateX(${selectedIndex * 100}%)`,
            }}
            />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 h-17 bg-[#DADADA]/35 px-4 pt-3 pb-4 translate-y-[calc(100%+16px)] group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <p className="text-[14px] leading-normal tracking-widest text-[#343434] mb-2.5">Size</p>
          <div className="flex gap-3 flex-wrap">
            {DEFAULT_SIZES.map((size) => {
              const available = availableSizes.has(size);
              return (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  disabled={!available}
                  className={`text-sm font-sans text-[14px] font-light transition-colors ${
                    available
                      ? "text-[#010101]/90 hover:text-[#7A2633] cursor-pointer"
                      : "text-[#818181] cursor-default pointer-events-none"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      <div className="mt-3 space-y-1.5">
        <Link
          href={`/products/${product.id}`}
          className="font-(family-name:--font-jost) text-base font-normal leading-snug text-gray-900 hover:text-[#7A2633] transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="font-(family-name:--font-jost) text-[20px] font-medium">
            ₴{product.price.toLocaleString()}
          </span>
          {discount !== null && (
            <>
              <span className="font-(family-name:--font-jost) text-base font-normal text-[#818181] line-through">
                ₴{product.priceOld.toLocaleString()}
              </span>
              <span className="font-(family-name:--font-jost) text-base font-normal text-[#DF4441]">
                {discount}%
              </span>
            </>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="flex gap-2 pt-0.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={(e) => { e.preventDefault(); handleColorChange(color); }}
                className="flex flex-col items-center gap-1.5"
                title={color}
              >
                <div
                  className="w-10 h-3"
                  style={{ backgroundColor: toHex(color) }}
                />
                <div className="w-10 h-px">
                  {color === activeColor && (
                    <motion.div
                      layoutId={`color-indicator-${product.id}`}
                      className="w-full h-full bg-black"
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
