import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getFeatures } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/explore", "/about", "/work-with-us", "/shop", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );
  const hotspots = (await getFeatures()).map((feature) => ({
    url: `${site.url}/hotspots/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...hotspots];
}
