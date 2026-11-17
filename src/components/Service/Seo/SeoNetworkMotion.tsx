"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Scrubbed build: the core appears, spokes draw outward, subtopics land at
 * their ends, then the cross-links knit them together. The ring keeps a
 * slow pulse (CSS) once built.
 */
export function SeoNetworkMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(q("header > *"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: q("svg")[0], start: "top 80%", end: "center 45%", scrub: 0.8 },
        });
        tl.from(q("[data-sn-core]"), { scale: 0, autoAlpha: 0, duration: 0.4 })
          .fromTo(q("[data-sn-spoke]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.06, duration: 0.6 }, 0.2)
          .from(q("[data-sn-node]"), { scale: 0.4, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, 0.45)
          .fromTo(q("[data-sn-link]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.05, duration: 0.5 }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="seo-network-title">
      {children}
    </section>
  );
}
