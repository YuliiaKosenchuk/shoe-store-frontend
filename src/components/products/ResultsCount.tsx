interface ResultsCountProps {
  filteredCount: number;
  totalCount: number;
}

export function ResultsCount({ filteredCount, totalCount }: ResultsCountProps) {
  return (
    <div className="flex items-center justify-end px-8 py-3">
      <span className="text-[14px] leading-normal font-normal text-[#343434]" style={{ fontFamily: "var(--font-jost)" }}>
        Showing {filteredCount} of {totalCount} products
      </span>
    </div>
  );
}
