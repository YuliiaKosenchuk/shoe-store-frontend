"use client";

import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";
import { motion } from "framer-motion";

export default function HeroV3() {
  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-150 overflow-hidden bg-white">
      {/* MODE — top */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center z-10 pointer-events-none"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span
          className="font-light text-[#010101] leading-[1.1] tracking-tight select-none"
          style={{ fontFamily: "var(--font-cormorant-garamond)", fontSize: "clamp(64px, 12.22vw, 220px)" }}
        >
          MODE
        </span>
      </motion.div>

      {/* Center frame image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
      >
        <div className="relative w-[min(440px,55vw)] aspect-440/515">
          <Image
            src="/images/hero-frame.png"
            alt="Mode Atelier"
            fill
            priority
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* ATELIER — bottom */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 flex justify-center z-30 pointer-events-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
      >
        <span
          className="text-[#010101] leading-[1.1] tracking-tight select-none"
          style={{ fontFamily: "var(--font-cormorant-garamond)", fontSize: "clamp(70px, 13.33vw, 240px)" }}
        >
          ATELIER
        </span>
      </motion.div>
    </section>
  );
}
