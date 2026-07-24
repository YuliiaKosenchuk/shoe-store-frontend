"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  FilterDef,
  FilterOption,
  FilterKey,
  MultiSelectFilterKey,
  ProductFilterState,
} from "./ProductFilters.types";
import { DEFAULT_FILTER_STATE } from "./ProductFilters.types";
import { MobileFilterAccordionSection } from "./MobileFilterAccordionSection";
import { CheckboxOptionList } from "./CheckboxOptionList";
import { PriceRangeControl } from "./PriceRangeControl";

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterDefs: FilterDef[];
  optionsByKey: Record<string, FilterOption[]>;
  priceBounds: { min: number; max: number };
  appliedFilters: ProductFilterState;
  onApply: (next: ProductFilterState) => void;
  onClearAll: () => void;
}

function sameFilters(a: ProductFilterState, b: ProductFilterState): boolean {
  const sortedEqual = (x: string[], y: string[]) =>
    x.length === y.length &&
    [...x].sort().every((v, i) => v === [...y].sort()[i]);

  return (
    sortedEqual(a.style, b.style) &&
    sortedEqual(a.size, b.size) &&
    sortedEqual(a.colour, b.colour) &&
    sortedEqual(a.material, b.material) &&
    sortedEqual(a.season, b.season) &&
    sortedEqual(a.discount, b.discount) &&
    a.priceMin === b.priceMin &&
    a.priceMax === b.priceMax
  );
}

export function MobileFilterModal({
  isOpen,
  onClose,
  filterDefs,
  optionsByKey,
  priceBounds,
  appliedFilters,
  onApply,
  onClearAll,
}: MobileFilterModalProps) {
  const [draft, setDraft] = useState<ProductFilterState>(appliedFilters);
  const [openSections, setOpenSections] = useState<Set<FilterKey>>(new Set());
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Re-seed the draft (and collapse every section) each time the modal
  // transitions to open, so it always reflects whatever is currently applied
  // rather than stale edits from a previous open/close cycle. Done during
  // render (not an effect) to avoid the extra cascading render.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setDraft(appliedFilters);
      setOpenSections(new Set());
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function toggleSection(key: FilterKey) {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function toggleDraftValue(key: MultiSelectFilterKey, value: string) {
    setDraft((current) => {
      const values = current[key];
      const next = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return { ...current, [key]: next };
    });
  }

  function setDraftPriceRange(min: number | null, max: number | null) {
    setDraft((current) => ({ ...current, priceMin: min, priceMax: max }));
  }

  function draftCount(key: FilterKey): number {
    if (key === "price")
      return draft.priceMin != null || draft.priceMax != null ? 1 : 0;
    return draft[key].length;
  }

  function handleApply() {
    onApply(draft);
    onClose();
  }

  function handleClearAll() {
    setDraft(DEFAULT_FILTER_STATE);
    onClearAll();
    onClose();
  }

  const hasChanges = !sameFilters(draft, appliedFilters);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 min-[1110px]:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white transition-transform duration-300 ease-out min-[1110px]:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Filters"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-4 py-6 md:px-8">
          <h2
            className="text-[28px] leading-[1.1] font-semibold text-black"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-black"
          >
            <X size={24} strokeWidth={1.25} />
          </button>
        </div>
        <div className="mx-4 h-px bg-[#B3B3B3] md:mx-8" />

        <div className="flex-1 overflow-y-auto px-4 md:px-8">
          {filterDefs.map((def) => (
            <MobileFilterAccordionSection
              key={def.key}
              label={def.label}
              count={draftCount(def.key)}
              isOpen={openSections.has(def.key)}
              onToggle={() => toggleSection(def.key)}
            >
              {def.control === "price-range" ? (
                <PriceRangeControl
                  bounds={priceBounds}
                  value={{ min: draft.priceMin, max: draft.priceMax }}
                  onChange={setDraftPriceRange}
                />
              ) : (
                <CheckboxOptionList
                  layout="single"
                  options={optionsByKey[def.key] ?? []}
                  selected={draft[def.key as MultiSelectFilterKey]}
                  onToggle={(value) =>
                    toggleDraftValue(def.key as MultiSelectFilterKey, value)
                  }
                />
              )}
            </MobileFilterAccordionSection>
          ))}
        </div>

        <div className="flex gap-4 px-4 md:px-8 py-6">
          <button
            type="button"
            onClick={handleApply}
            disabled={!hasChanges}
            className="flex-1 bg-[#010101] py-3.75 text-center text-sm font-medium uppercase leading-[1.3] text-white  hover:bg-[#2C2C2C] transition-opacity disabled:bg-[#DADADA] disabled:text-[#818181] disabled:cursor-not-allowed"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-1 bg-white border border-[#010101] py-3.75 text-center text-sm font-medium leading-[1.3] text-[#010101] transition-colors hover:bg-[#F8F8F8]"
          >
            Clear all
          </button>
        </div>
      </aside>
    </>
  );
}
