"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const BASE = 64; // resting width axis
const PEAK = 100; // width directly under the cursor
const RADIUS = 280; // px of influence

/**
 * Contact hero choreography.
 *  - load: letters rise per line, the scribble draws under "known."
 *  - pointer (fine, desktop): each glyph's width axis swells with
 *    proximity — lerped on the shared ticker, idle when settled
 *  - scroll: the hero is CSS-sticky; as the enquiry sheet slides over it
 *    the type recedes (scale + dim), like stepping back from a stage
 */
export function ContactHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(q("[data-ch-line] > *"), {
          yPercent: 115,
          duration: 1.3,
          stagger: { each: 0.025, from: "start" },
        })
          .fromTo(
            q("[data-ch-scribble]"),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
            0.9,
          )
          .from(q("[data-ch-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 0.5);

        gsap.to(q("[data-ch-inner]"), {
          scale: 0.9,
          autoAlpha: 0.25,
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      mm.add(`${MQ.motion} and ${MQ.desktop} and (pointer: fine)`, () => {
        const section = ref.current!;
        const glyphs = q<HTMLElement>("[data-ch]");
        const current = glyphs.map(() => BASE);
        const target = glyphs.map(() => BASE);
        let centres: { x: number; y: number }[] = [];
        let running = false;

        const measure = () => {
          centres = glyphs.map((g) => {
            const r = g.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          });
        };

        const tick = () => {
          let moving = false;
          glyphs.forEach((g, i) => {
            const d = target[i] - current[i];
            if (Math.abs(d) < 0.15) {
              if (current[i] !== target[i]) {
                current[i] = target[i];
                g.style.setProperty("--w", String(target[i]));
              }
              return;
            }
            moving = true;
            current[i] += d * 0.14;
            g.style.setProperty("--w", current[i].toFixed(1));
          });
          if (!moving) {
            gsap.ticker.remove(tick);
            running = false;
          }
        };
        const start = () => {
          if (running) return;
          running = true;
          gsap.ticker.add(tick);
        };

        const onEnter = () => measure();
        const onMove = (e: PointerEvent) => {
          if (!centres.length) measure();
          centres.forEach((c, i) => {
            const dist = Math.hypot(e.clientX - c.x, (e.clientY - c.y) * 1.4);
            const t = Math.max(0, 1 - dist / RADIUS);
            target[i] = BASE + (PEAK - BASE) * t * t * (3 - 2 * t);
          });
          start();
        };
        const onLeave = () => {
          target.fill(BASE);
          start();
        };
        // Glyphs move with the page; re-measure on the next pointer move.
        const onScroll = () => {
          centres = [];
        };

        section.addEventListener("pointerenter", onEnter);
        section.addEventListener("pointermove", onMove, { passive: true });
        section.addEventListener("pointerleave", onLeave);
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
          gsap.ticker.remove(tick);
          section.removeEventListener("pointerenter", onEnter);
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", onScroll);
          glyphs.forEach((g) => g.style.removeProperty("--w"));
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="dark" aria-labelledby="contact-hero-title">
      {children}
    </section>
  );
}
