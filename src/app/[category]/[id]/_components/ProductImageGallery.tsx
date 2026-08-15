"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ProductImageLightbox } from "./ProductImageLightbox";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const displayImages = images.length > 0 ? images : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [emblaApi, images]);

  if (displayImages.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="relative aspect-3/4 bg-[#F8F8F8] flex items-center justify-center">
          <span className="text-sm tracking-widest uppercase text-gray-400">No images</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* md and below: carousel, edge-to-edge, arrows always visible on the image itself */}
      <div className="-mx-4 lg:hidden">
        <div className="relative mx-auto w-full max-w-97.5">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {displayImages.map((url, i) => (
                <div key={i} className="relative aspect-390/522 min-w-0 shrink-0 grow-0 basis-full bg-[#F8F8F8]">
                  <Image
                    src={url}
                    alt={`${productName} — view ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="390px"
                  />
                </div>
              ))}
            </div>
          </div>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-7.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} strokeWidth={1.25} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-7.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight size={24} strokeWidth={1.25} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* lg and up: static grid */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        {displayImages.map((url, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Enlarge image ${i + 1}`}
            className="relative aspect-3/4 bg-[#F8F8F8] cursor-zoom-in"
          >
            <Image
              src={url}
              alt={`${productName} — view ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="28vw"
            />
          </button>
        ))}
      </div>

      <ProductImageLightbox
        images={displayImages}
        productName={productName}
        startIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
