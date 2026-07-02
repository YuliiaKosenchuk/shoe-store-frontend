import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Accessories | ATELIER",
};

export default function AccessoriesPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="accessories" />
    </Suspense>
  );
}
