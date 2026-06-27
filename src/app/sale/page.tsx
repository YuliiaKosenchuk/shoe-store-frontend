import { ProductsGrid } from "@/components/ui/ProductsGrid";
import { MOCK_PRODUCTS } from "@/servises/products.mock";

export const metadata = {
  title: "Sale | ATELIER",
};

const SALE_PRODUCTS = MOCK_PRODUCTS.filter(
  (p) => p.priceOld > 0 && p.priceOld > p.price
);

export default function SalePage() {
  return <ProductsGrid products={SALE_PRODUCTS} />;
}
