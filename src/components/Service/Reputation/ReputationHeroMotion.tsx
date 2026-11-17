"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * - Intro: the horizon draws; the headline rises; the reflection surfaces
 *   on rough water.
 * - Scroll: the water stills (displacement → 0) and the reflection gains
 *   presence — perception brought into line with reality.
 * - Pointer movement adds a brief disturbance that settles on its own.
 * - The surface drifts slowly while on screen (desktop only); the filter
 *   is only touched while the hero is visible.
 */
export function ReputationHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const section = ref.current!;

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-rh-media]"), { scale: 1.15, autoAlpha: 0, duration: 2.2 }, 0)
          .from(q("[data-rh-horizon]"), { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.2)
          .from(q("[data-rh-line]"), { yPercent: 110, duration: 1.3, stagger: 0.12, ease: "power4.out" }, 0.45)
          .from(q("[data-rh-reflect]"), { autoAlpha: 0, yPercent: -20, duration: 1.8 }, 0.8)
          .from(q("[data-rh-fade]"), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.07 }, 0.9);

        const out = { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 };
        gsap.to(q("[data-rh-media]"), { scale: 1.1, ease: "none", scrollTrigger: out });

        if (ctx.conditions.mobile) return;

        const disp = q<SVGFEDisplacementMapElement>("[data-rh-disp]")[0];
        const noise = q<SVGFETurbulenceElement>("[data-rh-noise]")[0];
        const state = { base: 34, bump: 0, drift: 0 };

        gsap.to(state, { base: 0, ease: "none", scrollTrigger: { ...out, end: "60% top" } });
        gsap.to(q("[data-rh-reflect] > span"), { opacity: 0.6, ease: "none", scrollTrigger: { ...out, end: "60% top" } });

        const drift = gsap.to(state, { drift: 1, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
        const bumpTo = gsap.quickTo(state, "bump", { duration: 1.6, ease: "power2.out" });
        let lastX = 0;
        const onMove = (e: PointerEvent) => {
          const d = Math.min(40, Math.abs(e.clientX - lastX));
          lastX = e.clientX;
          bumpTo(d);
          gsap.delayedCall(0.15, () => bumpTo(0));
        };

        const render = () => {
          disp.setAttribute("scale", (state.base + state.bump).toFixed(2));
          noise.setAttribute("baseFrequency", `0.004 ${(0.08 + state.drift * 0.025).toFixed(4)}`);
        };

        let on = false;
        const run = (active: boolean) => {
          if (active === on) return;
          on = active;
          if (active) {
            gsap.ticker.add(render);
            drift.play();
            section.addEventListener("pointermove", onMove, { passive: true });
          } else {
            gsap.ticker.remove(render);
            drift.pause();
            section.removeEventListener("pointermove", onMove);
          }
        };
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => run(self.isActive),
        });
        run(st.isActive);
        return () => run(false);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="reputation-hero-title">
      {children}
    </section>
  );
}
