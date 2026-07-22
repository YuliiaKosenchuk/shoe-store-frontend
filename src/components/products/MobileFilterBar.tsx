"use client";

import { Filter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SortByButton } from "./SortByButton";

interface MobileFilterBarProps {
  activeFilterCount: number;
  onOpenFilters: () => void;
  sortLabel: string;
  isSortOpen: boolean;
  onToggleSort: () => void;
}

export function MobileFilterBar({
  activeFilterCount,
  onOpenFilters,
  sortLabel,
  isSortOpen,
  onToggleSort,
}: MobileFilterBarProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        layout
        type="button"
        onClick={onOpenFilters}
        className="flex items-center gap-2 text-[16px] font-normal leading-[1.3] text-[#010101]"
        transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
        style={{ fontFamily: "var(--font-jost)" }}
      >
        Filter
        <AnimatePresence initial={false}>
          {activeFilterCount > 0 && (
            <motion.span
              key="count"
              layout
              initial={{ opacity: 0, scale: 0.4, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 24 }}
              exit={{ opacity: 0, scale: 0.4, width: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex h-6 items-center justify-center rounded-full bg-[#7A2633] px-2 text-[14px] leading-none text-white overflow-hidden"
            >
              {activeFilterCount}
            </motion.span>
          )}
        </AnimatePresence>
        <Filter size={24} strokeWidth={1.25} />
      </motion.button>
      <SortByButton label={sortLabel} isOpen={isSortOpen} onClick={onToggleSort} />
    </div>
  );
}
