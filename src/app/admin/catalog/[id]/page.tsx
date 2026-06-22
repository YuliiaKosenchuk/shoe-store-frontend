"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Pencil } from "lucide-react";
import { ProductsService } from "@/servises/products.service";
import type { Product, ProductVariantDto, ProductImageDto } from "@/shemas/product.shema";

function InfoRow({ label, value }: { label: string; value: string | number | undefined | null }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-widest text-gray-400 uppercase">{label}</span>
      <span className="text-sm text-gray-900">{value ?? "—"}</span>
    </div>
  );
}

export default function ViewProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariantDto[]>([]);
  const [images, setImages] = useState<ProductImageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ProductsService.getProduct(productId)
      .then((data) => {
        setProduct(data);
        setVariants(data.variants ?? []);
        setImages(
          (data.images ?? []).map((img, index) => ({
            id: img.id ?? -(index + 1),
            productId,
            color: img.color,
            mainUrl: img.mainUrl,
            urls: img.urls ?? [],
          }))
        );
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <p className="text-sm text-red-500 border border-red-200 bg-red-50 px-4 py-3">
        {error ?? "Product not found"}
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/catalog" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ChevronLeft size={18} strokeWidth={1.25} />
          </Link>
          <div>
            <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-0.5">Admin / Catalog</p>
            <h1 className="font-serif text-3xl text-gray-900">{product.name}</h1>
            <p className="text-xs text-gray-400 mt-0.5">#{product.id}</p>
          </div>
        </div>
        <Link
          href={`/admin/catalog/${productId}/edit`}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:border-gray-400 transition-colors"
        >
          <Pencil size={13} strokeWidth={1.25} />
          Edit
        </Link>
      </div>

      {/* Basic Info */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-gray-900 mb-6">Basic Info</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <InfoRow label="Name" value={product.name} />
          <InfoRow label="Category" value={product.category} />
          <InfoRow label="Gender" value={product.gender} />
          <InfoRow label="Season" value={product.season} />
          <InfoRow label="Price" value={`$${product.price}`} />
          {product.priceOld ? <InfoRow label="Old Price" value={`$${product.priceOld}`} /> : null}
          <InfoRow label="Material" value={product.material} />
        </div>
        {product.description && (
          <div className="mt-6 flex flex-col gap-1">
            <span className="text-[10px] tracking-widest text-gray-400 uppercase">Description</span>
            <p className="text-sm text-gray-900 leading-relaxed max-w-2xl">{product.description}</p>
          </div>
        )}
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-gray-900 mb-4">Variants</h2>
        {variants.length === 0 ? (
          <p className="text-xs text-gray-400">No variants.</p>
        ) : (
          <div className="border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Size", "Color", "Stock", "SKU"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.id} className="border-b border-gray-50">
                    <td className="px-5 py-3 text-xs text-gray-900">{v.size}</td>
                    <td className="px-5 py-3 text-xs text-gray-700">{v.color}</td>
                    <td className="px-5 py-3 text-xs text-gray-700">{v.stockQty}</td>
                    <td className="px-5 py-3 text-xs text-gray-400">{v.sku || "—"}</td>
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
        {images.length === 0 ? (
          <p className="text-xs text-gray-400">No images.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div key={img.id} className="flex flex-col gap-2">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={img.mainUrl}
                    alt={img.color}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] tracking-widest text-gray-400 uppercase">{img.color}</span>
                {img.urls.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {img.urls.map((url, i) => (
                      <div key={i} className="relative h-10 w-10 bg-gray-100">
                        <Image src={url} alt={`${img.color} ${i + 1}`} fill className="object-cover" unoptimized />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
