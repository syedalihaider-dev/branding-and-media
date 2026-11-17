"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - The spotlight strikes: a quick double flicker, then the beam opens.
 * - "Not mentioned." appears and is struck through; "Featured." rises.
 * - Fine pointers steer the beam (lagged); touch gets a slow search that
 *   comes to rest on the subject.
 * - Scroll: house lights up — the beam widens to fill the frame while the
 *   camera pushes in.
 */
export function FeaturedHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, fine: "(pointer: fine)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const section = ref.current!;
        const r0 = parseFloat(getComputedStyle(section).getPropertyValue("--r")) || 30;

        gsap
          .timeline()
          .fromTo(section, { "--r": 0 }, { "--r": r0 * 0.4, duration: 0.06, ease: "none" }, 0.35)
          .to(section, { "--r": 0, duration: 0.06, ease: "none" }, 0.5)
          .to(section, { "--r": r0, duration: 1.6, ease: "expo.out" }, 0.62)
          .from(q("[data-fh-media]"), { scale: 1.12, duration: 2.4, ease: "expo.out" }, 0.4)
          .from(q("[data-fh-not]"), { y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0.7)
          .from(q("[data-fh-strike]"), { scaleX: 0, duration: 0.7, ease: "expo.inOut" }, 1.2)
          .from(q("[data-fh-line]"), { yPercent: 105, duration: 1.4, ease: "power4.out" }, 1.25)
          .from(q("[data-fh-fade]"), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.07 }, 1.4);

        const xTo = gsap.quickTo(section, "--mx", { duration: 1.1, ease: "power3.out" });
        const yTo = gsap.quickTo(section, "--my", { duration: 1.1, ease: "power3.out" });

        if (ctx.conditions.fine) {
          const onMove = (e: PointerEvent) => {
            const b = section.getBoundingClientRect();
            if (e.clientY < b.top || e.clientY > b.bottom) return;
            xTo(((e.clientX - b.left) / b.width) * 100);
            yTo(((e.clientY - b.top) / b.height) * 100);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          ctx.add(() => () => window.removeEventListener("pointermove", onMove));
        } else {
          const home = { x: parseFloat(getComputedStyle(section).getPropertyValue("--mx")), y: parseFloat(getComputedStyle(section).getPropertyValue("--my")) };
          gsap
            .timeline({ delay: 2, repeat: -1, repeatDelay: 3 })
            .to(section, { "--mx": 25, "--my": 30, duration: 1.8, ease: "sine.inOut" })
            .to(section, { "--mx": 75, "--my": 55, duration: 2, ease: "sine.inOut" })
            .to(section, { "--mx": home.x, "--my": home.y, duration: 1.6, ease: "power3.inOut" });
        }

        const out = { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(section, { "--r": 150, ease: "power1.in", scrollTrigger: out });
        gsap.to(q("[data-fh-media]"), { scale: 1.2, ease: "none", scrollTrigger: out });
        gsap.to(q("[data-fh-house]"), { autoAlpha: 0, ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="featured-hero-title">
      {children}
    </section>
  );
}
