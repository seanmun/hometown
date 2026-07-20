/* ============================================================
   About — Our Story, Mission & Vision, What is a HotSpot?,
   HTHS @ Home, Who We Love Working With, and the
   "Follow Your Compass" close. Copy lives in
   src/data/pages.ts and src/data/site.ts.
   ============================================================ */

import type { Metadata } from "next";
import { Camera, Compass, Heart, House, Telescope } from "lucide-react";
import { audiences, mission, site, vision } from "@/data/site";
import { about } from "@/data/pages";
import { categoryMeta } from "@/data/features";
import { iconByName } from "@/components/icon-map";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
};

/* The audience list matches the category labels in features.ts,
   so each chip can borrow its category icon. */
function audienceIconName(label: string): string {
  return (
    Object.values(categoryMeta).find((meta) => meta.label === label)?.icon ??
    "Compass"
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Our Story */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="text-display-lg">{about.story.heading}</h1>
            <div className="mt-6 space-y-4 leading-relaxed">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-card border border-sand bg-parchment p-8 text-center">
            <Camera className="h-10 w-10 text-ink-soft/50" aria-hidden="true" />
            <p className="max-w-xs text-sm text-ink-soft italic">
              {about.story.photoCaption}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Heart className="h-6 w-6 text-accent" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-display-md">{about.missionHeading}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{mission}</p>
          </Card>
          <Card className="p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Telescope className="h-6 w-6 text-accent" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-display-md">{about.visionHeading}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{vision}</p>
          </Card>
        </Reveal>
      </section>

      {/* Our Values */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading title={about.valuesHeading} />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {about.values.map((value) => {
              const Icon = iconByName(value.icon);
              return (
                <li
                  key={value.title}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {value.blurb}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      {/* What is a HotSpot? */}
      <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading title={about.whatIsHotSpot.heading} />
          <p className="mt-5 text-body-lg leading-relaxed text-ink-soft">
            {about.whatIsHotSpot.body}
          </p>
        </Reveal>
      </section>

      {/* HTHS @ Home */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <House className="h-6 w-6 text-accent" aria-hidden="true" />
          </span>
          <div className="mt-5">
            <SectionHeading title={about.hthsAtHome.heading} />
          </div>
          <p className="mt-5 text-body-lg leading-relaxed text-ink-soft">
            {about.hthsAtHome.body}
          </p>
        </Reveal>
      </section>

      {/* Who We Love Working With */}
      <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <SectionHeading
            title={about.audiencesHeading}
            sub={about.audiencesSub}
          />
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {audiences.map((audience) => {
              const Icon = iconByName(audienceIconName(audience));
              return (
                <li
                  key={audience}
                  className="flex items-center gap-2 rounded-full border border-sand bg-surface px-4 py-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  {audience}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      {/* Follow Your Compass */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Compass className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
          <p className="mt-5 font-script text-5xl text-forest-dark sm:text-6xl">
            {site.compass.line}
          </p>
          <p className="mt-4 text-body-lg text-ink-soft">{site.compass.sub}</p>
        </Reveal>
      </section>
    </>
  );
}
