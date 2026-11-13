"use client";

import type Lenis from "lenis";

/**
 * Lenis instance holder. SmoothScroll mounts it; anything else (nav links,
 * CTA buttons) calls scrollToTarget so behaviour is consistent with or
 * without smooth scrolling (reduced motion falls back to native jumps).
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView();
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
