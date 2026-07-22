export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full animate-pulse ${className}`}>
      <div className="w-full aspect-302/404 bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
