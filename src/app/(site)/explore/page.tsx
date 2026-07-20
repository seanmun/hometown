/* ============================================================
   Explore — every featured business, filterable by category.
   Features come from src/data/features.ts; page copy from
   src/data/pages.ts.
   ============================================================ */

import type { Metadata } from "next";
import { Suspense } from "react";
import { explore } from "@/data/pages";
import { getFeatures } from "@/lib/content";
import ExploreGrid from "@/components/ExploreGrid";
import HotSpotMap from "@/components/HotSpotMap";

export const metadata: Metadata = {
  title: explore.title,
  description: explore.description,
};

export const revalidate = 60;

export default async function ExplorePage() {
  const features = await getFeatures();
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-display-lg">{explore.heading}</h1>
          <p className="mt-4 text-body-lg text-ink-soft">{explore.sub}</p>
        </div>
        <div className="mt-10">
          <HotSpotMap features={features} />
          <p className="mt-3 text-center text-xs text-ink-soft">
            {explore.mapHint}
          </p>
        </div>

        <div className="mt-12">
          <Suspense>
            <ExploreGrid features={features} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
