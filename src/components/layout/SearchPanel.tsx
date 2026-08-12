"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";
import { useSearchStore } from "@/store/search.store";
import { useProductSearch } from "@/hooks/useProductSearch";

const MAX_RESULTS = 3;

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function SearchPanel({ isOpen, onClose, triggerRef }: SearchPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const history = useSearchStore((state) => state.history);
  const addQuery = useSearchStore((state) => state.addQuery);

  const {
    query,
    setQuery,
    trimmed,
    isLoading,
    results,
    isEmpty,
    hasMoreResults,
    submitSearch,
  } = useProductSearch({ isOpen, maxResults: MAX_RESULTS });

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

  const handleHistoryClick = (entry: string) => {
    setQuery(entry);
    addQuery(entry);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full z-40 w-full bg-white border-b border-[#EBEBEB]"
        >
          <Container>
            <div className="px-8">
              <div className="flex items-center gap-17.5 pt-12 pb-4">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitSearch();
                    }}
                    placeholder="search"
                    aria-label="Search products"
                    className="w-full border-0 border-b-[0.5px] border-b-[#4E4E4E] bg-transparent px-4 py-4 pr-8 text-[16px] text-[#010101] placeholder:text-[16px] placeholder:text-[#B3B3B3] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={submitSearch}
                    aria-label="Submit search"
                    className="absolute right-4 bottom-1 -translate-y-1/2 text-[#010101] hover:text-black transition-colors"
                  >
                    <Search size={24} strokeWidth={1.25} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-[#4E4E4E] hover:text-black transition-colors p-2.5"
                >
                  <X size={20} strokeWidth={1.25} />
                </button>
              </div>

              {(trimmed.length > 0 || history.length > 0) && (
                <div className="flex justify-between gap-6 py-6">
                  {/* Search history */}
                  {history.length > 0 && (
                    <div className="min-w-50 lg:min-w-75">
                      <p
                        className="text-[26px] font-semibold leading-[1.2] text-black mb-6"
                        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                      >
                        Search history
                      </p>
                      <div className="flex flex-col gap-4">
                        {history.map((entry) => (
                          <button
                            key={entry}
                            type="button"
                            onClick={() => handleHistoryClick(entry)}
                            className="relative w-fit text-left text-[14px] leading-normal font-normal text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100"
                            style={{ fontFamily: "var(--font-jost)" }}
                          >
                            {entry}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results */}
                  {trimmed.length > 0 && (
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <p
                          className="text-[26px] font-semibold leading-[1.2] text-black mb-6"
                          style={{
                            fontFamily: "var(--font-cormorant-garamond)",
                          }}
                        >
                          {isLoading
                            ? "Searching…"
                            : isEmpty
                              ? "Nothing found"
                              : "Top matches"}
                        </p>
                        {hasMoreResults && (
                          <Link
                            href={`/search?q=${encodeURIComponent(trimmed)}`}
                            onClick={onClose}
                            className="flex items-center gap-2 text-[20px] font-semibold text-black hover:text-[#7A2633] transition-colors"
                            style={{
                              fontFamily: "var(--font-cormorant-garamond)",
                            }}
                          >
                            View all products
                            <Image
                              src="/images/arrow-right-hero.svg"
                              alt=""
                              aria-hidden
                              width={24}
                              height={24}
                            />
                          </Link>
                        )}
                      </div>

                      {isLoading ? (
                        <p className="font-(family-name:--font-jost) text-sm font-light text-[#818181]">
                          Searching…
                        </p>
                      ) : isEmpty ? (
                        <p className="font-(family-name:--font-jost) text-[16px] font-light text-[#4E4E4E]">
                          Try another search or explore our collection.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-x-6 gap-y-10">
                          {results.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
