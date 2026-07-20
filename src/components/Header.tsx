"use client";

/* ============================================================
   Site header — logo, desktop nav, and the mobile menu.
   Nav links come from src/data/site.ts (edit them there).
   ============================================================ */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import MobileNav from "./MobileNav";
import Wordmark from "./Wordmark";

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-card">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <Wordmark className="text-xl text-cream" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={
                isActive(pathname, item.href)
                  ? "text-sm font-semibold text-cream underline decoration-accent decoration-2 underline-offset-8"
                  : "text-sm font-medium text-cream/75 transition-colors hover:text-cream"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger + slide-down panel */}
        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
