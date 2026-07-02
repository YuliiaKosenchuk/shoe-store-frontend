"use client";

import { X } from "lucide-react";
import type { FilterKey } from "./ProductFilters.types";

export interface FilterPin {
  key: FilterKey;
  value?: string;
  label: string;
}

interface FilterPinsRowProps {
  pins: FilterPin[];
  onRemove: (key: FilterKey, value?: string) => void;
  onClearAll: () => void;
}

export function FilterPinsRow({ pins, onRemove, onClearAll }: FilterPinsRowProps) {
  if (pins.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 px-8 py-6">
      {pins.map((pin) => (
        <button
          key={`${pin.key}-${pin.value ?? "range"}`}
          type="button"
          onClick={() => onRemove(pin.key, pin.value)}
          className="flex items-center gap-2 bg-[#F8F8F8] px-2 py-2.5 text-[14px] text-[#010101] leading-normal"
        >
          {pin.label}
          <X size={24} strokeWidth={1.5} />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-[16px] underline text-[#4E4E4E] hover:text-black transition-colors"
        style={{
          fontFamily: "var(--font-jost)",
        }}
      >
        Clear all
      </button>
    </div>
  );
}
