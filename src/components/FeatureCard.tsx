/* ============================================================
   FeatureCard — one featured business. Thumbnail, category
   badge, name, location, blurb, and links out to the native
   Instagram / TikTok / Facebook posts (no embeds — videos
   always open on the platform, in a new tab).

   variant "grid" is the standard card; "wide" is the larger
   two-column layout used for the pinned feature on the home
   page.
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { categoryMeta, type Feature } from "@/data/features";
import { iconByName } from "./icon-map";
import { platformIcons, platformLabels } from "./icons";
import Card from "./Card";

type FeatureCardProps = {
  feature: Feature;
  variant?: "grid" | "wide";
  priority?: boolean;
};

export default function FeatureCard({
  feature,
  variant = "grid",
  priority = false,
}: FeatureCardProps) {
  const meta = categoryMeta[feature.category];
  const CategoryIcon = iconByName(meta.icon);
  const [primary, ...rest] = feature.links;
  const PrimaryIcon = platformIcons[primary.platform];
  const wide = variant === "wide";

  return (
    <Card
      hover
      className={
        wide
          ? "grid overflow-hidden md:grid-cols-2"
          : "flex h-full flex-col overflow-hidden"
      }
    >
      <Link
        href={`/hotspots/${feature.slug}`}
        className={`relative block ${wide ? "aspect-[3/2] md:aspect-auto md:min-h-80" : "aspect-[3/2]"}`}
        aria-label={`${feature.businessName} — read the feature`}
      >
        <Image
          src={feature.thumbnail}
          alt={`${feature.businessName} — video feature`}
          fill
          sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-primary shadow-card">
          <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {meta.label}
        </span>
      </Link>

      <div
        className={`flex flex-col gap-2 ${wide ? "justify-center p-6 sm:p-10" : "flex-1 p-5"}`}
      >
        <h3 className={wide ? "text-display-md" : "font-display text-lg font-semibold"}>
          <Link
            href={`/hotspots/${feature.slug}`}
            className="transition-colors hover:text-primary"
          >
            {feature.businessName}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {feature.location}
        </p>
        <p className={`leading-relaxed text-ink-soft ${wide ? "text-body-lg" : "text-sm"}`}>
          {feature.blurb}
        </p>

        <div className={`flex flex-wrap items-center gap-2 ${wide ? "pt-4" : "mt-auto pt-3"}`}>
          <a
            href={primary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-primary-hover"
          >
            <PrimaryIcon className="h-4 w-4" />
            Watch on {platformLabels[primary.platform]}
          </a>
          {rest.map((link) => {
            const Icon = platformIcons[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${feature.businessName} on ${platformLabels[link.platform]}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-ink-soft transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
