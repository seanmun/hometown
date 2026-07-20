/* ============================================================
   Content layer — the one place pages get their content from.

   When Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID is
   set), features, products, and testimonials come from the
   admin studio. Until then, everything falls back to the
   files in src/data/ — so the site works either way and the
   founders' file-editing workflow keeps functioning until the
   CMS is switched on.
   ============================================================ */

import { createClient } from "next-sanity";
import { features as localFeatures, type Feature } from "@/data/features";
import { products as localProducts, type Product } from "@/data/products";
import {
  testimonials as localTestimonials,
  type Testimonial,
} from "@/data/testimonials";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const cmsConfigured = Boolean(projectId);

const client = cmsConfigured
  ? createClient({ projectId, dataset, apiVersion: "2025-06-01", useCdn: true })
  : null;

/* ---- Features ---- */

const FEATURES_QUERY = `*[_type == "feature" && defined(slug.current)] | order(date desc) {
  businessName,
  "slug": slug.current,
  category,
  location,
  blurb,
  "thumbnail": thumbnail.asset->url,
  "links": links[]{ platform, url },
  featured,
  date,
  coords,
  writeup,
  "gallery": gallery[].asset->url,
  "videoUrl": video.asset->url
}`;

type FeatureRow = Omit<Feature, "coords" | "gallery" | "videoUrl"> & {
  coords?: { lat: number; lng: number } | null;
  gallery?: (string | null)[] | null;
  videoUrl?: string | null;
};

export async function getFeatures(): Promise<Feature[]> {
  if (!client) {
    return [...localFeatures].sort((a, b) => b.date.localeCompare(a.date));
  }
  const rows = await client.fetch<FeatureRow[]>(FEATURES_QUERY);
  return rows.map((row) => ({
    ...row,
    coords: row.coords ?? undefined,
    gallery: row.gallery?.filter((url): url is string => Boolean(url)),
    videoUrl: row.videoUrl ?? undefined,
  }));
}

export async function getFeatureBySlug(
  slug: string
): Promise<Feature | undefined> {
  return (await getFeatures()).find((feature) => feature.slug === slug);
}

/* Pure helpers over an already-sorted (newest first) list. */
export function pinnedOf(features: Feature[]): Feature | undefined {
  return features.find((feature) => feature.featured) ?? features[0];
}

export function latestOf(features: Feature[], count = 3): Feature[] {
  const pinned = pinnedOf(features);
  return features
    .filter((feature) => feature.slug !== pinned?.slug)
    .slice(0, count);
}

/* ---- Products ---- */

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
  name,
  "slug": slug.current,
  price,
  description,
  "image": image.asset->url,
  "buyUrl": coalesce(buyUrl, ""),
  soldOut
}`;

export async function getProducts(): Promise<Product[]> {
  if (!client) return localProducts;
  return client.fetch<Product[]>(PRODUCTS_QUERY);
}

/* ---- Testimonials ---- */

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  quote, name, business
}`;

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!client) return localTestimonials;
  return client.fetch<Testimonial[]>(TESTIMONIALS_QUERY);
}
