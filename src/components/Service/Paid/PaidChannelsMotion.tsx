"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";

/**
 * Two linear loops (each track is two identical sets; -50% = one set).
 * Per frame: timeScale eases toward 1 + energy·8 in the scroll direction,
 * and skew follows velocity. Ticker runs only while the band is visible.
 */
export function PaidChannelsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tracks = q<HTMLElement>("[data-pc-track]");
        const loops = tracks.map((t, i) =>
          gsap.fromTo(
            t,
            { xPercent: i ? -50 : 0 },
            { xPercent: i ? 0 : -50, duration: 38, ease: "none", repeat: -1 },
          ),
        );
        const skew = gsap.quickTo(tracks, "skewX", { duration: 0.4, ease: "power3.out" });

        const tick = () => {
          const v = scrollState.velocity;
          const target = (1 + scrollState.energy * 8) * (v < -0.5 ? -1 : 1);
          loops.forEach((l) => l.timeScale(l.timeScale() + (target - l.timeScale()) * 0.1));
          skew(gsap.utils.clamp(-14, 14, -v * 0.5));
        };

        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.ticker.add(tick);
              loops.forEach((l) => l.resume());
            } else {
              gsap.ticker.remove(tick);
              loops.forEach((l) => l.pause());
            }
          },
        });
        if (!st.isActive) loops.forEach((l) => l.pause());

        return () => gsap.ticker.remove(tick);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={className}
      data-svc-tone="signal"
      data-theme="signal"
      aria-labelledby="paid-channels-title"
    >
      {children}
    </section>
  );
}
