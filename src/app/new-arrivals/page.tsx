import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "New Arrivals | ATELIER",
};

export default function NewArrivalsPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="new-arrivals" />
    </Suspense>
  );
}
