"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/servises/products.mock";

const SCROLL_SPEED = 3;
const HOVER_ZONE = 0.18;

export default function BestsellersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: false,
  });

  const rafRef = useRef<number | null>(null);
  const carouselZoneRef = useRef<HTMLDivElement | null>(null);

  const stopScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startScroll = useCallback(
    (speed: number) => {
      if (!emblaApi) return;
      stopScroll();

      const engine = emblaApi.internalEngine();

      const tick = () => {
        const current = engine.location.get();
        const next = current + speed;
        const min = engine.limit.min;
        const max = engine.limit.max;

        if (next < min || next > max) {
          stopScroll();
          return;
        }

        engine.location.set(next);
        engine.translate.to(next);
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [emblaApi, stopScroll]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!carouselZoneRef.current) return;
      const rect = carouselZoneRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      if (x < width * HOVER_ZONE) {
        startScroll(SCROLL_SPEED);
      } else if (x > width * (1 - HOVER_ZONE)) {
        startScroll(-SCROLL_SPEED);
      } else {
        stopScroll();
      }
    },
    [startScroll, stopScroll]
  );

  const handleMouseLeave = useCallback(() => {
    stopScroll();
    emblaApi?.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, stopScroll]);

  useEffect(() => () => stopScroll(), [stopScroll]);

  return (
    <section className="pb-16">
      {/* Header — aligned with container content */}
      <div className="max-w-336 mx-auto px-8 flex items-baseline justify-between mb-8">
        <h2
          className="text-[36px] leading-[1.1] tracking-tight text-black font-semibold"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Bestsellers
        </h2>
        <Link
          href="/bestsellers"
          className="flex items-center gap-1.5 text-[26px] font-semibold leading-[1.2] text-black hover:text-[#7A2633] transition-colors"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          View all
          <Image src="/images/arrow-right-hero.svg" alt="" aria-hidden width={24} height={24} />
        </Link>
      </div>

      {/* Full-width carousel — hover zones only here */}
      <div
        ref={carouselZoneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div
            className="flex gap-6"
            style={{
              paddingLeft: "max(2rem, calc((100vw - 1344px) / 2 + 2rem))",
              paddingRight: "max(2rem, calc((100vw - 1344px) / 2 + 2rem))",
            }}
          >
            {MOCK_PRODUCTS.map((product, i) => (
              <div key={product.id} className="flex-none w-74.5">
                <ProductCard product={product} priority={i < 4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
