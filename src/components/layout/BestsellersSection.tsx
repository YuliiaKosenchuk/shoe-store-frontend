"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { getNewestProductIds } from "@/components/products/getNewestProductIds";
// import { MOCK_PRODUCTS } from "@/servises/products.mock";

const SCROLL_SPEED = 3;
const AUTO_SCROLL_SPEED = 1;
const HOVER_ZONE = 0.18;
const MIN_LOOP_SLIDES = 16;
const MAX_REPEATS = 4;

export default function BestsellersSection() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getProducts,
  });

  const newestProductIds = getNewestProductIds(products);

  // Embla's loop mode needs the slide track to be at least ~2 viewports wide,
  // otherwise the wrap point sits too close and slides snap out of view abruptly.
  // Repeating the list guarantees that regardless of how many products the API returns.
  const repeatCount =
    products.length > 0
      ? Math.min(MAX_REPEATS, Math.max(1, Math.ceil(MIN_LOOP_SLIDES / products.length)))
      : 1;
  const loopSlides = Array.from({ length: repeatCount }, (_, set) =>
    products.map((product) => ({ product, key: `${product.id}-${set}` }))
  ).flat();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: true,
  });

  const rafRef = useRef<number | null>(null);
  const carouselZoneRef = useRef<HTMLDivElement | null>(null);

  const setCarouselRef = useCallback(
    (node: HTMLDivElement | null) => {
      carouselZoneRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

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

      const direction = speed > 0 ? 1 : -1;

      const tick = () => {
        const next = engine.offsetLocation.get() + speed;

        engine.location.set(next);
        engine.offsetLocation.set(next);
        engine.previousLocation.set(next);
        engine.target.set(next);
        engine.scrollLooper.loop(direction);
        engine.slideLooper.loop();
        engine.translate.to(engine.offsetLocation.get());
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

  const startAutoScroll = useCallback(() => {
    startScroll(-AUTO_SCROLL_SPEED);
  }, [startScroll]);

  const handleMouseEnter = useCallback(() => {
    stopScroll();
  }, [stopScroll]);

  const handleMouseLeave = useCallback(() => {
    startAutoScroll();
  }, [startAutoScroll]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", startAutoScroll);
    startAutoScroll();
    return () => { emblaApi.off("reInit", startAutoScroll); };
  }, [emblaApi, startAutoScroll]);

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

      {/* Carousel — full viewport width */}
      <div
        ref={setCarouselRef}
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-6">
          {loopSlides.map(({ product, key }, i) => (
            <div key={key} className="flex-none w-74.5">
              <ProductCard product={product} priority={i < 4} isNew={newestProductIds.has(product.id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
