"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";

/**
 * Hero choreography.
 * Why: the opening must feel like a camera move, not a page load. The two
 * words drift apart as you scroll (Branding ↔ Media), the ampersand — the
 * place where the agency works — swells, and the WebGL camera dives into
 * the work. The next section slides over the pinned stage like a curtain.
 */
export function HeroMotion({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const stage = q("[data-hero-stage]")[0];

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            pin: stage,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              scrollState.hero = self.progress;
            },
            onLeave: () => {
              scrollState.hero = 1;
            },
          },
        });

        tl.to(q('[data-hero-line="a"]'), { xPercent: -28 }, 0)
          .to(q('[data-hero-line="b"]'), { xPercent: 34 }, 0)
          .to(q("[data-hero-amp]"), { scale: 2.6, rotate: -14, yPercent: 10 }, 0)
          .fromTo(q("[data-hero-foot]"), { yPercent: 0, autoAlpha: 1 }, { yPercent: -60, autoAlpha: 0, ease: "power1.in" }, 0)
          .to(q("[data-hero-shade]"), { opacity: 0.75 }, 0.2)
          .to(q("[data-hero-strip]"), { yPercent: (i) => [-40, -90, -20][i] ?? -40, stagger: 0 }, 0);

        // Pointer depth — words sit on different planes. quickTo writes
        // straight to transforms; no React work.
        const depthEls = q<HTMLElement>("[data-hero-depth]");
        const movers = depthEls.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
          d: Number(el.dataset.heroDepth),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * 28 * m.d);
            m.y(ny * 14 * m.d);
          });
        };
        const fine = window.matchMedia("(pointer: fine)").matches;
        if (fine) window.addEventListener("pointermove", onMove, { passive: true });

        return () => {
          window.removeEventListener("pointermove", onMove);
          scrollState.hero = 0;
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-label="Introduction">
      {children}
    </section>
  );
}
