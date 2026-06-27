"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[calc(100vh-4.5rem)] min-h-150 overflow-hidden bg-[#C1BEBB0F]/6"
    >
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-[#010101] font-serif font-(--font-cormorant-garamond) leading-[1.1] text-[200px] md:text-[140px] lg:text-[180px] tracking-tight whitespace-nowrap -translate-y-60 drop-shadow-md"
        >
          {/* <span className="mr-[15vw] md:mr-56">MODERN</span>
          <span>LUXE</span> */}
          <span className="">your per</span>
          <span>sonality</span>
        </motion.h1>
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Image
          src="/images/hero-222.png"
          alt="Model front layer"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="absolute bottom-[10%] left-[5%] z-30 max-w-[410px]"
      >
        <p className="font-(--font-jost) text-[#010101] text-[16px] leading-[1.3] mb-4">
          Inspired by the beauty of nature and contemporary minimalism, our
          collection combines natural materials, refined craftsmanship, and
          thoughtful design. Timeless pieces created to be cherished season
          after season.
        </p>
        <Link
          href="/new-arrivals"
          className="inline-flex items-center gap-6 font-serif font-(--font-cormorant-garamond) text-[#010101] text-[36px] leading-[1.1] uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Discover Now <Image src="/images/arrow-right-hero.svg" alt="" width={53} height={53} />
        </Link>
      </motion.div>
    </section>
  );
}