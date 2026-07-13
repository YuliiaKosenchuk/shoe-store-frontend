import type { CartItemDto } from "@/shemas/cart.shema";
import type { Product, ProductVariantDto } from "@/shemas/product.shema";

// Cart line items don't carry a productVariantId (see cart.shema.ts), so the
// only way to find per-size stock is to re-resolve the product by name and
// read its variants — same (color, size) matching already used on the
// product page to line up cart items with variants.
export function findVariantForCartItem(
  item: CartItemDto,
  products: Product[],
  variantsByProductId: Map<number, ProductVariantDto[]>
): ProductVariantDto | undefined {
  const product = products.find((p) => p.name === item.name);
  if (!product) return undefined;
  const variants = variantsByProductId.get(product.id) ?? [];
  return variants.find((v) => v.color === item.color && String(v.size) === String(item.size));
}

// Mirrors the hard gate in useCartStockCheck (`!variant || variant.stockQty <
// item.quantity`) so the inline badge agrees with what actually blocks
// checkout — a cart holding more units than are left in stock is exactly as
// "unavailable" as a fully zero-stock item. Only true once the stock query
// has actually resolved — while it's still loading, `stockQty` is
// indistinguishable from "no variant found", and we don't want the badge to
// flash on for every cold page load.
export function isCartItemOutOfStock(
  stockQty: number | undefined,
  quantity: number,
  isLoading: boolean
): boolean {
  return !isLoading && (stockQty === undefined || stockQty < quantity);
}
