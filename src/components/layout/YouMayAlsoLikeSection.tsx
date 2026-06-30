"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";

const SCROLL_SPEED = 3;
const HOVER_ZONE = 0.18;

interface Props {
  excludeId: number;
}

export default function YouMayAlsoLikeSection({ excludeId }: Props) {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getProducts,
  });

  const filtered = products.filter((p) => p.id !== excludeId).slice(0, 10);

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
    <section className="py-16">
      <div className="max-w-336 mx-auto px-8 flex items-baseline justify-between mb-8">
        <h2
          className="text-[36px] leading-[1.1] tracking-tight text-black font-semibold"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          You may also like
        </h2>
      </div>

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
            {filtered.map((product, i) => (
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
