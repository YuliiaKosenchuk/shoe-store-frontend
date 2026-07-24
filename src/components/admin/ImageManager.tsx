"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, ImagePlus, Plus } from "lucide-react";
import type { ProductImageDto } from "@/shemas/product.shema";
import { createImageSchema } from "@/shemas/admin-product.shema";
import { AdminService } from "@/servises/admin.service";
import { getErrorMessage } from "@/lib/apiClient";
import { ConfirmModal } from "./ConfirmModal";
import { AdminSelect } from "./AdminSelect";

const COLORS = ["blue", "white", "brown", "red", "grey", "beige", "black"];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary: any;
  }
}

interface ImageManagerProps {
  productId: number;
  images: ProductImageDto[];
  onImagesChange: (images: ProductImageDto[]) => void;
  onRefresh?: () => Promise<void>;
}

interface PendingImageSet {
  mainUrl: string;
  additionalUrls: string[];
  color: string;
}

export function ImageManager({ productId, images, onImagesChange, onRefresh }: ImageManagerProps) {
  const [widgetReady, setWidgetReady] = useState(false);
  const [pending, setPending] = useState<PendingImageSet | null>(null);
  const [savingImage, setSavingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductImageDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const scriptId = "cloudinary-media-library";
    let cancelled = false;

    const markReady = () => {
      if (!cancelled) setWidgetReady(true);
    };

    if (document.getElementById(scriptId)) {
      const t = setTimeout(markReady, 0);
      return () => { cancelled = true; clearTimeout(t); };
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://media-library.cloudinary.com/global/all.js";
    script.onload = markReady;
    script.onerror = () => console.error("[Admin] Cloudinary widget script failed to load");
    document.body.appendChild(script);

    return () => { cancelled = true; };
  }, []);

  function openWidgetFor(onInsert: (url: string) => void) {
    if (!widgetReady || !window.cloudinary) return;
    window.cloudinary
      .createMediaLibrary(
        {
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          multiple: false,
        },
        {
          insertHandler: (data: { assets: Array<{ secure_url: string }> }) => {
            const url = data.assets[0]?.secure_url;
            if (url) onInsert(url);
          },
        }
      )
      .show();
  }

  function openForMain() {
    openWidgetFor((url) => {
      setPending({ mainUrl: url, additionalUrls: [], color: "" });
    });
  }

  function openForAdditional() {
    if (!pending) return;
    openWidgetFor((url) => {
      setPending((prev) =>
        prev ? { ...prev, additionalUrls: [...prev.additionalUrls, url] } : prev
      );
    });
  }

  function removeAdditional(idx: number) {
    if (!pending) return;
    setPending({ ...pending, additionalUrls: pending.additionalUrls.filter((_, i) => i !== idx) });
  }

  async function saveImage() {
    if (!pending) return;

    const parsed = createImageSchema.safeParse({
      color: pending.color,
      mainUrl: pending.mainUrl,
      urls: pending.additionalUrls,
    });
    if (!parsed.success) {
      const fieldError = parsed.error.issues[0];
      setImageError(fieldError?.message ?? "Please check the photo set and try again.");
      return;
    }

    setImageError(null);
    setSavingImage(true);
    try {
      const saved = await AdminService.createImage(productId, parsed.data);
      if (onRefresh) {
        await onRefresh();
      } else {
        onImagesChange([...images, saved]);
      }
      setPending(null);
    } catch (err) {
      console.error("[Admin] image save error:", err);
      setImageError(getErrorMessage(err, "Failed to save image. Please try again."));
    } finally {
      setSavingImage(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await AdminService.deleteImage(deleteTarget.productId, deleteTarget.color);
      if (onRefresh) {
        await onRefresh();
      } else {
        onImagesChange(images.filter((img) => img.id !== deleteTarget.id));
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error("[Admin] image delete error:", err);
      setDeleteError(getErrorMessage(err, "Failed to delete photo set. Please try again."));
    } finally {
      setDeleting(false);
    }
  }

  const deleteCount = 1 + (deleteTarget?.urls?.length ?? 0);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          type="button"
          onClick={openForMain}
          disabled={!widgetReady || !!pending}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:border-gray-400 transition-colors disabled:opacity-40"
        >
          <ImagePlus size={14} strokeWidth={1.25} />
          Add Photo Set
        </button>
        {!widgetReady && <span className="text-xs text-gray-400">Loading widget…</span>}
      </div>

      {pending && (
        <div className="mb-4 border border-gray-200 p-4">
          <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-3">New photo set</p>

          <div className="flex gap-2 flex-wrap mb-4">
            {/* Main image */}
            <div className="relative h-24 w-24 shrink-0">
              <Image src={pending.mainUrl} alt="main" fill className="object-cover" unoptimized />
              <span className="absolute top-0.5 left-0.5 bg-black text-white text-[8px] tracking-widest uppercase px-1.5 py-0.5 leading-tight">
                Main
              </span>
            </div>

            {/* Additional images */}
            {pending.additionalUrls.map((url, idx) => (
              <div key={idx} className="relative h-24 w-24 shrink-0 group">
                <Image src={url} alt={`extra ${idx + 1}`} fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => removeAdditional(idx)}
                  className="absolute top-0.5 right-0.5 bg-white/90 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <Trash2 size={11} strokeWidth={1.25} className="text-red-500" />
                </button>
              </div>
            ))}

            {/* Add another photo */}
            <button
              type="button"
              onClick={openForAdditional}
              disabled={!widgetReady}
              className="h-24 w-24 flex flex-col items-center justify-center border border-dashed border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 transition-colors disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={1.25} />
              <span className="text-[9px] tracking-widest uppercase mt-1">Add</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 max-w-xs">
            <label className="text-[10px] tracking-widest uppercase text-gray-500">Color</label>
            <AdminSelect
              value={pending.color}
              onChange={(color) => setPending({ ...pending, color })}
              options={COLORS.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
              placeholder="Select color"
              error={!!imageError}
            />
            {imageError && <p className="text-[11px] text-red-500">{imageError}</p>}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={saveImage}
                disabled={savingImage}
                className="bg-[#010101] text-white text-xs tracking-widest uppercase px-5 py-2 hover:bg-[#2C2C2C] transition-colors disabled:bg-[#DADADA] disabled:text-[#818181]"
              >
                {savingImage ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => { setPending(null); setImageError(null); }}
                className="border border-gray-200 text-xs tracking-widest uppercase px-5 py-2 text-gray-500 hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((img) => (
            <div key={img.id} className="border border-gray-100 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-gray-500">{img.color}</span>
                  <span className="text-[10px] text-gray-300">set id: {img.id}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(img)}
                  className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={11} strokeWidth={1.25} />
                  Delete set
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {/* Main image */}
                <div className="relative h-20 w-20 shrink-0">
                  <Image src={img.mainUrl} alt={img.color} fill className="object-cover" unoptimized />
                  <span className="absolute top-0.5 left-0.5 bg-black text-white text-[8px] tracking-widest uppercase px-1 py-0.5 leading-tight">
                    Main
                  </span>
                </div>
                {/* Additional images */}
                {img.urls?.map((url, idx) => (
                  <div key={idx} className="relative h-20 w-20 shrink-0">
                    <Image src={url} alt={`${img.color} ${idx + 2}`} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !pending && (
        <p className="text-xs text-gray-400">No images yet.</p>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete photo set?"
        description={`This will delete all ${deleteCount} photo${deleteCount !== 1 ? "s" : ""} for color "${deleteTarget?.color}".`}
        confirmLabel="Delete"
        loading={deleting}
        error={deleteError}
        onConfirm={handleDelete}
        onCancel={() => { setDeleteTarget(null); setDeleteError(null); }}
      />
    </div>
  );
}
