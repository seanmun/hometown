/* ============================================================
   HomeTown HotSpots — Featured Businesses
   src/data/features.ts

   👋 HOW TO ADD A NEW FEATURE (no coding knowledge needed):

   1. Save a thumbnail image (a screenshot of your video works
      great) into:  public/images/features/
      Name it after the business, e.g. daily-press-cafe.jpg
      Landscape orientation, roughly 1200x800px, under 300KB.

   2. Copy one of the blocks between { } below, paste it at the
      TOP of the list, and change every value.

   3. Save the file. Vercel redeploys automatically on push.

   Rules:
   - "slug" must be unique, lowercase, hyphens only (it becomes
     part of the URL in the future Explore page).
   - "category" must be one of the options listed in Category.
   - "date" is when the feature was published: "YYYY-MM-DD".
   - Set  featured: true  on ONE entry to pin it as the
     "Newest Featured HotSpot" on the home page.
   ============================================================ */

export type Platform = "instagram" | "tiktok" | "facebook";

export type Category =
  | "restaurant"
  | "coffee"
  | "market"
  | "boutique"
  | "farm"
  | "brewery"
  | "wellness"
  | "experience"
  | "event"
  | "nature"
  | "date-night"
  | "hidden-gem";

export interface FeatureLink {
  platform: Platform;
  url: string; // full link to the post, e.g. "https://www.instagram.com/p/..."
}

export interface Feature {
  slug: string;           // unique, url-safe: "daily-press-cafe"
  businessName: string;   // "The Daily Press Cafe"
  category: Category;
  location: string;       // "Middletown, CT"
  blurb: string;          // 1–2 friendly sentences
  thumbnail: string;      // "/images/features/daily-press-cafe.jpg"
  links: FeatureLink[];   // at least one; first one is the primary button
  featured?: boolean;     // true on exactly ONE entry (pins to home hero)
  date: string;           // "2026-07-01" — newest first on the site

  /* Map pin (optional). To get these numbers: find the business
     in Google Maps, right-click its marker, then click the
     coordinates at the top of the menu to copy them.
     First number = lat, second = lng. Without coords, the
     business simply doesn't appear on the Explore map. */
  coords?: { lat: number; lng: number };

  /* Filled in via the admin studio (these power the business
     detail page — optional for entries written in this file). */
  writeup?: unknown;   // rich-text story
  gallery?: string[];  // photo carousel image URLs
  videoUrl?: string;   // self-hosted video clip
}

/* ------------------------------------------------------------
   THE LIST — newest at the top.
   The two entries below are EXAMPLES. Replace them with real
   features, keeping the same shape.
   ------------------------------------------------------------ */

export const features: Feature[] = [
  {
    slug: "daily-press-cafe",
    businessName: "The Daily Press Cafe",
    category: "coffee",
    location: "Middletown, CT",
    blurb:
      "A cozy local favorite serving up incredible coffee, fresh pastries, and good vibes.",
    thumbnail: "/images/features/daily-press-cafe.jpg",
    links: [
      { platform: "instagram", url: "https://www.instagram.com/p/EXAMPLE" },
      { platform: "tiktok", url: "https://www.tiktok.com/@hometownhotspots/video/EXAMPLE" },
    ],
    featured: true,
    date: "2026-07-01",
    coords: { lat: 41.5623, lng: -72.651 },
  },
  {
    slug: "example-farm-stand",
    businessName: "Example Farm Stand",
    category: "farm",
    location: "Portland, CT",
    blurb: "Family-run farm stand with the best sweet corn in the valley.",
    thumbnail: "/images/features/example-farm-stand.jpg",
    links: [
      { platform: "facebook", url: "https://www.facebook.com/EXAMPLE" },
    ],
    date: "2026-06-20",
    coords: { lat: 41.573, lng: -72.641 },
  },
];

/* ------------------------------------------------------------
   Helpers used by the site — no need to touch these.
   ------------------------------------------------------------ */

export const sortedFeatures = (): Feature[] =>
  [...features].sort((a, b) => b.date.localeCompare(a.date));

export const pinnedFeature = (): Feature =>
  features.find((f) => f.featured) ?? sortedFeatures()[0];

export const latestFeatures = (count = 3): Feature[] =>
  sortedFeatures()
    .filter((f) => f.slug !== pinnedFeature().slug)
    .slice(0, count);

/* Display labels + lucide icon names per category — powers the
   category badges now and the Explore page in Phase 2. */
export const categoryMeta: Record<Category, { label: string; icon: string }> = {
  restaurant: { label: "Restaurants", icon: "Utensils" },
  coffee: { label: "Coffee", icon: "Coffee" },
  market: { label: "Markets", icon: "ShoppingBasket" },
  boutique: { label: "Boutiques", icon: "Shirt" },
  farm: { label: "Farms", icon: "Sprout" },
  brewery: { label: "Breweries", icon: "Beer" },
  wellness: { label: "Wellness", icon: "Flower2" },
  experience: { label: "Experiences", icon: "Compass" },
  event: { label: "Events", icon: "CalendarDays" },
  nature: { label: "Nature", icon: "TreePine" },
  "date-night": { label: "Date Nights", icon: "Heart" },
  "hidden-gem": { label: "Hidden Gems", icon: "Gem" },
};