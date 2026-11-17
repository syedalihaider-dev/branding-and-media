"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const DESKTOP = 1440;
const PHONE = 390;

/**
 * The frame's width/height are tweened (layout, but contained to one small
 * subtree), while a readout maps its real width onto device pixels.
 * Desktop pins for the sequence; narrow screens scrub it in place.
 */
export function WebResponsiveMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const frame = q<HTMLElement>("[data-wr-frame]")[0];
        const widthEl = q<HTMLElement>("[data-wr-width]")[0];
        const deviceEl = q<HTMLElement>("[data-wr-device]")[0];
        const bench = frame.parentElement!;

        const readout = () => {
          const full = bench.clientWidth;
          const phone = full * 0.3;
          const t = gsap.utils.clamp(0, 1, (frame.offsetWidth - phone) / (full - phone));
          const px = Math.round(PHONE + t * (DESKTOP - PHONE));
          widthEl.textContent = String(px);
          deviceEl.textContent = px > 1024 ? "Desktop" : px > 600 ? "Tablet" : "Phone";
        };

        gsap.from(q("header > *"), {
          y: 36,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: ctx.conditions.desktop
            ? {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${window.innerHeight * 1.4}`,
                pin: q("[data-wr-pin]")[0],
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }
            : { trigger: frame, start: "top 70%", end: "bottom 30%", scrub: 0.6 },
          onUpdate: readout,
        });

        tl.to({}, { duration: 0.15 })
          .to(frame, { width: "62%", height: "100%", borderRadius: "1.4rem", duration: 1 })
          .to({}, { duration: 0.2 })
          .to(frame, { width: "30%", height: "100%", borderRadius: "2.2rem", duration: 1 })
          .to({}, { duration: 0.2 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={className}
      data-svc-tone="bone"
      data-theme="light"
      aria-labelledby="web-responsive-title"
    >
      {children}
    </section>
  );
}
