"use client";

import { AnimatePresence, motion } from "motion/react";
import type { FilterOption } from "./ProductFilters.types";

const ROWS_PER_COLUMN = 6;

interface CheckboxOptionListProps {
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClearAll?: () => void;
  layout?: "grid" | "single";
}

export function CheckboxOptionList({
  options,
  selected,
  onToggle,
  onClearAll,
  layout = "grid",
}: CheckboxOptionListProps) {
  const rowCount = Math.min(options.length, ROWS_PER_COLUMN) || 1;

  if (layout === "single") {
    return (
      <div className="flex flex-col gap-4">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggle(option.value)}
              className="flex items-start gap-3 text-left w-fit"
            >
              <span
                className={`flex-none mt-0.5 w-4.5 h-4.5 border transition-colors ${checked ? "bg-black border-black" : "bg-white border-[#4E4E4E]"}`}
              />
              <span
                className="text-[14px] text-[#010101] leading-normal"
                style={{
                  fontFamily: "var(--font-jost)",
                }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid gap-x-10 gap-y-4 grid-flow-col auto-cols-[160px]"
        style={{
          gridTemplateRows: `repeat(${rowCount}, auto)`,
        }}
      >
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggle(option.value)}
              className="flex items-start gap-3 text-left w-fit"
            >
              <span
                className={`flex-none mt-0.5 w-4.5 h-4.5 border transition-colors ${checked ? "bg-black border-black" : "bg-white border-[#4E4E4E]"}`}
              />
              <span
                className="text-[14px] text-[#010101] leading-normal"
                style={{
                  fontFamily: "var(--font-jost)",
                }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence initial={false}>
        {selected.length > 0 && onClearAll && (
          <motion.button
            key="clear-all"
            type="button"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={onClearAll}
            className="text-[16px] underline text-[#4E4E4E] text-left w-fit"
            style={{
              fontFamily: "var(--font-jost)",
            }}
          >
            Clear all
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
