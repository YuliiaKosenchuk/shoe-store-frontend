"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-6 py-10 font-(family-name:--font-jost) text-sm leading-normal text-center">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`font-normal disabled:cursor-not-allowed ${currentPage === 1 ? "text-[#818181]" : "text-[#010101]"}`}
      >
        Previous
      </button>

      <ul className="flex items-center gap-4">
        {pages.map((p) => {
          const active = p === currentPage;
          return (
            <li key={p} className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={active ? "page" : undefined}
                className={`font-light ${active ? "text-[#010101]" : "text-[#818181]"}`}
              >
                {p}
              </button>
              <span className={`h-px w-[21px] ${active ? "bg-[#000000]" : "bg-transparent"}`} />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`font-normal disabled:cursor-not-allowed ${currentPage === totalPages ? "text-[#818181]" : "text-[#010101]"}`}
      >
        Next
      </button>
    </nav>
  );
}
