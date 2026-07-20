/* ============================================================
   Wordmark — the site name rendered as "HomeTown" in the
   serif display font and "HotSpots" in the script font.
   Splits site.name automatically, so a name change in
   site.ts flows through. Size it from the parent (text-xl
   etc.); the script half scales itself to match.
   ============================================================ */

import { site } from "@/data/site";

export default function Wordmark({ className = "" }: { className?: string }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="font-display font-semibold tracking-tight">{first}</span>
      <span className="font-script text-[1.3em] leading-none font-medium">
        {rest.join(" ")}
      </span>
    </span>
  );
}
