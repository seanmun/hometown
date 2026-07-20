"use client";

/* ============================================================
   Reveal — wraps a section so it gently fades in as it
   scrolls into view. Purely decorative; content is always
   in the HTML for search engines.
   ============================================================ */

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
