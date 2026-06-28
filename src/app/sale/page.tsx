import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

// import { MOCK_PRODUCTS } from "@/servises/products.mock";

export const metadata = {
  title: "Sale | ATELIER",
};

export default function SalePage() {
  return <ProductsPageContent filter="sale" />;
}
