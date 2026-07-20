/* ============================================================
   Work With Us — intro, services, 5-step process,
   testimonials (hidden until added), inquiry form, and
   disclaimer. Copy lives in src/data/site.ts and pages.ts.
   ============================================================ */

import type { Metadata } from "next";
import { inquiryDisclaimer, processSteps, services } from "@/data/site";
import { workWithUs } from "@/data/pages";
import { iconByName } from "@/components/icon-map";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import InquiryForm from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: workWithUs.title,
  description: workWithUs.description,
};

export const revalidate = 60;

export default function WorkWithUsPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-display-lg">{workWithUs.intro.heading}</h1>
          <p className="mt-4 text-body-lg text-ink-soft">
            {workWithUs.intro.sub}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading title={workWithUs.servicesHeading} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = iconByName(service.icon);
              return (
                <Card key={service.title} className="p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {service.blurb}
                  </p>
                </Card>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading title={workWithUs.processHeading} />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-cream">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {step.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Kind Words — appears once testimonials exist */}
      <Testimonials />

      {/* Inquiry form */}
      <section className="px-4 pt-4 pb-16 sm:px-6 sm:pb-24">
        <Reveal className="mx-auto max-w-3xl">
          <SectionHeading
            title={workWithUs.form.heading}
            sub={workWithUs.form.sub}
          />
          <Card className="mt-10 p-6 sm:p-10">
            <InquiryForm />
          </Card>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink-soft italic">
            {inquiryDisclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
