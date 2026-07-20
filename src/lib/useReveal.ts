"use client";

/* ============================================================
   useReveal — tiny IntersectionObserver hook behind the
   fade-in-on-scroll effect. Sections already on screen (and
   anyone with reduced motion turned on) are never hidden.
   ============================================================ */

import { useEffect, useRef } from "react";

const HIDDEN = ["opacity-0", "translate-y-4"];

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide sections that start fully below the viewport —
    // visible content never flashes and LCP is untouched.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add(...HIDDEN);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(...HIDDEN);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
