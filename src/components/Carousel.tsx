"use client";

/* ============================================================
   Carousel — simple scroll-snap photo carousel with arrow
   buttons. No libraries; swipe works natively on touch.
   ============================================================ */

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const scroll = (direction: number) =>
    scrollerRef.current?.scrollBy({
      left: direction * scrollerRef.current.clientWidth,
      behavior: "smooth",
    });

  const arrowClasses =
    "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-card transition-colors hover:bg-surface";

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="relative aspect-[3/2] w-full shrink-0 snap-center"
          >
            <Image
              src={src}
              alt={`${alt} — photo ${index + 1} of ${images.length}`}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous photo"
            className={`${arrowClasses} left-3`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next photo"
            className={`${arrowClasses} right-3`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
