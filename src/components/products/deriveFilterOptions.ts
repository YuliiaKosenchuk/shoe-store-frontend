import type { Product } from "@/shemas/product.shema";
import { SEASONS } from "@/shemas/admin-product.shema";
import type { FilterOption } from "./ProductFilters.types";

export function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/[\s_]+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function deriveColourOptions(baseProducts: Product[]): FilterOption[] {
  const colours = new Set<string>();
  for (const product of baseProducts) {
    for (const c of product.colors) {
      colours.add(c);
    }
  }
  return [...colours].sort().map((value) => ({ value, label: titleCase(value) }));
}

export function deriveMaterialOptions(baseProducts: Product[]): FilterOption[] {
  const materials = new Set<string>();
  for (const product of baseProducts) {
    materials.add(product.material);
  }
  return [...materials].sort().map((value) => ({ value, label: titleCase(value) }));
}

export function deriveSeasonOptions(baseProducts: Product[]): FilterOption[] {
  // Backend returns season as Title Case (e.g. "Spring"), not matching the
  // uppercase SEASONS enum used elsewhere — compare case-insensitively but
  // keep the original casing from the data as the filter value, so it still
  // matches product.season exactly in applyProductFilters.
  const bySeason = new Map<string, string>();
  for (const product of baseProducts) {
    bySeason.set(product.season.toUpperCase(), product.season);
  }
  return SEASONS.filter((season) => bySeason.has(season)).map((season) => ({
    value: bySeason.get(season)!,
    label: titleCase(season.replace("_", " ")),
  }));
}
