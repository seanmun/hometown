/* ============================================================
   HomeTown HotSpots — Page Copy
   src/data/pages.ts

   👋 Every headline and paragraph on the four pages lives here.
   Edit any text in quotes, save, and the site updates on the
   next deploy. (Global things — nav, socials, mission, services,
   process steps — live in site.ts.)
   ============================================================ */

export const home = {
  hero: {
    image: "/images/hero.jpg",
    imageAlt:
      "Mikayla and Curtis overlooking a river valley at sunset",
  },

  featuredHeading: "Newest Featured HotSpot",
  featuredEyebrow: "Just dropped",

  latestHeading: "Latest Features",
  latestSub: "Fresh stories from the local businesses we love.",

  explore: {
    heading: "Explore By Category",
    sub: "Find your next favorite local spot.",
    cta: "View All HotSpots",
    /* Which categories show on the home page grid, in order.
       Each must exist in categoryMeta (src/data/features.ts). */
    categories: [
      "restaurant",
      "coffee",
      "nature",
      "wellness",
      "date-night",
      "market",
      "event",
      "hidden-gem",
    ],
  },

  banner: {
    title: "Own a local business?",
    blurb:
      "Let's create something amazing together. We'll tell your story the way it deserves to be told — and put it in front of the community.",
    cta: "Work With Us",
  },

  newsletter: {
    title: "Stay in the Loop",
    blurb:
      "Get local discoveries, events, and exclusive deals straight to your inbox.",
    button: "Subscribe",
    success: "You're in! Keep an eye on your inbox.",
  },
} as const;

export const about = {
  title: "About",
  description:
    "Meet Mikayla & Curtis — the storytellers behind HomeTown HotSpots.",

  story: {
    heading: "Our Story",
    paragraphs: [
      "Hi — we're Mikayla and Curtis, the two faces (and phones) behind HomeTown HotSpots. We kept discovering amazing local places our friends had never heard of, and we couldn't stop talking about them. So we started filming.",
      "HomeTown HotSpots exists to help people discover the places that make our community special — while helping the small businesses behind them get the recognition they deserve.",
      "Every feature starts the same way: we show up like real customers, experience a place first-hand, and share the story we find. No scripts, no staged reviews — just genuine moments from the spots that make this community feel like home.",
    ],
    photo: "/images/about/mikayla-and-curtis.jpg",
    photoAlt: "Mikayla and Curtis, mics in hand, in the woods of the Hudson Valley",
  },

  missionHeading: "Our Mission",
  visionHeading: "Our Vision",

  valuesHeading: "Our Values",
  values: [
    {
      icon: "Users",
      title: "Community",
      blurb: "We lift each other up and support local.",
    },
    {
      icon: "ThumbsUp",
      title: "Authenticity",
      blurb: "Real stories. Real people. Real experiences.",
    },
    {
      icon: "Compass",
      title: "Curiosity",
      blurb: "Follow your compass and explore more.",
    },
    {
      icon: "Heart",
      title: "Passion",
      blurb: "We love what we do and who we serve.",
    },
    {
      icon: "TrendingUp",
      title: "Growth",
      blurb: "Always learning, always evolving.",
    },
  ],

  whatIsHotSpot: {
    heading: "What is a HotSpot?",
    body: "A HotSpot is any local place worth talking about — a restaurant with a dish you can't stop thinking about, a farm stand run by three generations, a boutique with personality on every shelf. If it makes our community better, it's a HotSpot.",
  },

  hthsAtHome: {
    heading: "HTHS @ Home",
    body: "Can't get out and explore? HTHS @ Home is where we bring the discoveries to you — local finds, small-batch favorites, and ideas for supporting hometown businesses without leaving your couch. It's just getting started, so stay tuned.",
  },

  audiencesHeading: "Who We Love Working With",
  audiencesSub:
    "If you pour your heart into a local business, we probably already love you.",
} as const;

export const explore = {
  title: "Explore",
  description:
    "Every local business we've featured — browse by category and find your next favorite spot.",

  heading: "Explore HotSpots",
  sub: "Every business we've featured, all in one place.",
  allLabel: "All",
  mapHint: "Tap a pin to see who we featured there.",
  searchPlaceholder: "Search by name, place, or vibe…",
  empty:
    "Nothing here yet — we're always out exploring, so check back soon!",
  noResults: "No HotSpots match your search — try something else!",
} as const;

/* The business detail pages (/hotspots/…) */
export const hotspot = {
  backLabel: "All HotSpots",
  photosHeading: "Photos",
  videoHeading: "Watch",
  postsHeading: "See the Posts",
  postsSub: "Like, comment, share — it all helps this local business.",
} as const;

export const workWithUs = {
  title: "Work With Us",
  description:
    "Authentic video features that put your local business in front of the community.",

  intro: {
    heading: "We Help Local Businesses Grow",
    sub: "Authentic video features that put your business in front of the community — on Instagram, TikTok, and Facebook, where your next customers are already scrolling.",
  },

  servicesHeading: "What We Offer",
  processHeading: "How It Works",

  testimonialsHeading: "Kind Words",
  testimonialsSub: "From the businesses we've featured.",

  form: {
    heading: "Inquire Today",
    sub: "Tell us about your business and what you're hoping to accomplish. We personally read every inquiry.",
    button: "Send Inquiry",
    success:
      "Thanks — your inquiry is in! Check your email for a confirmation. We'll be in touch soon.",
    error:
      "Something went wrong sending your inquiry. Please try again, or email us directly.",
  },
} as const;

export const shop = {
  title: "Shop",
  description:
    "HomeTown HotSpots merch — wear your hometown pride and support local storytelling.",

  heading: "The HotSpot Shop",
  sub: "Rep your hometown. Every purchase helps us keep telling local stories.",

  buyLabel: "Buy Now",
  comingSoonLabel: "Coming Soon",
  soldOutLabel: "Sold Out",

  /* Shown under the product grid — good for shipping details.
     Leave as "" to hide it. */
  note: "",

  /* Shown when the product list is empty. */
  empty:
    "Merch is in the works — tees, totes, mugs, and more. Join the newsletter below and we'll let you know the moment it drops.",
} as const;

export const contact = {
  title: "Contact",
  description: "Have a question or want to work together? We'd love to hear from you.",

  heading: "Let's Connect",
  sub: "Have a question or want to work together? We'd love to hear from you!",

  form: {
    button: "Send Message",
    success: "Message sent! We'll get back to you soon.",
    error:
      "Something went wrong sending your message. Please try again, or email us directly.",
  },

  emailHeading: "Email",
  followHeading: "Follow Us",
} as const;
