"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Film choreography (scrubbed, pinned):
 *   word as window → letters fly past the lens → full-bleed footage →
 *   statement surfaces → letterbox closes into the next section.
 * Everything is transform / opacity / clip-path; the video element itself
 * is only scaled, never re-laid-out.
 */
export function FilmMotion({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const mobile = !!ctx.conditions.mobile;
        const letters = q<HTMLElement>("[data-film-letter]");
        const mid = (letters.length - 1) / 2;

        // Arrival: the word settles as the section rises into view.
        gsap.fromTo(
          q("[data-film-knock] > span"),
          { scale: 0.82, yPercent: 8 },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top top", scrub: true },
          },
        );

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: mobile ? "+=220%" : "+=270%",
            pin: q("[data-film-stage]")[0],
            scrub: true,
            anticipatePin: 1,
          },
        });

        // I — through the letters
        tl.to(
          letters,
          {
            xPercent: (i) => (i - mid) * (mobile ? 90 : 120),
            yPercent: (i) => (i % 2 ? -14 : 12),
            scale: mobile ? 4 : 3.4,
            ease: "power2.in",
            duration: 0.4,
          },
          0.02,
        )
          .fromTo(q("[data-film-knock-bg]"), { opacity: 1 }, { opacity: 0, duration: 0.18, ease: "power2.in" }, 0.2)
          .fromTo(q("[data-film-media]"), { scale: 1.32 }, { scale: 1, duration: 0.45, ease: "power2.out" }, 0)
          .fromTo(q("[data-film-shade]"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.34)
          // II — the statement
          .fromTo(
            q("[data-film-line] > span"),
            { yPercent: 115 },
            { yPercent: 0, duration: 0.14, stagger: 0.04, ease: "power3.out" },
            0.42,
          )
          .fromTo(q("[data-film-sub]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.52)
          .to(q("[data-film-media]"), { scale: 1.08, duration: 0.55 }, 0.45)
          // III — letterbox out
          .to(q("[data-film-line] > span"), { yPercent: -115, duration: 0.1, stagger: 0.03, ease: "power2.in" }, 0.8)
          .to(q("[data-film-sub]"), { autoAlpha: 0, duration: 0.06 }, 0.8)
          .fromTo(
            q("[data-film-screen]"),
            { clipPath: "inset(0% 0% 0% 0%)" },
            { clipPath: "inset(50% 0% 50% 0%)", duration: 0.16, ease: "power3.inOut" },
            0.84,
          )
          .to(q("[data-film-hud]"), { autoAlpha: 0, duration: 0.06 }, 0.9);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-labelledby="film-title">
      {children}
    </section>
  );
}
