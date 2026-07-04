import type { Product, ProductVariantDto } from "@/shemas/product.shema";
import type { ProductFilterState, SortOption } from "./ProductFilters.types";
import { DISCOUNT_TIERS } from "./filterConfig";

function discountPercent(product: Product): number {
  if (product.priceOld <= product.price) return 0;
  return Math.round((1 - product.price / product.priceOld) * 100);
}

function matchesFilters(product: Product, filters: ProductFilterState, variantsByProductId: Map<number, ProductVariantDto[]>): boolean {
  // Product has no "style" field from the backend yet; any style selection
  // intentionally yields zero matches until backend support lands.
  if (filters.style.length > 0) return false;

  if (filters.size.length > 0) {
    // The list endpoint doesn't return sizes/stock — only variants (fetched
    // separately, see useProductVariantsMap) carry that data.
    const productSizes = (variantsByProductId.get(product.id) ?? []).map((v) => String(v.size));
    if (!filters.size.some((s) => productSizes.includes(s))) return false;
  }

  if (filters.colour.length > 0 && !filters.colour.some((c) => product.colors.includes(c))) {
    return false;
  }

  if (filters.material.length > 0 && !filters.material.includes(product.material)) {
    return false;
  }

  if (filters.season.length > 0 && !filters.season.includes(product.season)) {
    return false;
  }

  if (filters.discount.length > 0) {
    const pct = discountPercent(product);
    const matchesTier = filters.discount.some((tier) => pct >= (DISCOUNT_TIERS.find((t) => t.value === tier)?.minPercent ?? Infinity));
    if (!matchesTier) return false;
  }

  if (filters.priceMin != null && product.price < filters.priceMin) return false;
  if (filters.priceMax != null && product.price > filters.priceMax) return false;

  return true;
}

function hasSizeInStock(product: Product, filters: ProductFilterState, variantsByProductId: Map<number, ProductVariantDto[]>): boolean {
  if (filters.size.length === 0) return true;
  const variants = variantsByProductId.get(product.id) ?? [];
  return filters.size.some((s) => variants.some((v) => String(v.size) === s && v.stockQty > 0));
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = products.slice();
  switch (sort) {
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "newest":
    case "featured":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "most-popular":
      // No popularity signal from the backend yet; keep fetched order
      // until that data exists.
      return sorted;
  }
}

export function applyProductFilters(
  products: Product[],
  filters: ProductFilterState,
  sort: SortOption,
  variantsByProductId: Map<number, ProductVariantDto[]> = new Map(),
): Product[] {
  const filtered = products.filter((product) => matchesFilters(product, filters, variantsByProductId));
  const sorted = sortProducts(filtered, sort);

  if (filters.size.length === 0) return sorted;

  // Stable sort: products with the selected size actually in stock float to
  // the top, while preserving the chosen sort order within each group.
  return sorted
    .slice()
    .sort((a, b) => Number(!hasSizeInStock(a, filters, variantsByProductId)) - Number(!hasSizeInStock(b, filters, variantsByProductId)));
}
