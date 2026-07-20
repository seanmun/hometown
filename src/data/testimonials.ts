/* ============================================================
   HomeTown HotSpots — Testimonials
   src/data/testimonials.ts

   👋 HOW TO ADD A TESTIMONIAL (no coding knowledge needed):

   Copy the commented example below, paste it between the [ ]
   brackets of the list, remove the // marks, and change the
   text. Add as many as you like, separated by commas.

   The "Kind Words" section on the Work With Us page stays
   hidden until at least one testimonial is added here.
   ============================================================ */

export interface Testimonial {
  quote: string;    // what they said — keep it to a few sentences
  name: string;     // "Jess R."
  business: string; // "The Daily Press Cafe"
}

export const testimonials: Testimonial[] = [
  // {
  //   quote:
  //     "Our feature brought in new faces the very first weekend. Mikayla and Curtis captured exactly what makes our shop special.",
  //   name: "Jess R.",
  //   business: "The Daily Press Cafe",
  // },
];
