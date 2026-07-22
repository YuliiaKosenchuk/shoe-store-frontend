"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Product } from "@/shemas/product.shema";
import { Container } from "@/components/ui/Container";
import type { ProductPageFilter } from "@/components/ui/ProductsPageContent";
import { useProductFilters } from "@/hooks/useProductFilters";
import { DEFAULT_SORT } from "./ProductFilters.types";
import { getFilterDefs, SORT_OPTIONS } from "./filterConfig";
import { FilterDropdownButton } from "./FilterDropdownButton";
import { SortByButton } from "./SortByButton";
import { FilterPanel } from "./FilterPanel";
import { FilterPinsRow, type FilterPin } from "./FilterPinsRow";
import { ResultsCount } from "./ResultsCount";
import { MobileFilterBar } from "./MobileFilterBar";
import { MobileFilterModal } from "./MobileFilterModal";
import type { FilterKey, MultiSelectFilterKey } from "./ProductFilters.types";

type OpenKey = FilterKey | "sort" | null;

interface ProductFilterBarProps {
  baseProducts: Product[];
  filteredCount: number;
  isLoading?: boolean;
  category: ProductPageFilter;
}

export function ProductFilterBar({ baseProducts, filteredCount, isLoading, category }: ProductFilterBarProps) {
  const [openKey, setOpenKey] = useState<OpenKey>(null);
  const [isMobileModalOpen, setMobileModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { filters, sort, activeCount, totalActiveCount, toggleValue, setPriceRange, setSort, removeValue, clearAll, applyFilters } =
    useProductFilters();

  const filterDefs = getFilterDefs(category);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOpen(key: OpenKey) {
    setOpenKey((current) => (current === key ? null : key));
  }

  function handleRemoveValue(key: FilterKey, val?: string) {
    removeValue(key, val);
    // PriceRangeControl seeds its drag state once on mount and relies on the
    // panel unmounting to pick up external changes — force that remount when
    // its own pin is what got cleared.
    if (key === "price" && openKey === "price") {
      setOpenKey(null);
    }
  }

  function handleClearAll() {
    clearAll();
    setOpenKey(null);
  }

  const prices = baseProducts.map((p) => p.price);
  const priceBounds = prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : { min: 0, max: 0 };

  const optionsByKey = Object.fromEntries(filterDefs.map((def) => [def.key, def.getOptions(baseProducts)]));

  const activeDef = filterDefs.find((def) => def.key === openKey);

  const sortLabel = sort === DEFAULT_SORT ? "Sort by" : (SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort by");

  const pins: FilterPin[] = [];
  for (const def of filterDefs) {
    if (def.key === "price") continue;
    const values = filters[def.key as MultiSelectFilterKey];
    for (const value of values) {
      const label = optionsByKey[def.key]?.find((o) => o.value === value)?.label ?? value;
      pins.push({ key: def.key, value, label });
    }
  }
  if (filters.priceMin != null || filters.priceMax != null) {
    const min = filters.priceMin ?? priceBounds.min;
    const max = filters.priceMax ?? priceBounds.max;
    pins.push({ key: "price", label: `€${min.toLocaleString()} - €${max.toLocaleString()}` });
  }

  return (
    <div ref={containerRef} className="w-full bg-white">
      <div className="relative">
        <Container>
          <div className="hidden min-[1110px]:flex flex-wrap items-center gap-8 px-8 pt-6 pb-3.25">
            {filterDefs.map((def) => (
              <FilterDropdownButton
                key={def.key}
                label={def.label}
                isOpen={openKey === def.key}
                activeCount={activeCount(def.key)}
                onClick={() => toggleOpen(def.key)}
              />
            ))}
            <SortByButton label={sortLabel} isOpen={openKey === "sort"} onClick={() => toggleOpen("sort")} />
          </div>

          <div className="min-[1110px]:hidden border-t border-b border-[#CDCDCD] px-8 py-3">
            <MobileFilterBar
              activeFilterCount={totalActiveCount}
              onOpenFilters={() => setMobileModalOpen(true)}
              sortLabel={sortLabel}
              isSortOpen={openKey === "sort"}
              onToggleSort={() => toggleOpen("sort")}
            />
          </div>
        </Container>

        <AnimatePresence initial={false}>
          {openKey === "sort" && (
            <FilterPanel
              key="sort"
              control="radio-list"
              options={SORT_OPTIONS}
              selectedSingle={sort}
              onSelectSingle={(v) => setSort(v as typeof sort)}
            />
          )}

          {activeDef && activeDef.control === "price-range" && (
            <FilterPanel
              key={activeDef.key}
              control="price-range"
              priceBounds={priceBounds}
              priceValue={{ min: filters.priceMin, max: filters.priceMax }}
              onPriceChange={setPriceRange}
            />
          )}

          {activeDef && activeDef.control !== "price-range" && (
            <FilterPanel
              key={activeDef.key}
              control={activeDef.control}
              options={optionsByKey[activeDef.key]}
              selectedValues={filters[activeDef.key as MultiSelectFilterKey]}
              onToggleValue={(value) => toggleValue(activeDef.key as MultiSelectFilterKey, value)}
              onClearValues={() => removeValue(activeDef.key)}
            />
          )}
        </AnimatePresence>
      </div>

      <Container>
        {!isLoading && totalActiveCount > 0 && <FilterPinsRow pins={pins} onRemove={handleRemoveValue} onClearAll={handleClearAll} />}

        {!isLoading && <ResultsCount filteredCount={filteredCount} totalCount={baseProducts.length} />}
      </Container>

      <MobileFilterModal
        isOpen={isMobileModalOpen}
        onClose={() => setMobileModalOpen(false)}
        filterDefs={filterDefs}
        optionsByKey={optionsByKey}
        priceBounds={priceBounds}
        appliedFilters={filters}
        onApply={applyFilters}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
