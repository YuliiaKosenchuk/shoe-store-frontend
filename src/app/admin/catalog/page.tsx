"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CloudinaryImage as Image } from "@/components/ui/CloudinaryImage";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { ProductsService } from "@/servises/products.service";
import { AdminService } from "@/servises/admin.service";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { AdminSelect } from "@/components/admin/AdminSelect";
import type { Product } from "@/shemas/product.shema";
import { CATEGORIES } from "@/shemas/admin-product.shema";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    console.log("[Admin] fetching products list");
    ProductsService.getProducts()
      .then((data) => {
        console.log(`[Admin] products loaded: ${data.length} items`);
        setProducts([...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      })
      .catch((err) => {
        console.error("[Admin] failed to fetch products:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await AdminService.deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("[Admin] delete product error:", err);
    } finally {
      setDeleting(false);
    }
  }

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-500 border border-red-200 bg-red-50 px-4 py-3">{error}</p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-1">Admin</p>
          <h1 className="font-serif text-3xl text-gray-900">Catalog</h1>
        </div>
        <Link
          href="/admin/catalog/new"
          className="flex items-center gap-2 bg-[#010101] text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#2C2C2C] transition-colors"
        >
          <Plus size={14} strokeWidth={1.25} />
          New Product
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative max-w-sm flex-1">
          <Search size={14} strokeWidth={1.25} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
            className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="min-w-42.5">
          <AdminSelect
            value={category}
            onChange={setCategory}
            options={[
              { value: "", label: "All categories" },
              ...CATEGORIES.map((c) => ({
                value: c,
                label: c.charAt(0) + c.slice(1).toLowerCase(),
              })),
            ]}
          />
        </div>
      </div>

      <div className="border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["ID", "Photo", "Name", "Category", "Price", "Colors", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-400 uppercase font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-xs text-gray-400">
                  No products found
                </td>
              </tr>
            )}
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-xs text-gray-500">{product.id}</td>
                <td className="px-5 py-4">
                  {product.images[0]?.mainUrl ? (
                    <div className="relative h-12 w-12">
                      <Image
                        src={product.images[0].mainUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-gray-100" />
                  )}
                </td>
                <td className="px-5 py-4 text-xs font-medium text-gray-900 max-w-50 truncate">
                  <Link href={`/admin/catalog/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">{product.category}</td>
                <td className="px-5 py-4 text-xs text-gray-900">${product.price}</td>
                <td className="px-5 py-4 text-xs text-gray-500">{product.colors.length}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/catalog/${product.id}/edit`}
                      className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Pencil size={12} strokeWidth={1.25} />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={12} strokeWidth={1.25} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete product?"
        description={
          <>
            <span className="inline-block max-w-60 truncate align-bottom" title={deleteTarget?.name}>
              &quot;{deleteTarget?.name}&quot;
            </span>{" "}
            will be permanently removed.
          </>
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
