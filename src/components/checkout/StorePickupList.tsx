"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { storeLocations } from "@/lib/storeLocations";
import type { StoreLocation } from "@/shemas/checkout.shema";

interface StorePickupListProps {
  selectedStoreId: string | null;
  onSelect: (store: StoreLocation) => void;
}

function formatStoreLabel(store: StoreLocation) {
  return `${store.name}, ${store.address}, ${store.city}`;
}

export function StorePickupList({ selectedStoreId, onSelect }: StorePickupListProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedStore =
    storeLocations.find((store) => store.id === selectedStoreId) ?? null;

  useEffect(() => {
    if (!selectedStore) {
      onSelect(storeLocations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore]);

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

  return (
    <div ref={ref} className="relative mt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 pl-7 font-(family-name:--font-jost) text-sm text-black hover:opacity-70 transition-opacity"      >
        <span className="truncate">
          {selectedStore ? formatStoreLabel(selectedStore) : ""}
        </span>
        <motion.div layout className="shrink-0">
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
        <div className="custom-scrollbar absolute inset-x-0 top-full z-10 mt-1 max-h-48 overflow-y-auto border border-gray-200 bg-white shadow-sm">
          {storeLocations
            .filter((store) => store.id !== selectedStoreId)
            .map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => {
                  onSelect(store);
                  setOpen(false);
                }}
                className="flex h-5.25 w-full items-center truncate pl-7 pr-4 font-(family-name:--font-jost) text-[14px] leading-normal font-normal text-black transition-colors hover:bg-[#F8F8F8]"
              >
                {formatStoreLabel(store)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
