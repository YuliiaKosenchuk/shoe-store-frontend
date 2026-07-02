import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Bags | ATELIER",
};

export default function BagsPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="bags" />
    </Suspense>
  );
}
