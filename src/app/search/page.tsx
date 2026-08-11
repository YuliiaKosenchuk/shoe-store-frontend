import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Search results | ATELIER",
};

export default function SearchResultsPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="search" />
    </Suspense>
  );
}
