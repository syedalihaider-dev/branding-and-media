"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - "Copy that" rises; then each draft verb drops in, is struck through
 *   in red and lifts away — until the final word lands in the serif.
 * - The photographic word rises from below its baseline; on scroll the
 *   photograph pans inside the letters while the word tracks out.
 * Without motion the final word is simply there (the drafts stay hidden).
 */
export function CopyHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(q("[data-ch-line]"), { yPercent: 110, duration: 1.1 }, 0.1)
          .from(q("[data-ch-word]"), { yPercent: 40, autoAlpha: 0, duration: 1.8, ease: "expo.out" }, 0.2)
          .from(q("[data-ch-fade]"), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.5)
          .set(q("[data-ch-final]"), { autoAlpha: 0 }, 0);

        q<HTMLElement>("[data-ch-draft]").forEach((d, i) => {
          const at = 0.6 + i * 0.95;
          tl.fromTo(d, { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 0.45 }, at)
            .to(d.querySelector("[data-ch-strike]"), { scaleX: 1, duration: 0.3, ease: "power2.inOut" }, at + 0.45)
            .to(d, { yPercent: -100, autoAlpha: 0, duration: 0.35, ease: "power3.in" }, at + 0.8);
        });

        tl.fromTo(
          q("[data-ch-final]"),
          { yPercent: 100, autoAlpha: 1 },
          { yPercent: 0, duration: 0.9, ease: "expo.out" },
          0.6 + q("[data-ch-draft]").length * 0.95,
        );

        const out = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.fromTo(q("[data-ch-word]"), { backgroundPosition: "50% 20%" }, { backgroundPosition: "50% 80%", letterSpacing: "-0.02em", ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="bone" data-theme="light" aria-labelledby="copy-hero-title">
      {children}
    </section>
  );
}
