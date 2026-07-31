"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "@/components/ui/Container";

const MOBILE_QUERY = "(max-width: 767px)";

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

export default function HeroV4() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.5 });
  const bgY    = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "20%"]);
  const textY  = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "40%"]);
  const modelY = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen -mt-24 z-0 overflow-hidden"
    >
      {/* Layer 1 — background: full viewport width */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/images/hero-5-11.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Layer 2 — brand text: constrained by Container */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ y: textY }}
      >
        <Container className="h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="font-serif font-(--font-cormorant-garamond) text-[#E5E0DD] leading-[1.1] tracking-tight whitespace-nowrap select-none"
            style={{
              fontFamily: "var(--font-cormorant-garamond)",
              fontSize: "clamp(80px, 22vw, 420px)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            ATELIER
          </motion.h1>
        </Container>
      </motion.div>

      {/* Layer 3 — foreground model: full viewport width */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          y: modelY,
        }}
      >
        <Image
          src="/images/hero-511.png"
          alt="Model"
          fill
          priority
          quality={100}
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* Layer 4 — UI overlays: constrained by Container, no parallax */}
      <div className="absolute top-18 inset-0 z-30 pointer-events-none">
        <Container className="h-full relative px-4 md:px-8">
          <motion.div
            className="absolute top-14 right-5.5 md:right-8 flex gap-3 items-start pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
          >
            <div className="flex flex-col gap-1 items-end">
              <span className="font-(--font-jost) mb-2 text-[#010101]/90 text-[12px] uppercase tracking-widest leading-normal">
                Leather Goods
              </span>
              <span className="font-(--font-jost) text-[#010101]/90 text-[12px] uppercase tracking-widest leading-normal">
                SS26 Capsule
              </span>
            </div>
            <div className="w-px h-11 bg-[#010101]/90 mt-0.5 shrink-0" />
          </motion.div>

          <motion.div
            className="absolute top-[89%] left-0 max-[1114px]:top-auto max-[1114px]:bottom-0 max-[1114px]:left-1/2 max-[1114px]:-translate-x-1/2 pointer-events-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.55 }}
          >
            <Link
              href="/new-arrivals"
              className="group inline-flex items-center gap-6 font-(--font-jost) text-[#010101]/90 text-[16px] sm:text-[24px] uppercase leading-normal tracking-widest whitespace-nowrap hover:opacity-70 transition-opacity"
            >
              Discover Collection
              <Image
                src="/images/arrow-right-hero.svg"
                alt="arrow right"
                width={53}
                height={53}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
