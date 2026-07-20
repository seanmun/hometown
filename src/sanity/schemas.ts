/* ============================================================
   Sanity schemas — the content types Mikayla & Curtis edit in
   the admin studio: Features (HotSpots), Products, and
   Testimonials. Field lists mirror the site's data shapes.
   ============================================================ */

import { defineField, defineType } from "sanity";
import { categoryMeta } from "@/data/features";

const categoryOptions = Object.entries(categoryMeta).map(([value, meta]) => ({
  title: meta.label,
  value,
}));

const platformOptions = [
  { title: "Instagram", value: "instagram" },
  { title: "TikTok", value: "tiktok" },
  { title: "Facebook", value: "facebook" },
];

export const featureType = defineType({
  name: "feature",
  title: "HotSpot Feature",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      description: "Click Generate — becomes the page URL, e.g. /hotspots/daily-press-cafe",
      type: "slug",
      options: { source: "businessName" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: 'e.g. "Middletown, CT"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Short Blurb",
      description: "1–2 friendly sentences shown on cards.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Photo",
      description: "Landscape works best — a video screenshot is great.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Social Post Links",
      description: "The first one becomes the big Watch button.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: platformOptions },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Pin as Newest Featured HotSpot",
      description: "Turn on for ONE feature — it becomes the big card on the home page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "date",
      title: "Publish Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coords",
      title: "Map Location",
      description: "Sets the pin on the Explore map.",
      type: "geopoint",
    }),
    defineField({
      name: "writeup",
      title: "The Write-Up",
      description: "Your full story about this business — shown on its page.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      title: "Photo Carousel",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "video",
      title: "Video Clip (optional)",
      description: "A short mp4 to play right on the page.",
      type: "file",
      options: { accept: "video/*" },
    }),
  ],
  preview: {
    select: { title: "businessName", subtitle: "location", media: "thumbnail" },
  },
});

export const productType = defineType({
  name: "product",
  title: "Shop Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (as shown)",
      description: 'Written exactly as displayed, e.g. "$24"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Photo",
      description: "Square photos look best.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buyUrl",
      title: "Buy Link",
      description:
        "Stripe Payment Link, Printful page, or Etsy listing. Leave empty to show Coming Soon.",
      type: "url",
    }),
    defineField({
      name: "soldOut",
      title: "Sold Out",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "name", subtitle: "price", media: "image" } },
});

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Person",
      description: 'e.g. "Jess R."',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "business",
      title: "Business",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "business" } },
});

export const schemaTypes = [featureType, productType, testimonialType];
