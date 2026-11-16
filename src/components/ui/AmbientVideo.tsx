"use client";

import { useEffect, useRef } from "react";
import { MQ } from "@/lib/gsap";

type Source = { src: string; type: string };
type NetworkInfo = { saveData?: boolean };

/**
 * Silent, looping atmosphere video.
 *  - nothing downloads until it's within a viewport of the screen
 *  - phones / Save-Data get the light encode
 *  - plays only while visible and the tab is active
 *  - reduced motion: poster only, never autoplays
 */
export function AmbientVideo({
  sources,
  light,
  poster,
  startAt = 0,
  className,
}: {
  sources: readonly Source[];
  light: Source;
  poster: string;
  startAt?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia(MQ.reduce).matches) return;
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const lite = window.matchMedia(MQ.mobile).matches || !!conn?.saveData;
    let loaded = false;
    let visible = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      (lite ? [light] : sources).forEach((s) => {
        const el = document.createElement("source");
        el.src = s.src;
        el.type = s.type;
        v.appendChild(el);
      });
      if (startAt) v.addEventListener("loadedmetadata", () => (v.currentTime = startAt), { once: true });
      v.load();
    };

    const sync = () => {
      const play = visible && !document.hidden;
      if (play && v.paused) v.play().catch(() => {});
      else if (!play && !v.paused) v.pause();
    };

    const near = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "100% 0px" });
    const onScreen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) load();
      sync();
    });
    near.observe(v);
    onScreen.observe(v);
    document.addEventListener("visibilitychange", sync);

    return () => {
      near.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      v.pause();
    };
  }, [sources, light, startAt]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
