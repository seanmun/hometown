# HomeTown HotSpots — Website Guide

Hi Mikayla & Curtis! 👋 This is your website. This guide covers everything
you'll do day-to-day — no coding knowledge needed.

**The easy way — the admin studio.** Once it's set up (see "One-time admin
setup" below), go to **admin.hometownhotspots.com** (or `/admin` on the main
site), log in, and use the friendly forms to add features, shop products, and
testimonials — photos upload right in the browser, no files or code involved.
Changes appear on the site within a minute of clicking Publish.

**The fallback:** until the studio is set up, all content lives in the
`src/data/` folder and is edited as files, as described below. Page text
(headlines, paragraphs) always lives in `src/data/` either way.

| I want to… | Edit this file |
| --- | --- |
| Add or change a featured business | `src/data/features.ts` |
| Add a testimonial | `src/data/testimonials.ts` |
| Add or change shop products | `src/data/products.ts` |
| Change page text (headlines, paragraphs) | `src/data/pages.ts` |
| Change nav, socials, email, mission, services, process steps | `src/data/site.ts` |

Every data file starts with a 👋 comment explaining exactly how to edit it.

---

## Adding a new feature (your most common task)

1. **Save a thumbnail image.** A screenshot of your video works great.
   Landscape, roughly 1200×800 pixels, under 300 KB. Put it in
   `public/images/features/` and name it after the business —
   for example `rosies-diner.jpg`.
2. **Open `src/data/features.ts`.** Copy one of the existing blocks between
   `{` and `}`, paste it at the **top** of the list, and change every value:
   the business name, category, location, blurb, the thumbnail filename from
   step 1, and the links to your Instagram / TikTok / Facebook posts.
3. **Put it on the map (optional).** In Google Maps, right-click the
   business and click the coordinates at the top of the menu to copy them.
   Add them to the entry as `coords: { lat: 42.2515, lng: -73.7897 }`
   (first number is lat). The pin appears on the Explore map automatically;
   without coords the business just isn't pinned.
4. **Pin it to the home page (optional).** Put `featured: true` on the new entry and remove
   `featured: true` from the old one. The pinned entry is the big
   "Newest Featured HotSpot" on the home page.
5. **Save, commit, and push** (see "How deploys work" below). Done!

> The first link in an entry's `links` list becomes the big
> "Watch on …" button; any other links show as small icons.
>
> Two example entries ship with placeholder thumbnail images — replace them
> with your first real features whenever you're ready.

## Adding a testimonial

Open `src/data/testimonials.ts`, copy the commented example, remove the `//`
marks, and fill in the quote, name, and business. The "Kind Words" section on
the Work With Us page is invisible until the first testimonial exists — then
it appears automatically.

## Selling merch in the shop

Open `src/data/products.ts`, copy an example block, and fill in the name,
price, description, a square product photo (saved to `public/images/shop/`),
and a `buyUrl`. The Buy button just links to that URL, so you can sell with
zero extra setup using any of these:

- **Stripe Payment Link** — stripe.com → Payment Links (they handle checkout)
- **Printful / Printify** — print-on-demand; link to the product page
- **Etsy** — link to your listing

Leave `buyUrl` as `""` to show the product as "Coming Soon", or set
`soldOut: true` when something sells out. Delete all products to show a
"merch is in the works" message instead of the grid.

## Editing text

- **Page copy** (story paragraphs, headings, the home banner, newsletter text,
  form messages): `src/data/pages.ts`
- **Site-wide things** (nav labels, social links, contact email, mission,
  vision, services, the 5 process steps, the inquiry disclaimer):
  `src/data/site.ts`

Change the words inside the quotes, keep the quotes themselves, save, push.

---

## How deploys work

The site is hosted on **Vercel**, which watches your GitHub repository.

1. Edit a file (GitHub's website editor works fine: open the file, click the
   pencil, edit, then "Commit changes").
2. Vercel notices the change and rebuilds the site automatically.
3. About a minute later your change is live. Nothing else to do.

If a deploy fails (usually a typo — a missing quote or comma), Vercel keeps
the previous version of the site live, so nothing breaks while you fix it.

## One-time admin setup (for a developer)

1. Create a free project at [sanity.io](https://www.sanity.io) (Google login
   works). Copy the **project ID** from the project dashboard, and create a
   dataset named `production`.
2. Add to Vercel → Settings → Environment Variables (and `.env.local`):
   `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET=production`.
3. In the Sanity project dashboard → API → CORS origins, add the site's
   domain (and `http://localhost:3000` for local work).
4. Invite Mikayla & Curtis as members of the Sanity project so they can log
   into the studio.
5. To use **admin.hometownhotspots.com**, add that subdomain to the Vercel
   project's Domains — requests to it are routed to the studio automatically.
6. Re-create the current example content (features, products) through the
   studio — from then on the studio is the source of truth. The files in
   `src/data/` remain as a safety net: if the env vars are ever removed, the
   site falls back to them.

The detail pages (`/hotspots/…`) unlock fully with the studio: the write-up,
photo carousel, and video fields are edited there per feature.

## The forms (one-time setup)

The contact form, inquiry form, and newsletter signup run on
[Resend](https://resend.com). They need three settings in
Vercel → your project → **Settings → Environment Variables**:

- `RESEND_API_KEY` — create one at Resend → API Keys
- `CONTACT_EMAIL` — the inbox where form submissions should land
- `RESEND_AUDIENCE_ID` — Resend → Audiences → your audience → copy the ID
  (this is your newsletter list)

Your sending domain (`hometownhotspots.com`) must also be verified in
Resend → Domains. Newsletter signups don't send an email — they're added
to the Resend audience, which you can email from Resend whenever you like.

`.env.example` in this folder lists the same three variables for anyone
running the site on their own computer.

## Running the site on your computer (optional)

You only need this if you want to preview changes before pushing:

```bash
npm install    # first time only
npm run dev    # then open http://localhost:3000
```

---

## For developers (future you, or someone you hire)

- Next.js 15 (App Router) + TypeScript + Tailwind v4. Deployed on Vercel.
- All colors/typography are design tokens in `src/app/globals.css`;
  components only use semantic token classes, never raw hex values.
- Pages are static server components; only the forms (and nav) are client
  components. Forms validate with the zod schemas in `src/lib/validation.ts`
  — shared by the API routes in `src/app/api/*` so client and server rules
  can't drift.
- All three API routes follow the same pattern: validate → honeypot check
  (`website_url` — fake success for bots) → Resend.
- `design-reference/` holds the original sitemap and mockups the site was
  built from. Not deployed.
