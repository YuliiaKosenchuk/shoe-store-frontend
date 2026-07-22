import { Container } from "@/components/ui/Container";

export function ProductPageSkeleton() {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-[628fr_517fr] gap-0 lg:gap-[clamp(40px,11vw,133px)] px-4 lg:px-8 py-6 lg:py-10 animate-pulse">
      {/* Image gallery skeleton */}
      <div>
        <div className="-mx-4 lg:hidden">
          <div className="relative mx-auto aspect-390/522 w-full max-w-97.5 bg-gray-200" />
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-6">
          <div className="aspect-3/4 bg-gray-200" />
          <div className="aspect-3/4 bg-gray-200" />
        </div>
      </div>

      {/* Product info panel skeleton */}
      <div className="min-w-0 space-y-6 pt-6 lg:pt-0">
        {/* Name & price */}
        <div>
          <div className="h-9 w-3/4 max-w-75 bg-gray-200 rounded" />
          <div className="mt-6 h-6 w-28 bg-gray-200 rounded" />
        </div>

        {/* Color selector */}
        <div className="space-y-3">
          <div className="mb-4 h-4 w-28 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-18.75 w-18.75 shrink-0 bg-gray-200" />
            <div className="h-18.75 w-18.75 shrink-0 bg-gray-200" />
            <div className="h-18.75 w-18.75 shrink-0 bg-gray-200" />
          </div>
        </div>

        {/* Size selector */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
          <div className="flex flex-wrap gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-5 w-4 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Add to bag + wishlist */}
        <div className="flex gap-px">
          <div className="h-13 flex-1 bg-gray-200" />
          <div className="h-13 w-13 shrink-0 bg-gray-200" />
        </div>

        {/* Stock / shipping info */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>

        {/* Accordion */}
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-[#EBEBEB] py-4">
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="h-5 w-5 shrink-0 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
