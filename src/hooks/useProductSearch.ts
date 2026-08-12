import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/servises/products.service";
import { useSearchStore } from "@/store/search.store";

interface UseProductSearchOptions {
  isOpen: boolean;
  maxResults: number;
}

export function useProductSearch({ isOpen, maxResults }: UseProductSearchOptions) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const addQuery = useSearchStore((state) => state.addQuery);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getProducts(),
    enabled: isOpen,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setDebouncedQuery("");
    }
  }

  const trimmed = debouncedQuery.trim();
  const allResults =
    trimmed.length === 0 || !products
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(trimmed.toLowerCase()),
        );
  const results = allResults.slice(0, maxResults);

  const isEmpty = !isLoading && trimmed.length > 0 && results.length === 0;
  const hasMoreResults = allResults.length > maxResults;

  const submitSearch = () => addQuery(query);

  return {
    query,
    setQuery,
    trimmed,
    isLoading,
    results,
    isEmpty,
    hasMoreResults,
    submitSearch,
  };
}
