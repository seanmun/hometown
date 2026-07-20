"use client";

/* ============================================================
   /admin — the Sanity Studio where Mikayla & Curtis manage
   features, shop products, and testimonials. Shows a setup
   note until NEXT_PUBLIC_SANITY_PROJECT_ID is configured.
   ============================================================ */

import { NextStudio } from "next-sanity/studio";
import config, { projectId } from "../../../../sanity.config";

export default function StudioPage() {
  if (!projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-card bg-surface p-8 text-center shadow-card">
          <h1 className="text-display-md">Admin not set up yet</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The content studio needs a Sanity project. Create one at
            sanity.io, then add NEXT_PUBLIC_SANITY_PROJECT_ID and
            NEXT_PUBLIC_SANITY_DATASET to the environment variables
            (see .env.example) and redeploy.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
