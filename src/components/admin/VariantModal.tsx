"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { X, RefreshCw } from "lucide-react";
import { createVariantSchema, CreateVariantFormValues } from "@/shemas/admin-product.shema";
import type { ProductVariantDto } from "@/shemas/product.shema";
import { AdminSelect } from "@/components/admin/AdminSelect";

const COLORS = ["blue", "white", "brown", "red", "grey", "beige", "black"];

function buildSku(productName: string, color: string, size: string | undefined, existingSkus: string[]): string {
  const model = productName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
  const clr = (color || "").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
  const sz = (size ?? "000").replace(/[^0-9]/g, "").slice(0, 3).padEnd(3, "0");

  for (let i = 0; i < 20; i++) {
    const rand = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
    const sku = `${model}-${clr}-${sz}-${rand}`;
    if (!existingSkus.includes(sku)) return sku;
  }
  return `${model}-${clr}-${sz}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
}

interface VariantModalProps {
  open: boolean;
  editing?: ProductVariantDto | null;
  loading?: boolean;
  serverError?: string | null;
  productName?: string;
  existingSkus?: string[];
  onSubmit: (data: CreateVariantFormValues) => Promise<void>;
  onClose: () => void;
}

export function VariantModal({ open, editing, loading, serverError, productName = "", existingSkus = [], onSubmit, onClose }: VariantModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateVariantFormValues>({
    resolver: zodResolver(createVariantSchema),
    mode: "onChange",
  });

  const watchedColor = watch("color");
  const watchedSize = watch("size");

  function handleGenerateSku() {
    const sku = buildSku(productName, watchedColor ?? "", watchedSize, existingSkus);
    setValue("sku", sku, { shouldValidate: true });
  }

  useEffect(() => {
    if (open) {
      if (editing) {
        reset({ size: editing.size, color: editing.color, stockQty: editing.stockQty, sku: editing.sku });
      } else {
        reset({ size: "", color: "", stockQty: 0, sku: "" });
      }
    }
  }, [open, editing, reset]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm bg-white p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-gray-900">
                {editing ? "Edit Variant" : "Add Variant"}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                <X size={18} strokeWidth={1.25} />
              </button>
            </div>

            {serverError && (
              <p className="mb-4 text-xs text-red-600 border border-red-200 bg-red-50 px-3 py-2">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field label="Size" error={errors.size?.message}>
                <input
                  {...register("size")}
                  type="text"
                  className={inp(!!errors.size)}
                  placeholder="38"
                />
              </Field>

              <Field label="Color" error={errors.color?.message}>
                <Controller
                  control={control}
                  name="color"
                  render={({ field }) => (
                    <AdminSelect
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      options={COLORS.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                      placeholder="Select color"
                      error={!!errors.color}
                    />
                  )}
                />
              </Field>

              <Field label="Stock Qty" error={errors.stockQty?.message}>
                <input
                  {...register("stockQty", { valueAsNumber: true })}
                  type="number"
                  className={inp(!!errors.stockQty)}
                  placeholder="10"
                />
              </Field>

              <Field label="SKU (optional)" error={errors.sku?.message}>
                <div className="flex gap-2">
                  <input {...register("sku")} className={`${inp(false)} flex-1`} placeholder="AIR-BLK-38-A3F2" />
                  <button
                    type="button"
                    onClick={handleGenerateSku}
                    title="Generate SKU"
                    className="flex items-center gap-1.5 border border-gray-200 px-3 text-xs tracking-widest uppercase text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors shrink-0"
                  >
                    <RefreshCw size={12} strokeWidth={1.25} />
                    Gen
                  </button>
                </div>
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white text-xs tracking-widest uppercase py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? "Saving…" : editing ? "Update" : "Add"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-widest uppercase text-gray-500">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function inp(hasError: boolean) {
  return `w-full border ${hasError ? "border-red-400" : "border-gray-200"} px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-400 transition-colors`;
}
