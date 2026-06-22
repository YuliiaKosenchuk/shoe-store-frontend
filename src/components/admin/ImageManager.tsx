"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, ImagePlus } from "lucide-react";
import type { ProductImageDto } from "@/shemas/product.shema";
import { AdminService } from "@/servises/admin.service";
import { ConfirmModal } from "./ConfirmModal";

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
}

interface PendingImage {
  url: string;
  color: string;
}

export function ImageManager({ productId, images, onImagesChange }: ImageManagerProps) {
  const widgetRef = useRef<ReturnType<typeof window.cloudinary.createMediaLibrary> | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);
  const [pending, setPending] = useState<PendingImage | null>(null);
  const [savingImage, setSavingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductImageDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const scriptId = "cloudinary-media-library";
    let cancelled = false;

    const markReady = () => {
      if (!cancelled) {
        console.log("[Admin] Cloudinary widget script loaded");
        setWidgetReady(true);
      }
    };

    if (document.getElementById(scriptId)) {
      // Script already injected — signal ready on next tick to avoid synchronous setState in effect
      const t = setTimeout(markReady, 0);
      return () => { cancelled = true; clearTimeout(t); };
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://media-library.cloudinary.com/global/all.js";
    script.onload = markReady;
    script.onerror = () => {
      console.error("[Admin] Cloudinary widget script failed to load");
    };
    document.body.appendChild(script);

    return () => { cancelled = true; };
  }, []);

  function openWidget() {
    if (!widgetReady || !window.cloudinary) return;

    console.log("[Admin] Cloudinary widget opened");
    widgetRef.current = window.cloudinary.createMediaLibrary(
      {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        multiple: false,
      },
      {
        insertHandler: (data: { assets: Array<{ secure_url: string }> }) => {
          const url = data.assets[0]?.secure_url;
          if (!url) return;
          console.log(`[Admin] Cloudinary asset selected: url=${url}`);
          setPending({ url, color: "" });
        },
      }
    );
    widgetRef.current.show();
  }

  async function saveImage() {
    if (!pending || !pending.color.trim()) {
      setImageError("Please enter a color name");
      return;
    }
    setImageError(null);
    setSavingImage(true);
    try {
      const saved = await AdminService.createImage(productId, {
        color: pending.color.trim(),
        mainUrl: pending.url,
      });
      onImagesChange([...images, saved]);
      setPending(null);
    } catch (err) {
      console.error("[Admin] image save error:", err);
      setImageError("Failed to save image");
    } finally {
      setSavingImage(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await AdminService.deleteImage(deleteTarget.id, deleteTarget.color);
      onImagesChange(images.filter((img) => img.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("[Admin] image delete error:", err);
      setDeleteError("Failed to delete image. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          type="button"
          onClick={openWidget}
          disabled={!widgetReady}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:border-gray-400 transition-colors disabled:opacity-40"
        >
          <ImagePlus size={14} strokeWidth={1.25} />
          Add Photo
        </button>
        {!widgetReady && (
          <span className="text-xs text-gray-400">Loading widget…</span>
        )}
      </div>

      {pending && (
        <div className="mb-4 border border-gray-200 p-4 flex gap-4 items-start">
          <div className="relative h-20 w-20 shrink-0">
            <Image src={pending.url} alt="preview" fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-[10px] tracking-widest uppercase text-gray-500">
              Assign color for this photo
            </label>
            <input
              value={pending.color}
              onChange={(e) => setPending({ ...pending, color: e.target.value })}
              placeholder="e.g. black"
              className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
            {imageError && <p className="text-[11px] text-red-500">{imageError}</p>}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={saveImage}
                disabled={savingImage}
                className="bg-black text-white text-xs tracking-widest uppercase px-5 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square">
              <Image
                src={img.mainUrl}
                alt={img.color}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] tracking-widest px-2 py-1 uppercase">
                {img.color}
              </span>
              <button
                type="button"
                onClick={() => setDeleteTarget(img)}
                className="absolute top-1.5 right-1.5 bg-white/90 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 size={13} strokeWidth={1.25} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !pending && (
        <p className="text-xs text-gray-400">No images yet.</p>
      )}

      {deleteError && (
        <p className="mt-3 text-[11px] text-red-500 border border-red-200 bg-red-50 px-3 py-2">
          {deleteError}
        </p>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete image?"
        description={`Color: ${deleteTarget?.color}`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
