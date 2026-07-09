"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface QuantitySelectProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  max?: number;
}

export function QuantitySelect({ quantity, onChange, disabled = false, max = 10 }: QuantitySelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const options = Array.from({ length: Math.max(max, quantity) }, (_, i) => i + 1);

  return (
    <div ref={ref} className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="flex items-center gap-2 font-(family-name:--font-jost) font-normal text-base text-[#010101] hover:opacity-70 transition-opacity disabled:opacity-50"
      >
        <span>Qty {quantity}</span>
        <motion.div layout>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`text-[#010101] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-10 mt-1 max-h-48 w-16 overflow-y-auto border border-gray-200 bg-white shadow-sm [scrollbar-width:thin] [scrollbar-color:#7A2633_#F2EDE6] [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-track]:bg-[#F2EDE6] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#7A2633]"
        >

          {options.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setOpen(false);
                if (n !== quantity) onChange(n);
              }}
              className={`block w-full px-3 py-1.5 text-left font-(family-name:--font-jost) text-sm transition-colors hover:bg-gray-50 ${
                n === quantity ? "font-medium text-[#010101]" : "text-[#4E4E4E]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
