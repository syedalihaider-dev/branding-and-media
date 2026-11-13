"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MQ } from "@/lib/gsap";
import type { GalleryItem } from "@/components/webgl/BrandGallery";
import { ambientClients, press, stations } from "@/content/gallery";
import styles from "./Clients.module.css";

const BrandGallery = dynamic(() => import("@/components/webgl/BrandGallery"), { ssr: false });

const ITEMS: GalleryItem[] = stations.map((s) => ({
  name: s.name,
  type: s.type,
  image: s.image?.src,
  quote: !!s.quote,
}));

/**
 * Mounts the WebGL gallery only when the section is about to be reached
 * (keeps it off the critical path) and pauses rendering whenever it's off
 * screen. ClientsMotion has already decided whether WebGL is in play
 * (section[data-webgl]).
 */
export function GalleryVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const host = ref.current?.closest("section");
    if (!host || host.dataset.webgl !== "on") return;
    // Build the scene (text rasterising, texture upload, shader compile) in
    // an idle slot soon after the opening — never mid-scroll. Proximity is
    // the fallback if the visitor races down the page first.
    let idle = 0;
    const mount = () => {
      setCompact(window.matchMedia(MQ.mobile).matches || window.innerWidth / window.innerHeight < 0.9);
      setMounted(true);
      near.disconnect();
      window.removeEventListener("bm:preloaded", schedule);
    };
    const schedule = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(mount, { timeout: 2500 })
        : window.setTimeout(mount, 1200);
    };
    const near = new IntersectionObserver(([e]) => e.isIntersecting && mount(), { rootMargin: "200% 0px" });
    if (document.documentElement.dataset.preloader === "done" || !document.documentElement.dataset.preloader) {
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
    } else window.addEventListener("bm:preloaded", schedule, { once: true });
    const onScreen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "5% 0px" });
    near.observe(host);
    onScreen.observe(host);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      window.removeEventListener("bm:preloaded", schedule);
      window.removeEventListener("load", schedule);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      clearTimeout(idle);
    };
  }, []);

  return (
    <div ref={ref} className={styles.canvas} data-ready={ready}>
      {mounted && (
        <BrandGallery
          items={ITEMS}
          ambient={ambientClients}
          press={press}
          active={active}
          compact={compact}
          onReady={() => setReady(true)}
        />
      )}
    </div>
  );
}
