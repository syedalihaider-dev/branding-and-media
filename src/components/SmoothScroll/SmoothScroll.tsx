"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/smoothScroll";
import { scrollState } from "@/lib/scrollState";

/**
 * Owns the single scroll loop for the page:
 *  - Lenis smooth scrolling, driven by gsap.ticker (one RAF for everything)
 *  - ScrollTrigger updates on Lenis scroll
 *  - velocity + pointer written to scrollState for WebGL / marquees
 * Reduced-motion users get native scrolling and no Lenis.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(MQ.reduce).matches;
    let lenis: Lenis | null = null;

    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let tick: ((time: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        anchors: true,
        autoRaf: false,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        lenis!.raf(time * 1000);
        // Smooth velocity so consumers never see spikes.
        const v = lenis!.velocity || 0;
        scrollState.velocity += (v - scrollState.velocity) * 0.12;
        scrollState.energy = Math.min(Math.abs(scrollState.velocity) / 40, 1);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Re-measure once webfonts settle — prevents pin offsets from drifting.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", onPointer);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  // New route: start at the top and re-measure every trigger once the
  // incoming page has laid out (the previous page is kept hidden, not
  // unmounted, so stale measurements would otherwise linger).
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    const raf = requestAnimationFrame(() => {
      getLenis()?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
