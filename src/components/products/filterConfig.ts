import type { ProductPageFilter } from "@/components/ui/ProductsPageContent";
import type { FilterDef, FilterOption, SortOption } from "./ProductFilters.types";
import { deriveColourOptions, deriveMaterialOptions, deriveSeasonOptions } from "./deriveFilterOptions";

// Hardcoded: Product has no "style" field from the backend yet, so these options
// can't be derived from data. Selecting any of them intentionally matches zero
// products until backend support lands (see applyProductFilters.ts).
export const STYLE_OPTIONS: FilterOption[] = [
  { value: "SANDALS", label: "Sandals" },
  { value: "HEELS", label: "Heels" },
  { value: "LOAFERS", label: "Loafers" },
  { value: "MULES", label: "Mules" },
  { value: "SNEAKERS", label: "Sneakers" },
  { value: "BOOTS", label: "Boots" },
  { value: "FLATS", label: "Flats" },
];

// Same rationale as STYLE_OPTIONS above, but for the bags category.
export const BAG_STYLE_OPTIONS: FilterOption[] = [
  { value: "TOP_HANDLES", label: "Top handles" },
  { value: "TOTES", label: "Totes" },
  { value: "BACKPACKS", label: "Backpacks" },
  { value: "BUCKETS", label: "Buckets" },
];

// Same rationale as STYLE_OPTIONS above, but for the accessories category.
export const ACCESSORY_STYLE_OPTIONS: FilterOption[] = [
  { value: "JEWELRY", label: "Jewelry" },
  { value: "BELTS", label: "Belts" },
  { value: "SUNGLASSES", label: "Sunglasses" },
  { value: "WRAPS", label: "Wraps" },
];

// Fixed EU size range 35–42, per store requirements — not derived from product data.
export const SIZE_OPTIONS: FilterOption[] = Array.from({ length: 42 - 35 + 1 }, (_, i) => {
  const size = String(35 + i);
  return { value: size, label: size };
});

export const DISCOUNT_TIERS: { value: string; label: string; minPercent: number }[] = [
  { value: "5", label: "5% off or more", minPercent: 5 },
  { value: "10", label: "10% off or more", minPercent: 10 },
  { value: "15", label: "15% off or more", minPercent: 15 },
  { value: "20", label: "20% off or more", minPercent: 20 },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "most-popular", label: "Most popular" },
  { value: "price-desc", label: "Price (High to low)" },
  { value: "price-asc", label: "Price (Low to high)" },
  { value: "newest", label: "Newest" },
  { value: "featured", label: "Featured" },
];

// Bags and accessories have no sizes to filter by — the size range below is shoe-specific.
const CATEGORIES_WITHOUT_SIZE: ProductPageFilter[] = ["bags", "accessories"];

const STYLE_OPTIONS_BY_CATEGORY: Partial<Record<ProductPageFilter, FilterOption[]>> = {
  bags: BAG_STYLE_OPTIONS,
  accessories: ACCESSORY_STYLE_OPTIONS,
};

export function getFilterDefs(category: ProductPageFilter): FilterDef[] {
  const hasSize = !CATEGORIES_WITHOUT_SIZE.includes(category);
  const styleOptions = STYLE_OPTIONS_BY_CATEGORY[category] ?? STYLE_OPTIONS;

  return [
    { key: "style", label: "Style", control: "checkbox-list-2col", getOptions: () => styleOptions },
    ...(hasSize
      ? [{ key: "size" as const, label: "Size", control: "checkbox-list-2col" as const, getOptions: () => SIZE_OPTIONS }]
      : []),
    { key: "colour", label: "Colour", control: "checkbox-list-2col", getOptions: deriveColourOptions },
    // Price has no discrete option list — PriceRangeControl derives min/max bounds
    // directly from baseProducts, so getOptions is unused for this entry.
    { key: "price", label: "Price", control: "price-range", getOptions: () => [] },
    { key: "material", label: "Material", control: "checkbox-list", getOptions: deriveMaterialOptions },
    { key: "season", label: "Season", control: "checkbox-list", getOptions: deriveSeasonOptions },
    {
      key: "discount",
      label: "Discount",
      control: "checkbox-list",
      getOptions: () => DISCOUNT_TIERS.map(({ value, label }) => ({ value, label })),
    },
  ];
}
