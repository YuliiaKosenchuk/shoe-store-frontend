"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const COLLAPSED_WIDTH = 250;
const CONTAINER_HEIGHT = 900;

interface Category {
  label: string;
  href: string;
  src: string;
}

interface CategoryAccordionHorizontalProps {
  categories: Category[];
}

export default function CategoryAccordionHorizontal({ categories }: CategoryAccordionHorizontalProps) {
  const [activeIndex, setActiveIndex] = useState(categories.length - 1);
  const collapsedCount = categories.length - 1;
  const activeWidth = `calc(100% - ${collapsedCount * COLLAPSED_WIDTH}px)`;

  return (
    <div
      className="flex w-full"
      style={{ height: `${CONTAINER_HEIGHT}px` }}
    >
      {categories.map(({ label, href, src }, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={href}
            className="relative overflow-hidden cursor-pointer"
            style={{ borderLeft: index > 0 ? "1px solid #010101" : undefined }}
            initial={false}
            animate={{ width: isActive ? activeWidth : `${COLLAPSED_WIDTH}px` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => !isActive && setActiveIndex(index)}
          >
            {/* Image fills the entire panel */}
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover"
              sizes="75vw"
            />

            {/* Gradient for label readability */}
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black/50 to-transparent z-10" />

            {/* Vertical label pinned to left, always visible in collapsed strip */}
            <div
              className="absolute inset-y-0 left-0 z-20 flex items-center justify-center"
              style={{ width: `${COLLAPSED_WIDTH}px` }}
            >
              <span
                className="uppercase tracking-widest text-[44px] [font-family:var(--font-jost)] text-white whitespace-nowrap select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {label}
              </span>
            </div>

            {/* Link overlay — covers expanded panel for navigation */}
            {isActive && (
              <Link
                href={href}
                className="absolute inset-0 z-30"
                aria-label={`Shop ${label}`}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
