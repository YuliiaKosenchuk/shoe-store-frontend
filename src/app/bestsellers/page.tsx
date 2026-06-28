import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Bestsellers | ATELIER",
};

export default function BestsellersPage() {
  return <ProductsPageContent filter="bestsellers" />;
}
