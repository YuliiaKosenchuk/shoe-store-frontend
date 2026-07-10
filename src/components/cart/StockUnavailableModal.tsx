"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CartItemDto } from "@/shemas/cart.shema";

interface StockUnavailableModalProps {
  open: boolean;
  unavailableItems: CartItemDto[];
  onClose: () => void;
}

export function StockUnavailableModal({ open, unavailableItems, onClose }: StockUnavailableModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#343434]/44 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex w-170 max-w-full flex-col justify-center bg-white p-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-(family-name:--font-jost) font-semibold text-[20px] leading-[1.3] text-black">
              Some items in your cart are no longer available in the requested quantity.
            </p>

            <ul className="mt-4 max-h-40 space-y-1 overflow-y-auto font-(family-name:--font-jost) text-sm text-[#4E4E4E]">
              {unavailableItems.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.color}, size {item.size}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={onClose}
                className="w-full cursor-pointer bg-black py-3.75 font-(family-name:--font-jost) text-sm uppercase leading-[1.3] text-white transition-colors hover:bg-black/80"
              >
                Go to cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
