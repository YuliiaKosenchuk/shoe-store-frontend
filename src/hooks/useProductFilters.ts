"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterKey, MultiSelectFilterKey, ProductFilterState, SortOption } from "@/components/products/ProductFilters.types";
import { DEFAULT_SORT } from "@/components/products/ProductFilters.types";

const MULTI_SELECT_KEYS: MultiSelectFilterKey[] = ["style", "size", "colour", "material", "season", "discount"];

function parseList(searchParams: URLSearchParams, key: string): string[] {
  const raw = searchParams.get(key);
  if (!raw) return [];
  return raw.split(",").filter(Boolean);
}

function parseFilters(searchParams: URLSearchParams): ProductFilterState {
  const priceRaw = searchParams.get("price");
  let priceMin: number | null = null;
  let priceMax: number | null = null;
  if (priceRaw) {
    const [min, max] = priceRaw.split("-").map(Number);
    if (!Number.isNaN(min)) priceMin = min;
    if (!Number.isNaN(max)) priceMax = max;
  }

  return {
    style: parseList(searchParams, "style"),
    size: parseList(searchParams, "size"),
    colour: parseList(searchParams, "colour"),
    material: parseList(searchParams, "material"),
    season: parseList(searchParams, "season"),
    discount: parseList(searchParams, "discount"),
    priceMin,
    priceMax,
  };
}

function parseSort(searchParams: URLSearchParams): SortOption {
  const raw = searchParams.get("sort");
  const valid: SortOption[] = ["most-popular", "price-desc", "price-asc", "newest", "featured"];
  return valid.includes(raw as SortOption) ? (raw as SortOption) : DEFAULT_SORT;
}

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = parseFilters(searchParams);
  const sort = parseSort(searchParams);

  function commit(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleValue(key: MultiSelectFilterKey, value: string) {
    commit((params) => {
      const current = parseList(params, key);
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length > 0) {
        params.set(key, next.join(","));
      } else {
        params.delete(key);
      }
    });
  }

  function setPriceRange(min: number | null, max: number | null) {
    commit((params) => {
      if (min == null && max == null) {
        params.delete("price");
      } else {
        params.set("price", `${min ?? ""}-${max ?? ""}`);
      }
    });
  }

  function setSort(next: SortOption) {
    commit((params) => {
      if (next === DEFAULT_SORT) {
        params.delete("sort");
      } else {
        params.set("sort", next);
      }
    });
  }

  function removeValue(key: FilterKey, value?: string) {
    commit((params) => {
      if (key === "price") {
        params.delete("price");
        return;
      }
      if (value == null) {
        params.delete(key);
        return;
      }
      const current = parseList(params, key);
      const next = current.filter((v) => v !== value);
      if (next.length > 0) {
        params.set(key, next.join(","));
      } else {
        params.delete(key);
      }
    });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  function activeCount(key: FilterKey): number {
    if (key === "price") {
      return filters.priceMin != null || filters.priceMax != null ? 1 : 0;
    }
    return filters[key].length;
  }

  const totalActiveCount =
    MULTI_SELECT_KEYS.reduce((sum, key) => sum + filters[key].length, 0) + (filters.priceMin != null || filters.priceMax != null ? 1 : 0);

  return {
    filters,
    sort,
    activeCount,
    totalActiveCount,
    toggleValue,
    setPriceRange,
    setSort,
    removeValue,
    clearAll,
  };
}
