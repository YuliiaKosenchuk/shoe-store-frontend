"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { VariantModal } from "@/components/admin/VariantModal";
import { ImageManager } from "@/components/admin/ImageManager";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { AdminService } from "@/servises/admin.service";
import type { CreateProductFormValues, CreateVariantFormValues } from "@/shemas/admin-product.shema";
import type { ProductDto, ProductVariantDto, ProductImageDto } from "@/shemas/product.shema";
import { Trash2, Pencil } from "lucide-react";

type Step = 1 | 2 | 3;

export default function NewProductPage() {
  const [step, setStep] = useState<Step>(1);
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [variants, setVariants] = useState<ProductVariantDto[]>([]);
  const [images, setImages] = useState<ProductImageDto[]>([]);

  const [step1Loading, setStep1Loading] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariantDto | null>(null);
  const [variantLoading, setVariantLoading] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);

  const [deleteVariantTarget, setDeleteVariantTarget] = useState<ProductVariantDto | null>(null);
  const [deletingVariant, setDeletingVariant] = useState(false);

  async function handleCreateProduct(data: CreateProductFormValues) {
    setStep1Error(null);
    setStep1Loading(true);
    try {
      const created = await AdminService.createProduct(data);
      setProduct(created);
      setStep(2);
    } catch (err) {
      console.error("[Admin] create product error:", err);
      setStep1Error("Failed to create product. Please try again.");
    } finally {
      setStep1Loading(false);
    }
  }

  async function handleVariantSubmit(data: CreateVariantFormValues) {
    if (!product) return;
    setVariantError(null);
    setVariantLoading(true);
    try {
      if (editingVariant) {
        const updated = await AdminService.updateVariant(editingVariant.id, data);
        setVariants((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      } else {
        const created = await AdminService.createVariant(product.id, data);
        setVariants((prev) => [...prev, created]);
      }
      setVariantModalOpen(false);
      setEditingVariant(null);
    } catch (err) {
      console.error("[Admin] variant save error:", err);
      setVariantError("Failed to save variant");
    } finally {
      setVariantLoading(false);
    }
  }

  async function handleDeleteVariant() {
    if (!deleteVariantTarget) return;
    setDeletingVariant(true);
    try {
      await AdminService.deleteVariant(deleteVariantTarget.id);
      setVariants((prev) => prev.filter((v) => v.id !== deleteVariantTarget.id));
      setDeleteVariantTarget(null);
    } catch (err) {
      console.error("[Admin] variant delete error:", err);
    } finally {
      setDeletingVariant(false);
    }
  }

  const stepLabel = (n: Step, title: string) => (
    <button
      onClick={() => product && setStep(n)}
      disabled={n !== 1 && !product}
      className={`flex items-center gap-2 text-xs tracking-widest uppercase transition-colors ${
        step === n ? "text-gray-900 font-medium" : product ? "text-gray-400 hover:text-gray-700" : "text-gray-300 cursor-not-allowed"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium border transition-colors ${
          step === n ? "border-gray-900 text-gray-900" : product ? "border-gray-300 text-gray-400" : "border-gray-200 text-gray-300"
        }`}
      >
        {n}
      </span>
      {title}
    </button>
  );

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/catalog" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ChevronLeft size={18} strokeWidth={1.25} />
        </Link>
        <div>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-0.5">Admin / Catalog</p>
          <h1 className="font-serif text-3xl text-gray-900">New Product</h1>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-10 border-b border-gray-100 pb-6">
        {stepLabel(1, "Basic Info")}
        <span className="text-gray-200">—</span>
        {stepLabel(2, "Variants")}
        <span className="text-gray-200">—</span>
        {stepLabel(3, "Images")}
      </div>

      {step === 1 && (
        <ProductForm
          onSubmit={handleCreateProduct}
          loading={step1Loading}
          serverError={step1Error}
          submitLabel="Create & Continue"
        />
      )}

      {step === 2 && product && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-gray-900">Variants</h2>
            <button
              onClick={() => { setEditingVariant(null); setVariantModalOpen(true); }}
              className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:border-gray-400 transition-colors"
            >
              + Add Variant
            </button>
          </div>

          {variants.length === 0 ? (
            <p className="text-xs text-gray-400 mb-6">No variants yet. Add at least one.</p>
          ) : (
            <div className="border border-gray-100 overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Size", "Color", "Stock", "SKU", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v) => (
                    <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-xs text-gray-900">{v.size}</td>
                      <td className="px-5 py-3 text-xs text-gray-700">{v.color}</td>
                      <td className="px-5 py-3 text-xs text-gray-700">{v.stockQty}</td>
                      <td className="px-5 py-3 text-xs text-gray-400">{v.sku || "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => { setEditingVariant(v); setVariantModalOpen(true); }}
                            className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <Pencil size={12} strokeWidth={1.25} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteVariantTarget(v)}
                            className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={12} strokeWidth={1.25} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={() => setStep(3)}
            className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Continue to Images →
          </button>
        </div>
      )}

      {step === 3 && product && (
        <div>
          <h2 className="font-serif text-xl text-gray-900 mb-4">Images</h2>
          <ImageManager
            productId={product.id}
            images={images}
            onImagesChange={setImages}
          />
          <div className="mt-8">
            <Link
              href="/admin/catalog"
              className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Done → Back to Catalog
            </Link>
          </div>
        </div>
      )}

      <VariantModal
        open={variantModalOpen}
        editing={editingVariant}
        loading={variantLoading}
        serverError={variantError}
        productName={product?.name ?? ""}
        existingSkus={variants.map((v) => v.sku).filter(Boolean)}
        onSubmit={handleVariantSubmit}
        onClose={() => { setVariantModalOpen(false); setEditingVariant(null); setVariantError(null); }}
      />

      <ConfirmModal
        open={!!deleteVariantTarget}
        title="Delete variant?"
        description={`Size ${deleteVariantTarget?.size}, color ${deleteVariantTarget?.color}`}
        confirmLabel="Delete"
        loading={deletingVariant}
        onConfirm={handleDeleteVariant}
        onCancel={() => setDeleteVariantTarget(null)}
      />
    </>
  );
}
