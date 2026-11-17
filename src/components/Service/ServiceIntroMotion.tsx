"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Read-in: words ink from 12% to full as the statement passes through the
 * viewport (scrubbed — the reader sets the pace). Detail follows on enter.
 */
export function ServiceIntroMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          q("[data-w]"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: q("h2")[0], start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.from(q("[data-si-rule]"), {
          scaleX: 0,
          transformOrigin: "0 50%",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-si-rule]")[0], start: "top 90%" },
        });
        gsap.from(q("[data-si-fade]"), {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: q("[data-si-rule]")[0], start: "top 85%" },
        });
        gsap.from(q("[data-si-item]"), {
          x: -18,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.06,
          scrollTrigger: { trigger: q("[data-si-rule]")[0], start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
