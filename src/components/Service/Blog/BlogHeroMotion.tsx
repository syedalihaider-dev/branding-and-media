"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - Fragments arrive from depth (small, soft, then sharp) in a loose
 *   stagger; the headline rows slide in from opposite edges.
 * - Fine pointers: each fragment leans with the cursor in proportion to its
 *   depth, so the composition reads as layered space.
 * - Scroll: rows travel apart sideways; fragments rise at their own speeds.
 */
export function BlogHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, fine: "(pointer: fine)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const frags = q<HTMLElement>("[data-bh-depth]");
        const depth = (el: HTMLElement) => Number(el.dataset.bhDepth);

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q('[data-bh-row="1"] [data-bh-line]'), { xPercent: -40, autoAlpha: 0, duration: 1.4 }, 0)
          .from(q('[data-bh-row="2"] [data-bh-line]'), { xPercent: 40, autoAlpha: 0, duration: 1.4 }, 0.1)
          .from(frags, { scale: 0.6, autoAlpha: 0, filter: "blur(10px)", duration: 1.6, stagger: { each: 0.09, from: "random" }, clearProps: "filter" }, 0.3)
          .from(q("[data-bh-fade]"), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.07 }, 0.7);

        if (ctx.conditions.fine) {
          const movers = frags.map((f) => ({
            x: gsap.quickTo(f, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(f, "y", { duration: 1.2, ease: "power3.out" }),
            d: depth(f),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(nx * -40 * m.d);
              m.y(ny * -30 * m.d);
            });
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          ctx.add(() => () => window.removeEventListener("pointermove", onMove));
        }

        const out = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q('[data-bh-row="1"]'), { xPercent: -18, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-bh-row="2"]'), { xPercent: 14, ease: "none", scrollTrigger: out });
        frags.forEach((f) => gsap.to(f, { yPercent: -60 * depth(f), ease: "none", scrollTrigger: out }));
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="bone" data-theme="light" aria-labelledby="blog-hero-title">
      {children}
    </section>
  );
}
