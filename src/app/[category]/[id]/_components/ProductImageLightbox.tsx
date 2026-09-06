"use client";

import { CloudinaryImage as Image } from "@/components/ui/CloudinaryImage";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProductImageLightboxProps {
  images: string[];
  productName: string;
  startIndex: number | null;
  onClose: () => void;
}

export function ProductImageLightbox({ images, productName, startIndex, onClose }: ProductImageLightboxProps) {
  const isOpen = startIndex !== null;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: startIndex ?? 0 });
  const [selectedIndex, setSelectedIndex] = useState(startIndex ?? 0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!isOpen || !emblaApi || startIndex === null) return;
    emblaApi.reInit();
    emblaApi.scrollTo(startIndex, true);
  }, [isOpen, emblaApi, startIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, scrollPrev, scrollNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 hidden lg:flex items-center justify-center bg-black/90 px-16 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-8 top-8 z-10 text-white/70 hover:text-white transition-colors"
          >
            <X size={28} strokeWidth={1.25} />
          </button>

          <motion.div
            className="flex h-full w-full max-w-6xl items-stretch gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* thumbnail rail */}
            <div className="flex w-24 shrink-0 flex-col justify-center gap-3 overflow-y-auto">
              {images.map((url, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-3/4 w-full shrink-0 bg-[#F8F8F8] transition-opacity ${
                    i === selectedIndex ? "opacity-100 ring-1 ring-white" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${productName} — thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>

            {/* main carousel — capped near native image resolution (433×577) to avoid upscale blur */}
            <div className="relative flex min-w-0 flex-1 items-center justify-center">
              <div ref={emblaRef} className="aspect-433/577 max-h-full max-w-full w-162.5 overflow-hidden">
                <div className="flex h-full">
                  {images.map((url, i) => (
                    <div key={i} className="relative h-full min-w-0 shrink-0 grow-0 basis-full bg-[#F8F8F8]">
                      <Image
                        src={url}
                        alt={`${productName} — view ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="650px"
                        priority={i === startIndex}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} strokeWidth={1.25} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} strokeWidth={1.25} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
