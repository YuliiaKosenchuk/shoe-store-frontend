"use client";

import { AnimatePresence, motion } from "motion/react";

interface RemoveItemModalProps {
  open: boolean;
  itemName: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "drawer" | "page";
}

export function RemoveItemModal({
  open,
  itemName,
  loading = false,
  onConfirm,
  onCancel,
  variant = "drawer",
}: RemoveItemModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#343434]/44 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className={
              variant === "page"
                ? "flex h-64.5 w-170 max-w-full flex-col justify-center bg-white p-10"
                : "w-full max-w-sm bg-white p-8"
            }
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mt-2 font-(family-name:--font-jost) font-semibold text-[20px] leading-[1.3] text-black">
              Are you sure you want to remove &quot;{itemName}&quot; from your cart?
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 cursor-pointer bg-black py-3.75 font-(family-name:--font-jost) text-sm uppercase leading-[1.3] text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 cursor-pointer border border-black py-3.75 font-(family-name:--font-jost) text-sm leading-[1.3] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed"
              >
                {loading ? "Removing…" : "Remove"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
