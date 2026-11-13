"use client";

import { useEffect, useRef } from "react";
import styles from "./Services.module.css";

/**
 * The agency reel. preload="none" so it costs nothing until its world is
 * entered; the Services timeline dispatches `reel:play` / `reel:pause` on
 * the element as the Media world becomes active / inactive.
 */
export function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      v.play().catch(() => {});
    };
    const pause = () => v.pause();
    v.addEventListener("reel:play", play);
    v.addEventListener("reel:pause", pause);
    return () => {
      v.removeEventListener("reel:play", play);
      v.removeEventListener("reel:pause", pause);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={styles.reel}
      src="/media/reel/reel.mp4"
      poster="/media/reel/poster.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-label="Branding and Media showreel: strategy, creative, technology, marketing and beyond"
      data-reel
    />
  );
}
