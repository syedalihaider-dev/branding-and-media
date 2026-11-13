"use client";

import { useEffect, useRef } from "react";
import { film } from "@/content/film";
import { MQ } from "@/lib/gsap";

type NetworkInfo = { saveData?: boolean };

/**
 * Bandwidth- and battery-aware film player.
 *  - nothing is downloaded until the section is ~one viewport away
 *  - phones / Save-Data get the light 960px encode
 *  - plays only while on screen; pauses when scrolled away or tab hidden
 *  - reduced motion: never autoplays, poster + explicit play control
 *  - timecode HUD is written straight to the DOM (no React renders)
 */
export function FilmVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const section = v.closest("section");
    const tc = section?.querySelector<HTMLElement>("[data-film-tc]");
    const reduce = window.matchMedia(MQ.reduce).matches;
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const light = window.matchMedia(MQ.mobile).matches || !!conn?.saveData;
    let loaded = false;
    let visible = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      const list = light ? [film.light] : film.sources;
      list.forEach((s) => {
        const el = document.createElement("source");
        el.src = s.src;
        el.type = s.type;
        v.appendChild(el);
      });
      // Begin on the poster's frame so the still dissolves into motion
      // without a cut; the loop then runs the whole reel.
      v.addEventListener("loadedmetadata", () => (v.currentTime = film.startAt), { once: true });
      v.load();
    };

    const sync = () => {
      const shouldPlay = visible && !document.hidden && !userPaused.current && !reduce;
      if (shouldPlay && v.paused) v.play().catch(() => {});
      else if (!shouldPlay && !v.paused) v.pause();
    };

    const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
    let rvfc = 0;
    const writeTc = () => {
      if (!tc) return;
      const t = v.currentTime;
      tc.textContent = `00:${pad(t / 60)}:${pad(t % 60)}:${pad((t % 1) * film.fps)}`;
    };
    const onFrame = () => {
      writeTc();
      rvfc = v.requestVideoFrameCallback(onFrame);
    };
    const hasRvfc = typeof v.requestVideoFrameCallback === "function";
    const onPlay = () => {
      if (hasRvfc) rvfc = v.requestVideoFrameCallback(onFrame);
    };
    const onPause = () => {
      if (hasRvfc) v.cancelVideoFrameCallback(rvfc);
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    if (!hasRvfc) v.addEventListener("timeupdate", writeTc);

    // Prefetch one viewport ahead; play only when actually visible.
    const near = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "100% 0px" });
    const onScreen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) load();
      sync();
    });
    if (section) {
      near.observe(section);
      onScreen.observe(section);
    }
    document.addEventListener("visibilitychange", sync);
    const onToggle = () => {
      userPaused.current = !v.paused;
      if (v.paused) {
        load();
        v.play().catch(() => {});
      } else v.pause();
    };
    v.addEventListener("film:toggle", onToggle);

    return () => {
      near.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", writeTc);
      v.removeEventListener("film:toggle", onToggle);
      if (hasRvfc) v.cancelVideoFrameCallback(rvfc);
      v.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={film.poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-label={film.label}
      data-film-video
    />
  );
}
