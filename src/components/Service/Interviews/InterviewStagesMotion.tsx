"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pinned. Each segment changes channel — the next shot wipes down
 * behind a glowing scanline, its room name lights, the caption swaps.
 * Narrow: each shot opens from a horizontal slit as it enters (a set
 * switching on), the name slides in from the left.
 */
export function InterviewStagesMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("header > *"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        if (!ctx.conditions.desktop) {
          q<HTMLElement>("[data-is-item]").forEach((item) => {
            const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 80%" } });
            tl.from(item.querySelector("[data-is-name]"), { x: -40, autoAlpha: 0, duration: 0.9, ease: "power3.out" })
              .fromTo(
                item.querySelector("[data-is-screen]"),
                { clipPath: "inset(49.5% 0% 49.5% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" },
                0.1,
              )
              .from(item.querySelector("img"), { scale: 1.25, duration: 1.6, ease: "expo.out" }, 0.4)
              .from(item.querySelector("[data-is-body]"), { y: 24, autoAlpha: 0, duration: 0.8 }, 0.6);
          });
          return;
        }

        const pin = q<HTMLElement>("[data-is-pin]")[0];
        const names = q<HTMLElement>("[data-is-name]");
        const screens = q<HTMLElement>("[data-is-screen]");
        const bodies = q<HTMLElement>("[data-is-body]");
        const scan = q<HTMLElement>("[data-is-scan]")[0];
        const n = screens.length;

        // Park the scanline on the monitor's top edge.
        const place = () => {
          const p = pin.getBoundingClientRect();
          const s = screens[0].getBoundingClientRect();
          gsap.set(scan, { left: s.left - p.left, top: s.top - p.top, width: s.width });
        };
        const screenH = () => screens[0].offsetHeight;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (n - 1) * 0.85}`,
            pin,
            scrub: 0.6,
            snap: { snapTo: "labels", duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: place,
          },
        });
        place();
        tl.addLabel("c0");

        for (let i = 1; i < n; i++) {
          const at = i - 1 + 0.15;
          tl.to(screens[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, at)
            .fromTo(screens[i].querySelector("img"), { scale: 1.18 }, { scale: 1, duration: 0.85 }, at)
            .fromTo(scan, { y: 0, autoAlpha: 1 }, { y: screenH, duration: 0.6, ease: "power2.inOut", immediateRender: false }, at)
            .to(scan, { autoAlpha: 0, duration: 0.08 }, at + 0.6)
            .to(names[i - 1], { opacity: 0.22, x: 0, duration: 0.3 }, at)
            .fromTo(names[i], { opacity: 0.22, x: 0 }, { opacity: 1, x: 18, duration: 0.3, immediateRender: false }, at + 0.2)
            .to(bodies[i - 1], { autoAlpha: 0, y: -16, duration: 0.25 }, at)
            .fromTo(bodies[i], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, immediateRender: false }, at + 0.35)
            .addLabel(`c${i}`, i);
        }
        gsap.set(names[0], { x: 18 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink-2" data-theme="dark" aria-labelledby="interview-stages-title">
      {children}
    </section>
  );
}
