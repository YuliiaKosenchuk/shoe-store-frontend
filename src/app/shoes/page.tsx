import { Suspense } from "react";
import { ProductsPageContent } from "@/components/ui/ProductsPageContent";

export const metadata = {
  title: "Shoes | ATELIER",
};

export default function ShoesPage() {
  return (
    <Suspense>
      <ProductsPageContent filter="shoes" />
    </Suspense>
  );
}
