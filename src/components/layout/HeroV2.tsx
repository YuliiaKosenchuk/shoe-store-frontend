"use client";

import { useRef } from "react";
import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

export default function HeroV2() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="w-full overflow-hidden bg-white"
    >
      <Container className="min-h-[calc(100vh-4.5rem)] flex px-6 lg:px-12">
        {/* Left: text content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center py-24 lg:py-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="font-serif font-(--font-cormorant-garamond) text-[#010101] text-[72px] md:text-[96px] lg:text-[112px] leading-[1.0] tracking-tight mb-8"
          >
            The Modern
            <br />
            Essential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            className="font-(--font-jost) text-[#010101] text-[15px] leading-[1.6] max-w-[380px] mb-8"
          >
            Inspired by the beauty of nature and contemporary minimalism, our
            collection combines natural materials, refined craftsmanship, and
            thoughtful design. Timeless pieces created to be cherished season
            after season.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.45 }}
          >
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-5 font-serif font-(--font-cormorant-garamond) text-[#010101] text-[28px] leading-[1.1] uppercase tracking-widest hover:opacity-60 transition-opacity"
            >
              Discover Now{" "}
              <Image
                src="/images/arrow-right-hero.svg"
                alt=""
                width={40}
                height={40}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: model image */}
        <motion.div
          style={{ y: imageY }}
          className="hidden lg:block w-1/2 relative"
        >
          <Image
            src="/images/hero-22222.png"
            alt="Model"
            fill
            priority
            className="object-contain object-bottom"
          />
        </motion.div>
      </Container>
    </section>
  );
}
