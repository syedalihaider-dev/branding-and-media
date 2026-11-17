"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pin, translate the track, and give each frame a scale/dim
 * curve keyed to its position (keyframes over its own pass through the
 * viewport via containerAnimation) — a carousel driven by scroll.
 */
export function SocialFormatsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        if (!ctx.conditions.desktop) {
          gsap.from(q("[data-sf-item]"), {
            x: 80,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: q("[data-sf-track]")[0], start: "top 85%" },
          });
          return;
        }

        const track = q<HTMLElement>("[data-sf-track]")[0];
        const viewport = q<HTMLElement>("[data-sf-viewport]")[0];
        const distance = () => track.scrollWidth - viewport.clientWidth + viewport.clientWidth * 0.3;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance() * 1.1}`,
            pin: q("[data-sf-pin]")[0],
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        q<HTMLElement>("[data-sf-item]").forEach((item) => {
          gsap.fromTo(
            item.querySelector("[data-sf-frame]"),
            { scale: 0.82, filter: "saturate(0.3) brightness(0.7)" },
            {
              keyframes: {
                "0%": { scale: 0.82, filter: "saturate(0.3) brightness(0.7)" },
                "50%": { scale: 1.06, filter: "saturate(1) brightness(1)" },
                "100%": { scale: 0.82, filter: "saturate(0.3) brightness(0.7)" },
              },
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={className}
      data-svc-tone="ink-2"
      data-theme="dark"
      aria-labelledby="social-formats-title"
    >
      {children}
    </section>
  );
}
