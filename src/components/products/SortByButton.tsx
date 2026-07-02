"use client";

interface SortByButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

export function SortByButton({ label, isOpen, onClick }: SortByButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto flex items-center gap-2 text-[16px] font-normal leading-[1.3] text-[#010101]"
    >
      {label}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20M4 12H14M4 18H8"
          stroke="#010101"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
