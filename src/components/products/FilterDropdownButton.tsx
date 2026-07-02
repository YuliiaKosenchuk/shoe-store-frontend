"use client";

import { AnimatePresence, motion } from "motion/react";

interface FilterDropdownButtonProps {
  label: string;
  isOpen: boolean;
  activeCount?: number;
  onClick: () => void;
}

export function FilterDropdownButton({
  label,
  isOpen,
  activeCount = 0,
  onClick,
}: FilterDropdownButtonProps) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-[16px] font-normal leading-[1.3] text-[#010101]"
      transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
      style={{
        fontFamily: "var(--font-jost)",
      }}
    >
      {label}
      <AnimatePresence initial={false}>
        {activeCount > 0 && (
          <motion.span
            key="count"
            layout
            initial={{ opacity: 0, scale: 0.4, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: 24 }}
            exit={{ opacity: 0, scale: 0.4, width: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center h-6 rounded-full bg-[#7A2633] text-white text-[14px] leading-none overflow-hidden"
          >
            {activeCount}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div layout>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-[#010101] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M19 12L12 19L5 12M12 19V5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}
