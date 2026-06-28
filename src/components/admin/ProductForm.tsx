"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductFormValues,
  CATEGORIES,
  GENDERS,
  SEASONS,
  MATERIALS,
} from "@/shemas/admin-product.shema";
import { AdminSelect } from "./AdminSelect";

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
    control,
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
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <AdminSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                placeholder="Select category"
                error={!!errors.category}
              />
            )}
          />
        </FormField>

        <FormField label="Gender" error={errors.gender?.message}>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <AdminSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={GENDERS.map((g) => ({ value: g, label: g }))}
                placeholder="Select gender"
                error={!!errors.gender}
              />
            )}
          />
        </FormField>

        <FormField label="Season" error={errors.season?.message}>
          <Controller
            control={control}
            name="season"
            render={({ field }) => (
              <AdminSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={SEASONS.map((s) => ({ value: s, label: s }))}
                placeholder="Select season"
                error={!!errors.season}
              />
            )}
          />
        </FormField>

        <FormField label="Price" error={errors.price?.message}>
          <input {...register("price", { valueAsNumber: true })} type="number" step="0.01" className={inputCls(!!errors.price)} placeholder="0.00" />
        </FormField>

        <FormField label="Old Price (optional)" error={errors.priceOld?.message}>
          <input {...register("priceOld", { valueAsNumber: true })} type="number" step="0.01" className={inputCls(!!errors.priceOld)} placeholder="0.00" />
        </FormField>

        <FormField label="Material" error={errors.material?.message} className="sm:col-span-2">
          <Controller
            control={control}
            name="material"
            render={({ field }) => (
              <AdminSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={MATERIALS.map((m) => ({ value: m, label: m }))}
                placeholder="Select material"
                error={!!errors.material}
              />
            )}
          />
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
