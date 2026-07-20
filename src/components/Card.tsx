/* ============================================================
   Card — soft-cornered surface with a subtle shadow.
   Pass hover to add the gentle lift on mouse-over.
   ============================================================ */

import type { ReactNode } from "react";

type CardProps = {
  hover?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Card({ hover = false, className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-card bg-surface shadow-card ${
        hover
          ? "transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
