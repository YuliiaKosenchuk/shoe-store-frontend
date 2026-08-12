"use client";

import { useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProductSearch } from "@/hooks/useProductSearch";
import type { NavItem } from "./Header";

const MAX_RESULTS_MOBILE = 6;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuTop: number;
  openSection: string | null;
  toggleSection: (label: string) => void;
  mobileNavItems: NavItem[];
}

export function MobileMenu({
  isOpen,
  onClose,
  menuTop,
  openSection,
  toggleSection,
  mobileNavItems,
}: MobileMenuProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    setQuery,
    trimmed,
    isLoading,
    results,
    isEmpty,
    hasMoreResults,
    submitSearch,
  } = useProductSearch({ isOpen, maxResults: MAX_RESULTS_MOBILE });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          key="mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-[1115px]:hidden fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-[#B3B3B3] bg-white"
          style={{ top: menuTop }}
        >
          <div className="px-4 md:px-8 py-8">
            <div className="relative">
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
                className="w-full border-0 border-b-[0.5px] border-b-[#4E4E4E] bg-transparent px-4 py-3 pr-8 text-[16px] text-[#010101] placeholder:text-[16px] placeholder:text-[#B3B3B3] outline-none transition-colors"
              />
              <button
                type="button"
                onClick={submitSearch}
                aria-label="Submit search"
                className="absolute right-4 bottom-3 text-[#010101] hover:text-black transition-colors"
              >
                <Search size={24} strokeWidth={1.25} />
              </button>
            </div>
          </div>

          {trimmed.length === 0 ? (
            mobileNavItems.map((item) => {
              const isSectionOpen = openSection === item.label;
              const hasMenu = !!item.menu;

              if (!hasMenu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 md:px-8 py-4 font-(family-name:--font-jost) text-[16px] leading-[1.3] font-normal text-[#010101]"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleSection(item.label)}
                    className="w-full flex items-center justify-between px-4 md:px-8 py-4 text-left"
                  >
                    <span className="font-(family-name:--font-jost) text-[16px] leading-[1.3] font-normal text-[#010101]">
                      {item.label}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`shrink-0 text-[#010101] transition-transform duration-200 ${isSectionOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M19 12L12 19L5 12M12 19V5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isSectionOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 flex flex-col gap-4">
                          {[
                            ...(item.menu!.categories ?? []),
                            ...(item.menu!.secondary ?? []),
                          ].map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={onClose}
                              className="font-(family-name:--font-jost) text-[14px] leading-normal font-normal text-[#010101]"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="px-4 md:px-8 pb-8">
              <p
                className="text-[26px] font-semibold leading-[1.2] text-black mb-6"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                {isLoading
                  ? "Searching…"
                  : isEmpty
                    ? "Nothing found"
                    : "Top matches"}
              </p>

              {isLoading ? (
                <p className="font-(family-name:--font-jost) text-sm font-light text-[#818181]">
                  Searching…
                </p>
              ) : isEmpty ? (
                <p className="font-(family-name:--font-jost) text-[16px] font-light text-[#4E4E4E]">
                  Try another search or explore our collection.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {results.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {hasMoreResults && (
                    <Link
                      href={`/search?q=${encodeURIComponent(trimmed)}`}
                      onClick={onClose}
                      className="mt-8 flex w-full items-center justify-center gap-2.5 border border-gray-300 py-3.5 text-[14px] font-normal leading-normal text-[#010101] transition-colors hover:bg-[#F8F8F8]"
                    >
                      View all products
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
