/* ============================================================
   Testimonials — "Kind Words" on the Work With Us page.
   Renders nothing until testimonials are added in
   src/data/testimonials.ts, then appears automatically.
   ============================================================ */

import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { workWithUs } from "@/data/pages";
import SectionHeading from "./SectionHeading";
import Card from "./Card";
import Reveal from "./Reveal";

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHeading
          title={workWithUs.testimonialsHeading}
          sub={workWithUs.testimonialsSub}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={`${testimonial.name}-${testimonial.business}`}
              className="flex h-full flex-col gap-4 p-6"
            >
              <Quote className="h-6 w-6 text-accent" aria-hidden="true" />
              <p className="flex-1 leading-relaxed">“{testimonial.quote}”</p>
              <p className="text-sm font-semibold">
                {testimonial.name}
                <span className="font-normal text-ink-soft">
                  {" "}· {testimonial.business}
                </span>
              </p>
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
