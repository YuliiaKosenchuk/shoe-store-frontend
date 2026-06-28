"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { VariantModal } from "@/components/admin/VariantModal";
import { ImageManager } from "@/components/admin/ImageManager";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { AdminService } from "@/servises/admin.service";
import { ProductsService } from "@/servises/products.service";
import type { CreateProductFormValues, CreateVariantFormValues } from "@/shemas/admin-product.shema";
import type { Product, ProductVariantDto, ProductImageDto } from "@/shemas/product.shema";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [variants, setVariants] = useState<ProductVariantDto[]>([]);
  const [images, setImages] = useState<ProductImageDto[]>([]);

  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariantDto | null>(null);
  const [variantLoading, setVariantLoading] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);

  const [deleteVariantTarget, setDeleteVariantTarget] = useState<ProductVariantDto | null>(null);
  const [deletingVariant, setDeletingVariant] = useState(false);

  async function refreshImages() {
    const imageList = await AdminService.getImages(productId);
    setImages(imageList);
  }

  useEffect(() => {
    console.log(`[Admin] loading product id=${productId} for edit`);
    Promise.all([
      ProductsService.getProduct(productId),
      AdminService.getVariants(productId),
      AdminService.getImages(productId),
    ])
      .then(([data, variantList, imageList]) => {
        console.log("[Admin] product loaded, resetting form");
        setProduct(data);
        setVariants(variantList);
        setImages(imageList);
      })
      .catch((err) => {
        console.error("[Admin] failed to load product:", err);
        setLoadError("Failed to load product");
      })
      .finally(() => setLoadingProduct(false));
  }, [productId]);

  async function handleUpdate(data: CreateProductFormValues) {
    setSaveError(null);
    setSaveSuccess(false);
    setSaveLoading(true);
    try {
      await AdminService.updateProduct(productId, data);
      setSaveSuccess(true);
    } catch (err) {
      console.error("[Admin] update product error:", err);
      setSaveError("Failed to update product");
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleVariantSubmit(data: CreateVariantFormValues) {
    setVariantError(null);
    setVariantLoading(true);
    try {
      if (editingVariant) {
        const updated = await AdminService.updateVariant(editingVariant.id, data);
        setVariants((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      } else {
        const created = await AdminService.createVariant(productId, data);
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

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  if (loadError || !product) {
    return (
      <p className="text-sm text-red-500 border border-red-200 bg-red-50 px-4 py-3">
        {loadError ?? "Product not found"}
      </p>
    );
  }

  const defaultValues: Partial<CreateProductFormValues> = {
    name: product.name,
    category: product.category as CreateProductFormValues["category"],
    description: product.description,
    price: product.price,
    priceOld: product.priceOld || undefined,
    gender: product.gender as CreateProductFormValues["gender"],
    season: product.season as CreateProductFormValues["season"],
    material: product.material,
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/catalog" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ChevronLeft size={18} strokeWidth={1.25} />
        </Link>
        <div>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-0.5">Admin / Catalog</p>
          <h1 className="font-serif text-3xl text-gray-900">Edit Product</h1>
          <p className="text-xs text-gray-400 mt-0.5">{product.name}</p>
        </div>
      </div>

      {/* Basic Info */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-gray-900 mb-6">Basic Info</h2>
        {saveSuccess && (
          <p className="mb-4 text-xs text-green-700 border border-green-200 bg-green-50 px-4 py-3">
            Product updated successfully.
          </p>
        )}
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={handleUpdate}
          loading={saveLoading}
          serverError={saveError}
          submitLabel="Save Changes"
        />
      </section>

      {/* Variants */}
      <section className="mb-12">
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
          <p className="text-xs text-gray-400">No variants yet.</p>
        ) : (
          <div className="border border-gray-100 overflow-x-auto">
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
      </section>

      {/* Images */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-gray-900 mb-4">Images</h2>
        <ImageManager
          productId={productId}
          images={images}
          onImagesChange={setImages}
          onRefresh={refreshImages}
        />
      </section>

      <VariantModal
        open={variantModalOpen}
        editing={editingVariant}
        loading={variantLoading}
        serverError={variantError}
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
