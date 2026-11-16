"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * About hero choreography.
 *  Desktop: the film is a full-bleed layer clipped to the small window in
 *  the headline. On load it wipes into the window; on scroll (pinned) the
 *  clip opens to the full frame while the type parts around it — a
 *  camera push through the headline into the work.
 *  Mobile: no pin. Lines rise on load; the film frame opens from an inset
 *  as it scrolls through the viewport.
 */
export function AboutHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add({ motion: MQ.motion, desktop: "(min-width: 1100px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = !!ctx.conditions.desktop;
        const pin = q<HTMLElement>("[data-ah-pin]")[0];
        const film = q<HTMLElement>("[data-ah-film]")[0];
        const media = q<HTMLElement>("[data-ah-media]")[0];
        const win = q<HTMLElement>("[data-ah-window]")[0];

        // Shared intro: the headline rises line by line.
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-ah-line]"), { yPercent: 112, duration: 1.4, stagger: 0.11 }, 0.1)
          .from(q("[data-ah-fade]"), { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.6);

        if (!desktop) {
          gsap.fromTo(
            film,
            { clipPath: "inset(14% 10% 14% 10%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: film, start: "top 95%", end: "center 55%", scrub: true },
            },
          );
          gsap.fromTo(
            media,
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: film, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          return;
        }

        // Clip the full-bleed film to the window's box, in px relative to the pin.
        const windowInset = () => {
          const p = pin.getBoundingClientRect();
          const r = win.getBoundingClientRect();
          const t = r.top - p.top;
          const l = r.left - p.left;
          const b = p.height - (r.bottom - p.top);
          const rt = p.width - (r.right - p.left);
          return `inset(${t}px ${rt}px ${b}px ${l}px)`;
        };

        gsap.set(film, { clipPath: windowInset() });
        intro.fromTo(
          film,
          { clipPath: () => windowInset().replace(/inset\(([\d.-]+)px/, (_m, t) => `inset(${parseFloat(t) + win.offsetHeight}px`) },
          { clipPath: () => windowInset(), duration: 1.3, ease: "expo.out" },
          0.55,
        );
        intro.from(media, { scale: 1.6, duration: 1.8, ease: "expo.out" }, 0.55);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.6}`,
            pin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          film,
          { clipPath: () => windowInset() },
          { clipPath: "inset(0px 0px 0px 0px)", duration: 1, ease: "power2.inOut", immediateRender: false },
          0,
        )
          .fromTo(media, { scale: 1.12 }, { scale: 1, duration: 1, immediateRender: false }, 0)
          .to(q('[data-ah-row="1"]'), { xPercent: -18, yPercent: -60, autoAlpha: 0, duration: 0.7 }, 0.05)
          .to(q('[data-ah-row="2"]'), { xPercent: 14, autoAlpha: 0, duration: 0.7 }, 0.08)
          .to(q('[data-ah-row="3"]'), { xPercent: 10, yPercent: 60, autoAlpha: 0, duration: 0.7 }, 0.1)
          .to(q("[data-ah-fade]"), { autoAlpha: 0, y: -20, duration: 0.4 }, 0)
          .fromTo(q("[data-ah-shade]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.7)
          .fromTo(
            q("[data-ah-filmline]"),
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0.85,
          )
          .to({}, { duration: 0.25 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="dark" aria-labelledby="about-title">
      {children}
    </section>
  );
}
