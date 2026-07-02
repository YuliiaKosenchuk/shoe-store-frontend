export type MultiSelectFilterKey = "style" | "size" | "colour" | "material" | "season" | "discount";

export type FilterKey = MultiSelectFilterKey | "price";

export type PanelKey = FilterKey | "sort";

export type FilterControlType = "checkbox-list" | "checkbox-list-2col" | "price-range";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDef {
  key: FilterKey;
  label: string;
  control: FilterControlType;
  getOptions: (baseProducts: import("@/shemas/product.shema").Product[]) => FilterOption[];
}

export type SortOption = "most-popular" | "price-desc" | "price-asc" | "newest" | "featured";

export interface ProductFilterState {
  style: string[];
  size: string[];
  colour: string[];
  material: string[];
  season: string[];
  discount: string[];
  priceMin: number | null;
  priceMax: number | null;
}

export const DEFAULT_FILTER_STATE: ProductFilterState = {
  style: [],
  size: [],
  colour: [],
  material: [],
  season: [],
  discount: [],
  priceMin: null,
  priceMax: null,
};

export const DEFAULT_SORT: SortOption = "most-popular";
