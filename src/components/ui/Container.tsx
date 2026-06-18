import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`max-w-336 mx-auto w-full ${className ?? ""}`}>
      {children}
    </div>
  );
}
