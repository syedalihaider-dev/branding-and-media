"use client";

/**
 * Central GSAP entry. Every client component imports gsap from here so
 * plugins are registered exactly once and config lives in one place.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  // Avoid refresh storms when mobile browser chrome shows/hides.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared media-query conditions. Keep in sync with CSS breakpoints. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1100px)",
  tablet: "(min-width: 768px) and (max-width: 1099.98px)",
  mobile: "(max-width: 767.98px)",
  wide: "(min-width: 768px)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
