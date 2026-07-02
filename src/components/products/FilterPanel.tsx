"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import type { FilterControlType, FilterOption } from "./ProductFilters.types";
import { CheckboxOptionList } from "./CheckboxOptionList";
import { RadioOptionList } from "./RadioOptionList";
import { PriceRangeControl } from "./PriceRangeControl";

interface FilterPanelProps {
  control: FilterControlType | "radio-list";
  options?: FilterOption[];
  selectedValues?: string[];
  onToggleValue?: (value: string) => void;
  onClearValues?: () => void;
  selectedSingle?: string;
  onSelectSingle?: (value: string) => void;
  priceBounds?: { min: number; max: number };
  priceValue?: { min: number | null; max: number | null };
  onPriceChange?: (min: number | null, max: number | null) => void;
}

export function FilterPanel({
  control,
  options = [],
  selectedValues = [],
  onToggleValue,
  onClearValues,
  selectedSingle,
  onSelectSingle,
  priceBounds,
  priceValue,
  onPriceChange,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1, transition: { duration: 0.16, ease: "easeOut" } }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
      className="absolute left-0 right-0 top-full z-20 w-full bg-white border-t border-[#EBEBEB] shadow-xs overflow-hidden"
    >
      <Container>
        <div className="px-8 py-12">
          {control === "price-range" && priceBounds && priceValue && onPriceChange && (
            <PriceRangeControl bounds={priceBounds} value={priceValue} onChange={onPriceChange} />
          )}
          {control === "radio-list" && onSelectSingle && (
            <RadioOptionList options={options} selected={selectedSingle ?? ""} onChange={onSelectSingle} />
          )}
          {(control === "checkbox-list" || control === "checkbox-list-2col") && onToggleValue && (
            <CheckboxOptionList
              options={options}
              selected={selectedValues}
              onToggle={onToggleValue}
              onClearAll={onClearValues}
            />
          )}
        </div>
      </Container>
    </motion.div>
  );
}
