import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Bestsellers | ATELIER",
};

export default function BestsellersPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="bestsellers" />
    </Suspense>
  );
}
