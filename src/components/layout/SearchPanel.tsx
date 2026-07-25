"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { ProductsService } from "@/servises/products.service";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  isTransparent: boolean;
}

function isValidUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function SearchPanel({ isOpen, onClose, triggerRef, isTransparent }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    enabled: isOpen,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setDebouncedQuery("");
    }
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const inputCls = isTransparent
    ? "w-full border-0 border-b-[0.5px] border-b-white bg-transparent px-1 py-1.5 text-[14px] text-white placeholder:text-[14px] placeholder:text-white/80 outline-none transition-colors"
    : "w-full border-0 border-b-[0.5px] border-b-[#4E4E4E] bg-transparent px-1 py-1.5 text-[14px] text-[#010101] placeholder:text-[14px] placeholder:text-[#9a9a9a] outline-none transition-colors";

  const trimmed = debouncedQuery.trim();
  const results =
    trimmed.length === 0 || !products
      ? []
      : products
          .filter((p) => p.name.toLowerCase().includes(trimmed.toLowerCase()))
          .slice(0, 6);

  return (
    <div className="absolute inset-y-0 right-[41%] -top-2 mr-3 z-50 flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-56"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search products"
              className={inputCls}
            />

            {trimmed.length > 0 && (
              <div className="custom-scrollbar absolute left-0 right-0 top-full mt-2 max-h-90 overflow-y-auto bg-white shadow-md">
                {isLoading ? (
                  <p className="py-4 text-center font-(family-name:--font-jost) text-sm font-light text-gray-500">
                    Searching…
                  </p>
                ) : results.length === 0 ? (
                  <p className="py-4 text-center font-(family-name:--font-jost) text-sm font-light text-gray-500">
                    No results found.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#EBEBEB]">
                    {results.map((product) => {
                      const mainUrl = product.images[0]?.mainUrl;
                      return (
                        <li key={product.id}>
                          <Link
                            href={`/${product.category.toLowerCase()}/${product.id}`}
                            onClick={onClose}
                            className="flex items-center gap-3 px-3 py-2.5 group"
                          >
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-[#F8F8F8]">
                              {isValidUrl(mainUrl) && (
                                <Image
                                  src={mainUrl}
                                  alt={product.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-(family-name:--font-jost) text-sm font-normal text-gray-900 group-hover:text-[#7A2633] transition-colors">
                                {product.name}
                              </p>
                              <p className="mt-1 font-(family-name:--font-jost) text-sm font-medium text-[#010101]">
                                €{product.price.toLocaleString()}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
