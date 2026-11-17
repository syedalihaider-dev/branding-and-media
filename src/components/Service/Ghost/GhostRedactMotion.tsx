"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** The redaction bar is drawn by scroll; commitments deal in beneath. */
export function GhostRedactMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          q("[data-gr-bar]"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 55%", end: "top 15%", scrub: 0.5 } },
        );
        gsap.from(q("[data-gr-item]"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-gr-item]")[0], start: "top 88%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="oxblood" data-theme="dark" aria-labelledby="ghost-redact-title">
      {children}
    </section>
  );
}
