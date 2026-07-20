/* ============================================================
   HomeTown HotSpots — Site Settings & Copy
   src/data/site.ts

   👋 This file holds text and links used across the whole site.
   Edit any value in quotes and the site updates on next deploy.
   ============================================================ */

export const site = {
  name: "HomeTown HotSpots",
  tagline: "Discover. Support. Belong.",
  description:
    "Local experiences worth sharing. Small businesses worth supporting.",
  url: "https://hometownhotspots.com",
  email: "hello@hometownhotspots.com",

  social: {
    instagram: "https://www.instagram.com/hometownhotspots",
    tiktok: "https://www.tiktok.com/@hometownhotspots",
    facebook: "https://www.facebook.com/hometownhotspots",
  },

  founders: "Mikayla & Curtis",

  /* Script-font brand line — used sparingly */
  compass: {
    line: "Follow Your Compass",
    sub: "Explore more. Stay curious. Trust where you're drawn.",
  },

  footerLine:
    "HomeTown HotSpots is more than a platform — it's a movement to support local, live fully, and follow what feels right.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Work With Us", href: "/work-with-us" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
] as const;

export const mission =
  "To inspire people to explore, support local, and connect with their community through authentic storytelling.";

export const vision =
  "To become the leading local discovery platform that strengthens communities and helps small businesses thrive.";

/* Shown on Work With Us */
export const services = [
  {
    icon: "Video",
    title: "Featured Videos",
    blurb: "An authentic on-location video feature of your business, told our way.",
  },
  {
    icon: "Smartphone",
    title: "Social Media Content",
    blurb: "Content created for Instagram, TikTok, and Facebook that you can share too.",
  },
  {
    icon: "Gift",
    title: "Giveaways & Promotions",
    blurb: "Collaborative giveaways that get your business in front of new local customers.",
  },
] as const;

/* The 5-step "How It Works" on Work With Us */
export const processSteps = [
  { title: "Reach Out", blurb: "Fill out the inquiry form and tell us about your business." },
  { title: "Let's Chat", blurb: "We'll connect to learn your story and see if we're a fit." },
  { title: "We Visit", blurb: "We come experience your business like real customers do." },
  { title: "We Create", blurb: "We film, edit, and craft your feature with care." },
  { title: "You Get Amazing Content", blurb: "Your feature goes live and the community discovers you." },
] as const;

/* Shown under the inquiry form */
export const inquiryDisclaimer =
  "We are selective of the businesses we work with. Not every inquiry and recommendation is chosen.";

/* Businesses we love working with — About / Work With Us */
export const audiences = [
  "Restaurants",
  "Coffee Shops",
  "Markets",
  "Boutiques",
  "Farms",
  "Breweries",
  "Wellness",
  "Experiences",
  "Events",
] as const;