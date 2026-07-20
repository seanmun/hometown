/* ============================================================
   HomeTown HotSpots — Shop Products
   src/data/products.ts

   👋 HOW TO ADD A PRODUCT (no coding knowledge needed):

   1. Save a product photo (square, roughly 900x900px, under
      300KB) into:  public/images/shop/
      Name it after the product, e.g. compass-tote.jpg

   2. Copy one of the blocks between { } below, paste it at the
      top of the list, and change every value.

   3. "buyUrl" is where the Buy button goes — the easiest ways
      to sell without any extra code:
        • Stripe Payment Link (stripe.com → Payment Links)
        • A Printful / Printify product page
        • An Etsy listing
      Leave buyUrl as "" to show the product as "Coming Soon".
      Set  soldOut: true  to mark it sold out.

   4. Save, push, and the shop updates on the next deploy.
   ============================================================ */

export interface Product {
  slug: string;        // unique, url-safe: "compass-tote"
  name: string;        // "Compass Tote Bag"
  price: string;       // shown as written: "$24"
  description: string; // one friendly sentence
  image: string;       // "/images/shop/compass-tote.jpg"
  buyUrl: string;      // checkout link — "" shows "Coming Soon"
  soldOut?: boolean;   // true = sold out
}

/* ------------------------------------------------------------
   THE LIST — the three below are EXAMPLES so you can see the
   layout. Replace them with real products (or delete them to
   show the "merch is in the works" message).
   ------------------------------------------------------------ */

export const products: Product[] = [
  {
    slug: "compass-tote",
    name: "Compass Tote Bag",
    price: "$24",
    description: "Sturdy canvas tote with the HomeTown HotSpots compass.",
    image: "/images/shop/compass-tote.jpg",
    buyUrl: "",
  },
  {
    slug: "hometown-tee",
    name: "HomeTown Tee",
    price: "$28",
    description: "Soft cotton tee for people who support local.",
    image: "/images/shop/hometown-tee.jpg",
    buyUrl: "",
  },
  {
    slug: "follow-your-compass-mug",
    name: "Follow Your Compass Mug",
    price: "$16",
    description: "Your morning coffee, with a little direction.",
    image: "/images/shop/follow-your-compass-mug.jpg",
    buyUrl: "",
  },
];
