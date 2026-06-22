"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductFormValues,
  CATEGORIES,
  GENDERS,
  SEASONS,
} from "@/shemas/admin-product.shema";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductFormValues>;
  onSubmit: (data: CreateProductFormValues) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  serverError?: string | null;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
  loading = false,
  serverError,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && (
        <p className="text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3">{serverError}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" error={errors.name?.message}>
          <input {...register("name")} className={inputCls(!!errors.name)} placeholder="Product name" />
        </FormField>

        <FormField label="Category" error={errors.category?.message}>
          <select {...register("category")} className={inputCls(!!errors.category)}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Gender" error={errors.gender?.message}>
          <select {...register("gender")} className={inputCls(!!errors.gender)}>
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Season" error={errors.season?.message}>
          <select {...register("season")} className={inputCls(!!errors.season)}>
            <option value="">Select season</option>
            {SEASONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Price" error={errors.price?.message}>
          <input {...register("price", { valueAsNumber: true })} type="number" step="0.01" className={inputCls(!!errors.price)} placeholder="0.00" />
        </FormField>

        <FormField label="Old Price (optional)" error={errors.priceOld?.message}>
          <input {...register("priceOld", { valueAsNumber: true })} type="number" step="0.01" className={inputCls(!!errors.priceOld)} placeholder="0.00" />
        </FormField>

        <FormField label="Material" error={errors.material?.message} className="sm:col-span-2">
          <input {...register("material")} className={inputCls(!!errors.material)} placeholder="Leather, suede…" />
        </FormField>
      </div>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register("description")}
          rows={4}
          className={`${inputCls(!!errors.description)} resize-none`}
          placeholder="Product description"
        />
      </FormField>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function FormField({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] tracking-widest uppercase text-gray-500">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full border ${hasError ? "border-red-400" : "border-gray-200"} px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-400 transition-colors`;
}
