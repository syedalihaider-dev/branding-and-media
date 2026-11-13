"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Work — editorial spreads on a horizontal reel.
 * Why: projects should read like turning pages of a printed annual, not
 * browsing thumbnails. Desktop pins and pans sideways (each frame opens
 * like a shutter as it arrives); phones get a vertical sequence where
 * each frame unmasks upward — same idea, native to the thumb.
 */
export function WorkMotion({
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
      const q = gsap.utils.selector(ref);

      // Opener headline — shared by every layout.
      mm.add(MQ.motion, () => {
        gsap.from(q("[data-work-line] > span"), {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: q("[data-work-line]")[0], start: "top 85%" },
        });
      });

      // Desktop / tablet: horizontal pinned reel.
      mm.add(`${MQ.motion} and ${MQ.wide}`, () => {
        const pin = q("[data-work-pin]")[0] as HTMLElement;
        const track = q("[data-work-track]")[0] as HTMLElement;
        const distance = () => track.scrollWidth - window.innerWidth;

        const pan = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(q("[data-work-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        q<HTMLElement>("[data-work-spread]").forEach((spread) => {
          const sq = gsap.utils.selector(spread);
          const shared = { containerAnimation: pan, trigger: spread, scrub: true };

          // Shutter open + image settles from a slight overscale.
          gsap.fromTo(
            sq("[data-work-frame]"),
            { clipPath: "inset(8% 0% 8% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: { ...shared, start: "left 95%", end: "left 25%" },
            },
          );
          gsap.fromTo(
            sq("[data-work-img]"),
            { scale: 1.35, xPercent: 8 },
            {
              scale: 1,
              xPercent: -4,
              ease: "none",
              scrollTrigger: { ...shared, start: "left right", end: "right left" },
            },
          );
          // Index numeral drifts slower than the page — depth cue.
          gsap.fromTo(
            sq("[data-work-index]"),
            { xPercent: 60 },
            { xPercent: -40, ease: "none", scrollTrigger: { ...shared, start: "left right", end: "right left" } },
          );
          // Title wipes in from its baseline — never overlaps the copy below.
          gsap.fromTo(
            sq("[data-work-title]"),
            { clipPath: "inset(0% 0% 100% 0%)", y: 30 },
            {
              clipPath: "inset(-10% 0% -10% 0%)",
              y: 0,
              ease: "power3.out",
              scrollTrigger: { ...shared, start: "left 80%", end: "left 35%" },
            },
          );
          gsap.fromTo(
            sq("[data-work-backdrop]"),
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: "none", scrollTrigger: { ...shared, start: "left right", end: "left 30%" } },
          );
        });
      });

      // Phones: vertical sequence with upward unmask.
      mm.add(`${MQ.motion} and ${MQ.mobile}`, () => {
        q<HTMLElement>("[data-work-spread]").forEach((spread) => {
          const sq = gsap.utils.selector(spread);
          gsap.fromTo(
            sq("[data-work-frame]"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: spread, start: "top 85%", end: "top 30%", scrub: true },
            },
          );
          gsap.fromTo(
            sq("[data-work-img]"),
            { scale: 1.3 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: spread, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-labelledby="work-title">
      {children}
    </section>
  );
}
