import type { ReactNode } from "react";

interface CheckoutContainerProps {
  children: ReactNode;
  className?: string;
}

// box-content keeps the 1062px width limited to the content box, so
// horizontal padding (e.g. px-4 lg:px-8) is added outside of it instead of
// eating into it — matches the design spec of 1062px excluding padding.
export function CheckoutContainer({ children, className }: CheckoutContainerProps) {
  return (
    <div className={`mx-auto box-content w-full max-w-[1062px] ${className ?? ""}`}>
      {children}
    </div>
  );
}
