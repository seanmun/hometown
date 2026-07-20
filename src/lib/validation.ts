/* ============================================================
   HomeTown HotSpots — Form Validation
   src/lib/validation.ts

   Shared between the client forms and the API routes so the
   rules can never drift apart. Written for zod v4 — if the
   project installs zod v3, swap z.email() → z.string().email().

   Every schema includes "website_url" as a HONEYPOT: a hidden
   field humans never see. Bots fill it in; if it has a value,
   the API silently accepts and discards the submission.
   ============================================================ */

import { z } from "zod";

/* Accepts any value on purpose: the API routes check this field and
   quietly discard filled-in submissions (bots see a fake success).
   Rejecting it here would tell bots their trick failed. */
const honeypot = z.string().optional();

/* ---- Contact page form ---- */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.email("Please enter a valid email"),
  message: z.string().trim().min(1, "Please enter a message").max(5000),
  website_url: honeypot, // honeypot
});
export type ContactInput = z.infer<typeof contactSchema>;

/* ---- Work With Us inquiry form (matches the sitemap) ---- */
export const collaborationTypes = [
  "Featured Video",
  "Social Media Content",
  "Giveaway / Promotion",
  "Not sure yet — let's talk",
] as const;

export const contactPreferences = ["Email", "Phone", "Instagram"] as const;

export const inquirySchema = z.object({
  businessName: z.string().trim().min(1, "Please enter your business name").max(150),
  ownerName: z.string().trim().min(1, "Please enter a contact name").max(100),
  email: z.email("Please enter a valid email"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  instagram: z.string().trim().max(100).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  category: z.string().trim().min(1, "Please choose a category"),
  about: z
    .string()
    .trim()
    .min(1, "Tell us a little about your business")
    .max(3000),
  goals: z.string().trim().min(1, "Let us know what you're hoping to accomplish").max(3000),
  collaboration: z.enum(collaborationTypes, "Please choose a collaboration type"),
  referral: z.string().trim().max(300).optional().or(z.literal("")),
  contactPreference: z.enum(contactPreferences, "How should we reach you?"),
  website_url: honeypot, // honeypot
});
export type InquiryInput = z.infer<typeof inquirySchema>;

/* ---- Newsletter signup ---- */
export const subscribeSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.email("Please enter a valid email"),
  website_url: honeypot, // honeypot
});
export type SubscribeInput = z.infer<typeof subscribeSchema>;