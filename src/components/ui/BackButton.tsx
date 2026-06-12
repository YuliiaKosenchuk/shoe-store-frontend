"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="px-4 pt-5 pb-0 w-full">
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-gray-400 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back
      </button>
    </div>
  );
}
