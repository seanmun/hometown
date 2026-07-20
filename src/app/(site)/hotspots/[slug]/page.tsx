/* ============================================================
   Business detail page — /hotspots/<slug>
   The full story for one featured business: write-up, photo
   carousel, optional video, and links to the social posts.
   Content comes from the admin studio (or src/data/features.ts
   until the CMS is switched on).
   ============================================================ */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import { categoryMeta } from "@/data/features";
import { hotspot } from "@/data/pages";
import { getFeatureBySlug, getFeatures } from "@/lib/content";
import { iconByName } from "@/components/icon-map";
import { platformIcons, platformLabels } from "@/components/icons";
import Carousel from "@/components/Carousel";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getFeatures()).map((feature) => ({ slug: feature.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const feature = await getFeatureBySlug(slug);
  if (!feature) return {};
  return {
    title: feature.businessName,
    description: feature.blurb,
    openGraph: { images: [{ url: feature.thumbnail }] },
  };
}

export default async function HotSpotPage({ params }: Params) {
  const { slug } = await params;
  const feature = await getFeatureBySlug(slug);
  if (!feature) notFound();

  const meta = categoryMeta[feature.category];
  const CategoryIcon = iconByName(meta.icon);
  const published = new Date(`${feature.date}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );
  const writeup = feature.writeup as PortableTextBlock[] | undefined;

  return (
    <article className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {hotspot.backLabel}
        </Link>

        {/* Header */}
        <header className="mt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1 text-xs font-semibold text-primary">
            <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {meta.label}
          </span>
          <h1 className="mt-4 text-display-lg">{feature.businessName}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {feature.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
              {published}
            </span>
          </p>
        </header>

        {/* Hero image */}
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card shadow-card">
          <Image
            src={feature.thumbnail}
            alt={`${feature.businessName} — featured photo`}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Lede + write-up */}
        <p className="mt-8 text-body-lg leading-relaxed text-ink-soft">
          {feature.blurb}
        </p>
        {writeup && writeup.length > 0 && (
          <div className="mt-6 space-y-4 leading-relaxed [&_h2]:mt-8 [&_h2]:text-display-md [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_a]:font-medium [&_a]:text-primary [&_a]:underline">
            <PortableText value={writeup} />
          </div>
        )}

        {/* Photo carousel */}
        {feature.gallery && feature.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-display-md">{hotspot.photosHeading}</h2>
            <div className="mt-5">
              <Carousel images={feature.gallery} alt={feature.businessName} />
            </div>
          </section>
        )}

        {/* Video */}
        {feature.videoUrl && (
          <section className="mt-12">
            <h2 className="text-display-md">{hotspot.videoHeading}</h2>
            <video
              controls
              playsInline
              preload="metadata"
              src={feature.videoUrl}
              className="mt-5 w-full rounded-card shadow-card"
            />
          </section>
        )}

        {/* Social posts */}
        <section className="mt-12 rounded-card bg-parchment p-6 sm:p-8">
          <h2 className="text-display-md">{hotspot.postsHeading}</h2>
          <p className="mt-2 text-sm text-ink-soft">{hotspot.postsSub}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {feature.links.map((link) => {
              const Icon = platformIcons[link.platform];
              return (
                <a
                  key={link.platform + link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-hover"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  Watch on {platformLabels[link.platform]}
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
