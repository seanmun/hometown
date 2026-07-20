"use client";

/* ============================================================
   HotSpotMap — pins every feature that has coords on an
   OpenStreetMap map (via Leaflet — free, no API key).
   Add coords to an entry in src/data/features.ts and its pin
   appears automatically; popups link to the video feature.
   ============================================================ */

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./hotspot-map.css";
import { categoryMeta, type Feature } from "@/data/features";
import { platformLabels } from "./icons";

/* Same shape as the lucide MapPin icon, colored by CSS. */
const PIN_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34"
       fill="currentColor" stroke="var(--color-cream)" stroke-width="1">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3.2" fill="var(--color-accent)" stroke="none"/>
  </svg>`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default function HotSpotMap({ features }: { features: Feature[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      // Loaded here (not at module scope) because Leaflet needs
      // the browser; this also keeps it out of the first paint.
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "hotspot-pin",
        html: PIN_SVG,
        iconSize: [34, 34],
        iconAnchor: [17, 32],
        popupAnchor: [0, -30],
      });

      const markers = features
        .filter((feature) => feature.coords)
        .map((feature) => {
          const primary = feature.links[0];
          const popup = `
            <p style="margin:0;font-weight:600;">
              <a href="/hotspots/${escapeHtml(feature.slug)}" style="color:var(--color-ink);">${escapeHtml(feature.businessName)}</a>
            </p>
            <p style="margin:2px 0 0;font-size:12px;color:var(--color-ink-soft);">
              ${escapeHtml(categoryMeta[feature.category].label)} · ${escapeHtml(feature.location)}
            </p>
            <a href="${escapeHtml(primary.url)}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;margin-top:8px;font-size:13px;font-weight:600;color:var(--color-primary);">
              Watch on ${platformLabels[primary.platform]} →
            </a>`;
          return L.marker([feature.coords!.lat, feature.coords!.lng], {
            icon,
            title: feature.businessName,
          }).bindPopup(popup);
        });

      if (markers.length > 0) {
        const group = L.featureGroup(markers).addTo(map);
        map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 13 });
      } else {
        // No pins yet — rest on the Hudson Valley.
        map.setView([42.2529, -73.791], 10);
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [features]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Map of featured HotSpots"
      className="hotspot-map isolate h-[420px] w-full overflow-hidden rounded-card shadow-card"
    />
  );
}
