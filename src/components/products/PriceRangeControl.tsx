"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

interface PriceRangeControlProps {
  bounds: { min: number; max: number };
  value: { min: number | null; max: number | null };
  onChange: (min: number | null, max: number | null) => void;
}

const THUMB_CLASS =
  "absolute inset-0 w-full appearance-none bg-transparent pointer-events-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#7A2633] [&::-webkit-slider-thumb]:cursor-pointer " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#7A2633] [&::-moz-range-thumb]:cursor-pointer";

export function PriceRangeControl({
  bounds,
  value,
  onChange,
}: PriceRangeControlProps) {
  // Local state drives the visuals on every drag tick so the thumb stays
  // smooth; onChange (which triggers URL update + refiltering, both
  // expensive) only fires once the user releases the slider — otherwise
  // that work runs on every pixel of the drag and stalls the thumb itself.
  // This only needs to be seeded once: the panel unmounts whenever it's
  // closed (including whenever the price filter is cleared externally, see
  // ProductFilterBar), so a fresh mount always picks up the latest value.
  const [localMin, setLocalMin] = useState(value.min ?? bounds.min);
  const [localMax, setLocalMax] = useState(value.max ?? bounds.max);

  const span = bounds.max - bounds.min || 1;

  function updateMin(next: number) {
    setLocalMin(Math.min(Math.max(next, bounds.min), localMax));
  }

  function updateMax(next: number) {
    setLocalMax(Math.max(Math.min(next, bounds.max), localMin));
  }

  function commit() {
    onChange(localMin, localMax);
  }

  function clearAll() {
    setLocalMin(bounds.min);
    setLocalMax(bounds.max);
    onChange(null, null);
  }

  function commitOnEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      commit();
      e.currentTarget.blur();
    }
  }

  function formatNumber(n: number) {
    return n.toLocaleString("en-US");
  }

  function parseDigits(raw: string) {
    return Number(raw.replace(/\D/g, "") || 0);
  }

  return (
    <div className="w-full min-[1110px]:max-w-102.75">
      <div
        className="flex items-center justify-between text-[16px] leading-[1.3] text-[#010101] mb-3"
        style={{
          fontFamily: "var(--font-jost)",
        }}
      >
        <span>€{bounds.min.toLocaleString()}</span>
        <span>€{bounds.max.toLocaleString()}+</span>
      </div>

      <div className="relative h-6 mb-12">
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-0.5 bg-[#B3B3B3]" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#7A2633]"
          style={{
            left: `${((localMin - bounds.min) / span) * 100}%`,
            right: `${100 - ((localMax - bounds.min) / span) * 100}%`,
          }}
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={localMin}
          onChange={(e) => updateMin(Number(e.target.value))}
          onMouseUp={commit}
          onTouchEnd={commit}
          onKeyUp={commit}
          className={THUMB_CLASS}
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={localMax}
          onChange={(e) => updateMax(Number(e.target.value))}
          onMouseUp={commit}
          onTouchEnd={commit}
          onKeyUp={commit}
          className={THUMB_CLASS}
          aria-label="Maximum price"
        />
      </div>

      <div
        className="flex items-center gap-4"
        style={{
          fontFamily: "var(--font-jost)",
        }}
      >
        <label className="flex-1">
          <span className="block text-[16px] text-[#010101] leading-[1.3] mb-2">
            Min
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] leading-[1.3] font-normal text-[#010101]">
              €
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(localMin)}
              onChange={(e) => updateMin(parseDigits(e.target.value))}
              onBlur={commit}
              onKeyDown={commitOnEnter}
              className="w-full border border-[#4E4E4E] pl-8 pr-4 py-3.25 text-[16px] leading-[1.3] font-normal text-[#010101] focus:outline-none focus:border-[#4E4E4E]"
            />
          </div>
        </label>
        <span className="mt-7 h-px w-4 shrink-0 bg-black" />
        <label className="flex-1">
          <span
            className="block text-[16px] text-[#010101] leading-[1.3] mb-2"
          >
            Max
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] leading-[1.3] font-normal text-[#010101]">
              €
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(localMax)}
              onChange={(e) => updateMax(parseDigits(e.target.value))}
              onBlur={commit}
              onKeyDown={commitOnEnter}
              className="w-full border border-[#4E4E4E] pl-8 pr-4 py-3.25 text-[16px] leading-[1.3] font-normal text-[#010101] focus:outline-none focus:border-[#4E4E4E]"
            />
          </div>
        </label>
      </div>

      <AnimatePresence initial={false}>
        {(localMin !== bounds.min || localMax !== bounds.max) && (
          <motion.button
            key="clear-all"
            type="button"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={clearAll}
            className="mt-6 text-[16px] underline text-[#4E4E4E] text-left w-fit"
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
