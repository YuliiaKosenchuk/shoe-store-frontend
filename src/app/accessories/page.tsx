import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Accessories | ATELIER",
};

export default function AccessoriesPage() {
  return <ProductsPageContent filter="accessories" />;
}
