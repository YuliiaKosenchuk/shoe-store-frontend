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
