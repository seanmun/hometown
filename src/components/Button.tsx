/* ============================================================
   Button — the one button style used across the site.
   variant: "primary" (solid green), "secondary" (outlined),
   "light" (cream — for use on green backgrounds).
   Pass href to render a link, omit it for a real button.
   ============================================================ */

import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-primary text-cream hover:bg-primary-hover",
  secondary:
    "border-2 border-primary text-primary hover:bg-primary hover:text-cream",
  light: "bg-cream text-forest-dark hover:bg-surface",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  href,
  type = "button",
  disabled,
  className = "",
  children,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
