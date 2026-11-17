"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pinned. One timeline zooms the specimen page through four
 * framings — page, paragraph, sentence, comma — computing each framing from
 * the live layout (so it survives resizes). The level list follows along.
 * Narrow: no zoom; the page settles in, the list reveals.
 */
export function BookLevelsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        if (!ctx.conditions.desktop) {
          gsap.from(q("[data-bl-page]"), {
            y: 60,
            rotate: -2,
            autoAlpha: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: q("[data-bl-page]")[0], start: "top 85%" },
          });
          return;
        }

        const win = q<HTMLElement>("[data-bl-window]")[0];
        const page = q<HTMLElement>("[data-bl-page]")[0];
        const items = q<HTMLElement>("[data-bl-item]");
        const bracket = page.querySelector<HTMLElement>("[data-bl-bracket]")!;
        const names = ["page", "paragraph", "sentence", "comma"];

        // Geometry of each target in page coordinates (page unscaled).
        const box = (name: string) => {
          if (name === "page") return { x: 0, y: 0, w: page.offsetWidth, h: page.offsetHeight };
          const el = page.querySelector<HTMLElement>(`[data-bl-target="${name}"]`)!;
          const pr = page.getBoundingClientRect();
          const er = el.getBoundingClientRect();
          const s = pr.width / page.offsetWidth; // current scale
          return { x: (er.left - pr.left) / s, y: (er.top - pr.top) / s, w: er.width / s, h: er.height / s };
        };
        const fit = (name: string) => {
          const b = box(name);
          const W = win.clientWidth;
          const H = win.clientHeight;
          const k = name === "page" ? (H * 0.9) / b.h : name === "comma" ? (H * 0.32) / Math.max(b.h, 1) : (W * 0.82) / b.w;
          return { scale: k, x: W / 2 - (b.x + b.w / 2) * k, y: H / 2 - (b.y + b.h / 2) * k };
        };

        // Measure everything once per refresh, unscaled.
        let frames = names.map(() => ({ scale: 1, x: 0, y: 0 }));
        const measure = () => {
          gsap.set(page, { scale: 1, x: 0, y: 0 });
          frames = names.map(fit);
          const para = box("paragraph");
          gsap.set(bracket, { top: para.y, height: para.h });
        };
        measure();

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 3}`,
            pin: q("[data-bl-pin]")[0],
            scrub: 0.8,
            snap: { snapTo: "labels", duration: { min: 0.25, max: 0.7 } },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
            onUpdate: (self) => {
              const a = Math.round(self.progress * 3);
              items.forEach((it, i) => it.toggleAttribute("data-dim", i !== a));
            },
          },
        });

        tl.fromTo(page, { scale: () => frames[0].scale, x: () => frames[0].x, y: () => frames[0].y }, { scale: () => frames[0].scale, duration: 0.001 })
          .addLabel("l0");
        for (let i = 1; i < 4; i++) {
          tl.to(page, { scale: () => frames[i].scale, x: () => frames[i].x, y: () => frames[i].y }).addLabel(`l${i}`);
        }
        tl.to(bracket, { opacity: 1, duration: 0.3 }, 0.6).to(bracket, { opacity: 0, duration: 0.3 }, 1.6);
        items.forEach((it, i) => it.toggleAttribute("data-dim", i !== 0));
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="bone" data-theme="light" aria-labelledby="book-levels-title">
      {children}
    </section>
  );
}
