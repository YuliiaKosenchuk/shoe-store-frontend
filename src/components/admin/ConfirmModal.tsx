"use client";

import { motion, AnimatePresence } from "motion/react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm bg-white p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl text-gray-900">{title}</h2>
            {description && (
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 border border-gray-200 py-2.5 text-xs tracking-widest uppercase text-gray-500 hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 bg-red-600 py-2.5 text-xs tracking-widest uppercase text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
