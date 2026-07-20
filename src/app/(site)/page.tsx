/* ============================================================
   Home — hero, pinned "Newest Featured HotSpot", latest
   features grid, "Own a local business?" banner, newsletter.
   All copy comes from src/data/site.ts and src/data/pages.ts;
   features come from src/data/features.ts.
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { home } from "@/data/pages";
import { categoryMeta } from "@/data/features";
import { getFeatures, pinnedOf, latestOf } from "@/lib/content";
import { iconByName } from "@/components/icon-map";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import NewsletterBar from "@/components/NewsletterBar";
import Reveal from "@/components/Reveal";

export const revalidate = 60;

export default async function Home() {
  const features = await getFeatures();
  const pinned = pinnedOf(features);
  const latest = latestOf(features);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-28 text-center sm:px-6 sm:py-40">
        <Image
          src={home.hero.image}
          alt={home.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-dark/70 via-forest-dark/45 to-forest-dark/70"
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h1 className="text-display-lg text-cream sm:text-display-xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-body-lg text-cream/90">
            {site.description}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button href="#features">Explore Our Videos</Button>
            <Button href="/work-with-us" variant="light">
              Work With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Pinned feature */}
      {pinned && (
        <section id="features" className="scroll-mt-20 bg-parchment px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={home.featuredEyebrow}
              title={home.featuredHeading}
            />
            <div className="mt-10">
              <FeatureCard feature={pinned} variant="wide" priority />
            </div>
          </Reveal>
        </section>
      )}

      {/* Latest features */}
      {latest.length > 0 && (
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mx-auto max-w-6xl">
            <SectionHeading title={home.latestHeading} sub={home.latestSub} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((feature) => (
                <FeatureCard key={feature.slug} feature={feature} />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Explore by category */}
      <section className="bg-parchment px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading
            title={home.explore.heading}
            sub={home.explore.sub}
          />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {home.explore.categories.map((category) => {
              const meta = categoryMeta[category];
              const Icon = iconByName(meta.icon);
              return (
                <li key={category}>
                  <Link
                    href={`/explore?category=${category}`}
                    className="flex flex-col items-center gap-3 rounded-card border border-sand bg-surface p-6 text-center shadow-card transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover"
                  >
                    <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold">{meta.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/explore" variant="secondary">
              {home.explore.cta}
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Own a local business? */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <div className="rounded-card bg-parchment px-6 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-display-md">{home.banner.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-body-lg text-ink-soft">
              {home.banner.blurb}
            </p>
            <div className="mt-7">
              <Button href="/work-with-us">{home.banner.cta}</Button>
            </div>
          </div>
        </Reveal>
      </section>

      <NewsletterBar />
    </>
  );
}
