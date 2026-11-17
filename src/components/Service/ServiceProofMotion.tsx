"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Spreads: the frame opens from a narrow slit (clip-path) while the image
 * settles from a slight zoom, then drifts on scroll (parallax).
 * Case files: the outcome line is underlined by a drawn rule.
 */
export function ServiceProofMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.motion, () => {
        gsap.from(q("[data-sp-title] [data-w]"), {
          yPercent: 70,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        q<HTMLElement>("[data-sp-frame]").forEach((frame) => {
          const img = frame.querySelector("[data-sp-img]");
          const meta = frame.parentElement?.querySelector("[data-sp-meta]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 80%" } });
          tl.fromTo(
            frame,
            { clipPath: "inset(48% 0% 48% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          ).from(img, { scale: 1.3, duration: 2, ease: "expo.out" }, 0.3);
          if (meta) {
            tl.from(meta.children, { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.6);
          }
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q<HTMLElement>("[data-sp-file]").forEach((file) => {
          gsap.from(file.children, {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: file, start: "top 75%" },
          });
          gsap.fromTo(
            file.querySelector("[data-sp-outcome]"),
            { backgroundSize: "0% 1px" },
            {
              backgroundSize: "100% 1px",
              duration: 1.6,
              ease: "expo.inOut",
              scrollTrigger: { trigger: file, start: "top 50%" },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
