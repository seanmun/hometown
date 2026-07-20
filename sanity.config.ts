/* ============================================================
   Sanity Studio configuration — the admin editing UI mounted
   at /admin (and admin.<domain> via src/middleware.ts).
   Content types live in src/sanity/schemas.ts.
   ============================================================ */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  // "placeholder" keeps the config valid before the real
  // project ID is set in the environment.
  projectId: projectId || "placeholder",
  dataset,
  title: "HomeTown HotSpots",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
