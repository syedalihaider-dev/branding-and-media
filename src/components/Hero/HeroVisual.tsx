"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MQ } from "@/lib/gsap";
import type { MediaItem } from "@/components/webgl/MediaField";
import styles from "./Hero.module.css";

// Three.js + R3F stay out of the initial bundle and never render on the server.
const MediaField = dynamic(() => import("@/components/webgl/MediaField"), { ssr: false });

const ITEMS: MediaItem[] = [
  { src: "/media/reel/portrait.webp", aspect: 1280 / 285 },
  { src: "/media/work/butterfly-effect.webp", aspect: 920 / 448 },
  { src: "/media/reel/collage-a.webp", aspect: 1280 / 285 },
  { src: "/media/work/aventics.webp", aspect: 1 },
  { src: "/media/reel/city.webp", aspect: 1280 / 285 },
  { src: "/media/editorial/stairs.webp", aspect: 1028 / 771 },
  { src: "/media/reel/bench.webp", aspect: 1280 / 285 },
  { src: "/media/work/healthy-lifestyle.webp", aspect: 920 / 448 },
  { src: "/media/reel/collage-b.webp", aspect: 1280 / 285 },
  { src: "/media/work/naval.webp", aspect: 1 },
  { src: "/media/reel/lounge.webp", aspect: 1280 / 285 },
  { src: "/media/reel/sky.webp", aspect: 1280 / 285 },
];

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides between the WebGL media field and the CSS still-life fallback.
 * Phones, reduced-motion users and GPUs without WebGL get the fallback.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(MQ.wide).matches;
    const motion = window.matchMedia(MQ.motion).matches;
    const host = ref.current?.closest("section");
    const ok = wide && motion && supportsWebGL();
    // One-time capability decision after mount (client-only APIs).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(ok ? "webgl" : "fallback");
    setCompact(!window.matchMedia(MQ.desktop).matches);
    if (host) host.dataset.webgl = ok ? "on" : "off";
  }, []);

  // Pause the render loop entirely when the hero is out of view.
  useEffect(() => {
    if (mode !== "webgl" || !ref.current) return;
    const host = ref.current.closest("section");
    if (!host) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "10% 0px",
    });
    io.observe(host);
    return () => io.disconnect();
  }, [mode]);

  return (
    <div ref={ref} className={styles.canvas} data-ready={ready}>
      {mode === "webgl" && (
        <MediaField items={ITEMS} active={active} compact={compact} onReady={() => setReady(true)} />
      )}
    </div>
  );
}
