"use client";

/* ============================================================
   Mobile navigation — hamburger button plus a simple
   slide-down panel under the header. No libraries.
   ============================================================ */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/site";
import { isActive } from "./Header";

export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  // Close when the route changes or Escape is pressed.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-button text-cream transition-colors hover:bg-cream/10"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        id="mobile-nav"
        className={`absolute inset-x-0 top-full overflow-hidden transition-[max-height,visibility] duration-300 ${
          open ? "visible max-h-96" : "invisible max-h-0"
        }`}
      >
        <nav
          aria-label="Main menu"
          className="flex flex-col border-t border-cream/15 bg-primary px-4 py-3 shadow-card"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={
                isActive(pathname, item.href)
                  ? "rounded-button px-3 py-3 text-base font-semibold text-cream"
                  : "rounded-button px-3 py-3 text-base font-medium text-cream/75 transition-colors hover:bg-cream/10 hover:text-cream"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
