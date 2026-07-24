import type { ReactNode } from "react";

interface CheckoutContainerProps {
  children: ReactNode;
  className?: string;
}

// Callers pass px-4 sm:px-6 md:px-8 (16/24/32px) as className. max-w bakes
// that same padding into each breakpoint via calc() so the 1062px content
// width is preserved without box-content — which combined with w-full made
// the box's total footprint (100% + padding) overflow its parent below
// ~1126px, causing a horizontal scrollbar on every checkout/cart page.
export function CheckoutContainer({ children, className }: CheckoutContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-273.5 sm:max-w-277.5 md:max-w-281.5 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
