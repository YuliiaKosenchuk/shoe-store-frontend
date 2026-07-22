"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface MobileFilterAccordionSectionProps {
  label: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function MobileFilterAccordionSection({
  label,
  count = 0,
  isOpen,
  onToggle,
  children,
}: MobileFilterAccordionSectionProps) {
  return (
    <div className="border-b border-[#B3B3B3]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-7 text-left"
      >
        <span
          className="flex items-center gap-2 text-[16px] leading-[1.3] font-normal text-[#010101]"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {label}
          {count > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#7A2633] px-1.5 text-[14px] leading-none text-white">
              {count}
            </span>
          )}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 text-[#010101] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M19 12L12 19L5 12M12 19V5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.16, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
