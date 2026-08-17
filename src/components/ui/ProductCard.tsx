"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { useCallback, useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Product } from "@/shemas/product.shema";
import { ProductsService } from "@/servises/products.service";
import { toSwatchBackground } from "@/lib/productColors";


const FALLBACK_IMAGES: string[] = [];

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  selectedColors?: string[];
  selectedSizes?: string[];
  isNew?: boolean;
}

function pickInitialColor(product: Product, selectedColors?: string[]): string {
  const filterMatch = selectedColors?.find((c) => product.colors.includes(c));
  if (filterMatch) return filterMatch;

  return product.colors[0] ?? "";
}

export function ProductCard({ product, priority = false, selectedColors, selectedSizes, isNew = false }: ProductCardProps) {
  const router = useRouter();
  const cardId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    // touch swipe is disabled here because arrows are always visible on touchscreens for manual
    // paging, and letting embla also handle touchstart makes this gallery fight the outer product
    // carousel for the same swipe gesture; mouse drag stays enabled for desktop.
    watchDrag: (_, evt) => evt.type !== "touchstart",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeColor, setActiveColor] = useState<string>(() => pickInitialColor(product, selectedColors));

  const selectedColorsKey = selectedColors?.join(",") ?? "";
  const [syncedKey, setSyncedKey] = useState(selectedColorsKey);
  if (syncedKey !== selectedColorsKey) {
    setSyncedKey(selectedColorsKey);
    const filterMatch = selectedColors?.find((c) => product.colors.includes(c));
    if (filterMatch) setActiveColor(filterMatch);
  }

  const { data: allImages = null } = useQuery({
    queryKey: ["product-images", product.id],
    queryFn: () => ProductsService.getImages(product.id),
  });

  const { data: variants } = useQuery({
    queryKey: ["product-variants", product.id],
    queryFn: () => ProductsService.getVariants(product.id),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [emblaApi, activeColor, allImages]);

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

  const handleColorChange = useCallback((color: string) => {
    setActiveColor(color);
  }, []);

  const imageSource = allImages ?? product.images;
  const activeImages = imageSource.filter((img) => img.color === activeColor);
  const rawImages = activeImages.flatMap((img) => {
    const others = (img.urls ?? []).filter((u) => u !== img.mainUrl);
    return img.mainUrl ? [img.mainUrl, ...others] : (img.urls ?? []);
  });

  // filter out invalid URLs from DB until they're fixed in admin
  const validImages = rawImages.filter((url) => { try { new URL(url); return true; } catch { return false; } });
  const carouselImages = validImages.length > 0 ? validImages : FALLBACK_IMAGES;

  const allSizeNumbers = [35, 36, 37, 38, 39, 40, 41, 42];
  const availableSizeSet = new Set(
    (variants ?? [])
      .filter((v) => v.color === activeColor && v.stockQty > 0)
      .map((v) => Number(v.size))
  );
  const discount =
    product.priceOld > 0 && product.priceOld > product.price
      ? Math.round((1 - product.price / product.priceOld) * 100)
      : null;

  const matchedColorCount = selectedColors
    ? new Set(product.colors.filter((c) => selectedColors.includes(c))).size
    : 0;

  const matchedSizeCount = selectedSizes
    ? new Set(
        (variants ?? [])
          .filter((v) => v.stockQty > 0 && selectedSizes.includes(String(v.size)))
          .map((v) => String(v.size))
      ).size
    : 0;

  const showSizeSelector = product.category.toLowerCase() !== "bags" && product.category.toLowerCase() !== "accessories";

  const isOutOfStock = variants !== undefined && (variants.length === 0 || variants.every((v) => v.stockQty <= 0));

  return (
    <div className="group flex flex-col cursor-pointer w-full">
      <div
        className="relative w-full aspect-302/404 overflow-hidden bg-[#F8F8F8] cursor-pointer"
        onClick={() => router.push(`/${product.category.toLowerCase()}/${product.id}?color=${encodeURIComponent(activeColor)}`)}
      >
        {carouselImages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <span className="font-(family-name:--font-jost) text-sm text-[#818181]">No image</span>
          </div>
        ) : (
          <div ref={emblaRef} className="h-full overflow-hidden">
            <div className="flex h-full">
              {carouselImages.map((url, i) => (
                <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full bg-[#F8F8F8]">
                  <Image
                    src={url}
                    alt={`${product.name} — view ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover ${isOutOfStock ? "grayscale" : ""}`}
                    priority={priority && i === 0}
                    loading={priority && i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {isOutOfStock && <div className="absolute inset-0 z-6 bg-white/50 pointer-events-none" />}
        {(isOutOfStock || isNew || matchedColorCount > 1 || matchedSizeCount > 1) && (
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
            {isOutOfStock && (
              <span className="bg-white px-2.5 py-1 text-[14px] font-(family-name:--font-jost) text-[#DF4441]">
                Out of stock
              </span>
            )}
            {isNew && !isOutOfStock && (
              <span className="bg-[#010101] px-2.5 py-1 text-[14px] font-(family-name:--font-jost) text-white">
                New
              </span>
            )}
            {matchedColorCount > 1 && (
              <span className="bg-white px-1 py-1 text-[14px] font-(family-name:--font-jost) text-[#010101]">
                {matchedColorCount} colours
              </span>
            )}
            {matchedSizeCount > 1 && (
              <span className="bg-white px-1 py-1 text-[14px] font-(family-name:--font-jost) text-[#010101]">
                {matchedSizeCount} sizes
              </span>
            )}
          </div>
        )}
        <WishlistButton product={product} className="absolute top-3 right-3 z-10" hideWhenInactive />
        {carouselImages.length > 1 && (
          <>
            {/* md and below: arrows always visible (no hover on touchscreens); lg and up: reveal on hover */}
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} strokeWidth={1.25} />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={24} strokeWidth={1.25} />
            </button>
          </>
        )}

        {carouselImages.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div
              className="h-full bg-gray-800 transition-all duration-300 ease-out"
              style={{
              width: `${100 / carouselImages.length}%`,
              transform: `translateX(${selectedIndex * 100}%)`,
            }}
            />
          </div>
        )}

        {showSizeSelector && (
          <div className="absolute bottom-4 left-4 right-4 h-17 bg-[#DADADA]/35 px-4 pt-3 pb-4 translate-y-[calc(100%+16px)] group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <p className="text-[14px] leading-normal tracking-widest text-[#343434] mb-2.5">Size</p>
            <div className="flex gap-3 flex-wrap">
              {allSizeNumbers.map((size) => {
                const available = availableSizeSet.has(size);
                return (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    disabled={!available}
                    className={`text-sm font-sans text-[14px] transition-colors ${
                      available
                        ? "font-light text-[#010101]/90 hover:text-[#7A2633] cursor-pointer"
                        : "font-light text-[#818181] cursor-default pointer-events-none"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>


      <div className="mt-3 space-y-1.5">
        <Link
          href={`/${product.category.toLowerCase()}/${product.id}?color=${encodeURIComponent(activeColor)}`}
          className="font-(family-name:--font-jost) text-base font-normal leading-snug text-gray-900 hover:text-[#7A2633] transition-colors truncate block"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="font-(family-name:--font-jost) text-[20px] font-medium">
            €{product.price.toLocaleString()}
          </span>
          {discount !== null && discount > 0 && (
            <>
              <span className="font-(family-name:--font-jost) text-base font-normal text-[#818181] line-through">
                €{product.priceOld.toLocaleString()}
              </span>
              <span className="font-(family-name:--font-jost) text-base font-normal text-[#DF4441]">
                {discount}%
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {[...new Set(product.colors)].map((color) => (
            <button
              key={color}
              onClick={(e) => { e.preventDefault(); handleColorChange(color); }}
              className="flex flex-col items-center gap-1.5"
              title={color}
            >
              <div
                className="w-10 h-3"
                style={{ background: toSwatchBackground(color) }}
              />
              <div className="w-10 h-px">
                {color === activeColor && (
                  <motion.div
                    layoutId={`color-indicator-${cardId}`}
                    className="w-full h-full bg-black"
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
