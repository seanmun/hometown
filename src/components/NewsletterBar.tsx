/* ============================================================
   NewsletterBar — the green "Stay in the Loop" strip with the
   newsletter signup form. Copy lives in src/data/pages.ts.
   ============================================================ */

import { Mail } from "lucide-react";
import { home } from "@/data/pages";
import SubscribeForm from "./forms/SubscribeForm";

export default function NewsletterBar() {
  return (
    <section
      aria-label="Newsletter signup"
      className="border-b border-cream/15 bg-forest-dark px-4 py-12 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
        <div className="flex items-center gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 sm:flex">
            <Mail className="h-6 w-6 text-cream" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-cream">
              {home.newsletter.title}
            </h2>
            <p className="mt-1 text-sm text-cream/90">{home.newsletter.blurb}</p>
          </div>
        </div>
        <SubscribeForm />
      </div>
    </section>
  );
}
