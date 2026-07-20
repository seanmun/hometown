"use client";

/* ============================================================
   ExploreGrid — the filterable grid on the Explore page.
   Filter chips appear automatically for every category that
   has at least one feature in src/data/features.ts; nothing
   to maintain here. Supports deep links like
   /explore?category=coffee (used by the home page callout).
   ============================================================ */

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { categoryMeta, type Category, type Feature } from "@/data/features";
import { explore } from "@/data/pages";
import { iconByName } from "./icon-map";
import FeatureCard from "./FeatureCard";

function isCategory(value: string | null): value is Category {
  return value !== null && value in categoryMeta;
}

export default function ExploreGrid({
  features: allFeatures,
}: {
  features: Feature[];
}) {
  const initial = useSearchParams().get("category");
  const [active, setActive] = useState<Category | "all">(
    isCategory(initial) ? initial : "all"
  );
  const [query, setQuery] = useState("");

  // Chips: every category with content, in categoryMeta order —
  // plus the active one even if it's empty, so deep links from
  // the home page always show which filter is selected.
  const used = new Set(allFeatures.map((feature) => feature.category));
  const chips = (Object.keys(categoryMeta) as Category[]).filter(
    (category) => used.has(category) || category === active
  );

  const needle = query.trim().toLowerCase();
  const visible = allFeatures.filter((feature) => {
    if (active !== "all" && feature.category !== active) return false;
    if (!needle) return true;
    return [
      feature.businessName,
      feature.location,
      feature.blurb,
      categoryMeta[feature.category].label,
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  function select(category: Category | "all") {
    setActive(category);
    const url =
      category === "all" ? "/explore" : `/explore?category=${category}`;
    window.history.replaceState(null, "", url);
  }

  const chipBase =
    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors";

  return (
    <div>
      <div className="relative mx-auto mb-8 max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={explore.searchPlaceholder}
          aria-label="Search HotSpots"
          className="w-full rounded-full border border-sand bg-surface py-2.5 pr-11 pl-11 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-parchment hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => select("all")}
          aria-pressed={active === "all"}
          className={`${chipBase} ${
            active === "all"
              ? "border-primary bg-primary text-cream"
              : "border-sand bg-surface hover:border-primary hover:text-primary"
          }`}
        >
          {explore.allLabel}
        </button>
        {chips.map((category) => {
          const meta = categoryMeta[category];
          const Icon = iconByName(meta.icon);
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => select(category)}
              aria-pressed={selected}
              className={`${chipBase} ${
                selected
                  ? "border-primary bg-primary text-cream"
                  : "border-sand bg-surface hover:border-primary hover:text-primary"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${selected ? "" : "text-accent"}`}
                aria-hidden="true"
              />
              {meta.label}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((feature) => (
            <FeatureCard key={feature.slug} feature={feature} />
          ))}
        </div>
      ) : (
        <p className="mx-auto mt-16 max-w-md text-center text-body-lg text-ink-soft">
          {needle ? explore.noResults : explore.empty}
        </p>
      )}
    </div>
  );
}
