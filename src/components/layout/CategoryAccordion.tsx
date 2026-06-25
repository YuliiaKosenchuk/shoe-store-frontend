"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const COLLAPSED_HEIGHT = 192;
const CONTAINER_HEIGHT = 900;

interface Category {
  label: string;
  href: string;
  src: string;
}

interface CategoryAccordionProps {
  categories: Category[];
}

export default function CategoryAccordion({ categories }: CategoryAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(categories.length - 1);
  const collapsedCount = categories.length - 1;
  const activeHeight = `calc(100% - ${collapsedCount * COLLAPSED_HEIGHT}px)`;

  return (
    <div
      className="flex flex-col w-full"
      style={{ height: `${CONTAINER_HEIGHT}px` }}
    >
      {categories.map(({ label, href, src }, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={href}
            className="relative overflow-hidden cursor-pointer"
            style={{ borderTop: index > 0 ? "1px solid #010101" : undefined }}
            initial={false}
            animate={{ height: isActive ? activeHeight : `${COLLAPSED_HEIGHT}px` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => !isActive && setActiveIndex(index)}
          >
            {/* Image fills the entire panel */}
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />

            {/* Gradient for label readability */}
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/50 to-transparent z-10" />

            {/* Label pinned to top, always visible in collapsed strip */}
            <div
              className="absolute inset-x-0 top-0 z-20 flex items-center px-8"
              style={{ height: `${COLLAPSED_HEIGHT}px` }}
            >
              <span className="uppercase tracking-widest text-[11px] [font-family:var(--font-jost)] text-white select-none">
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
