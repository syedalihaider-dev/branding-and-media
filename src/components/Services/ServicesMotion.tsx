"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { services } from "@/content/site";
import { setHeaderTheme, type HeaderTheme } from "@/components/Header/headerTheme";

/**
 * Services — seven worlds in one pinned stage.
 * Why: each discipline is a different way of thinking, so each gets its
 * own entrance (curtain, burst, iris, wipe, diagonal, scan), its own type
 * personality and its own visual. One master timeline + one ScrollTrigger
 * keeps it deterministic, reversible and cheap.
 */

type Enter = { from: gsap.TweenVars; to: gsap.TweenVars };

const ENTRANCES: Record<string, Enter> = {
  strategy: { from: { clipPath: "inset(100% 0% 0% 0%)" }, to: { clipPath: "inset(0% 0% 0% 0%)" } },
  marketing: { from: { clipPath: "inset(50% 50% 50% 50%)" }, to: { clipPath: "inset(0% 0% 0% 0%)" } },
  media: { from: { clipPath: "circle(0% at 50% 50%)" }, to: { clipPath: "circle(75% at 50% 50%)" } },
  communications: { from: { clipPath: "inset(0% 100% 0% 0%)" }, to: { clipPath: "inset(0% 0% 0% 0%)" } },
  content: {
    from: { clipPath: "polygon(120% 0%, 120% 0%, 100% 100%, 100% 100%)" },
    to: { clipPath: "polygon(-20% 0%, 120% 0%, 100% 100%, -40% 100%)" },
  },
  technology: { from: { clipPath: "inset(0% 0% 100% 0%)" }, to: { clipPath: "inset(0% 0% 0% 0%)" } },
};

const THEMES: Record<string, HeaderTheme> = {
  branding: "dark",
  strategy: "light",
  marketing: "signal",
  media: "dark",
  communications: "light",
  content: "dark",
  technology: "dark",
};

/** Per-world character choreography. */
function charsIn(world: string): [gsap.TweenVars, gsap.TweenVars] {
  switch (world) {
    case "strategy":
      return [{ xPercent: -60, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.03, ease: "power4.out" }];
    case "marketing":
      return [
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, stagger: { each: 0.035, from: "random" }, ease: "back.out(2.2)" },
      ];
    case "media":
      return [
        { yPercent: -120, rotate: -12, autoAlpha: 0 },
        { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.03, ease: "power3.out" },
      ];
    case "communications":
      return [{ autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.035, ease: "steps(1)" }];
    case "content":
      return [
        { yPercent: (i: number) => (i % 2 ? 110 : -110) },
        { yPercent: 0, stagger: 0.03, ease: "power3.out" },
      ];
    case "technology":
      return [
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, stagger: { each: 0.03, from: "center" }, ease: "expo.out" },
      ];
    default:
      return [{ yPercent: 110 }, { yPercent: 0, stagger: 0.035, ease: "power4.out" }];
  }
}

/** Fit each giant word to its column without wrapping. */
function fitWords(root: HTMLElement, isMobile: boolean) {
  const els = root.querySelectorAll<HTMLElement>("[data-svc-fit]");
  els.forEach((el) => {
    const panel = el.closest<HTMLElement>("[data-svc-panel]")!;
    const maxW = panel.clientWidth * (isMobile ? 0.9 : 0.94);
    const maxH = window.innerHeight * (isMobile ? 0.16 : 0.3);
    el.style.fontSize = "100px";
    const w = el.scrollWidth || 1;
    const h = el.offsetHeight || 1;
    const size = Math.min((maxW / w) * 100, (maxH / h) * 100 * 0.86);
    el.style.fontSize = `${Math.floor(size)}px`;
  });
}

export function ServicesMotion({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const isMobile = !!ctx.conditions.mobile;
        const q = gsap.utils.selector(root);
        const pin = q("[data-svc-pin]")[0] as HTMLElement;
        const panels = q<HTMLElement>("[data-svc-panel]");
        const current = q("[data-svc-current]")[0] as HTMLElement;
        const hud = q("[data-svc-hud]")[0] as HTMLElement;
        const reel = q<HTMLVideoElement>("[data-reel]")[0];

        const fit = () => fitWords(root, isMobile);
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);

        const HOLD = 1.1;
        const ENTER = 1;
        const labels: number[] = [];
        let active = -1;

        const setActive = (i: number) => {
          if (i === active) return;
          const prev = active;
          active = i;
          current.textContent = String(i + 1).padStart(2, "0");
          setHeaderTheme(THEMES[services[i].id]);
          hud.dataset.theme = THEMES[services[i].id];
          if (services[i].id === "media") reel?.dispatchEvent(new Event("reel:play"));
          else if (prev >= 0 && services[prev].id === "media") reel?.dispatchEvent(new Event("reel:pause"));
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * (services.length - 0.4) * (isMobile ? 0.85 : 1.05)}`,
            pin,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => setActive(0),
            onEnterBack: () => {
              active = -1;
            },
            onLeave: () => reel?.dispatchEvent(new Event("reel:pause")),
            onLeaveBack: () => reel?.dispatchEvent(new Event("reel:pause")),
          },
        });

        // Active world follows the *scrubbed* timeline, not raw scroll, so the
        // HUD and header change exactly when the new world is on screen.
        tl.eventCallback("onUpdate", () => {
          const t = tl.time();
          let i = 0;
          for (let k = 0; k < labels.length; k++) if (t >= labels[k] - 0.35) i = k;
          setActive(i);
        });

        panels.forEach((panel, i) => {
          const world = services[i].id;
          const pq = gsap.utils.selector(panel);
          const chars = pq("[data-svc-char]");
          const info = pq("[data-svc-info] > *");
          const at = i === 0 ? 0 : labels[i - 1] + HOLD;
          labels.push(i === 0 ? 0 : at + ENTER * 0.6);

          // Panel entrance + push the previous world back in depth.
          if (i > 0) {
            const e = ENTRANCES[world];
            gsap.set(panel, e.from);
            tl.to(panel, { ...e.to, duration: ENTER, ease: "power2.inOut" }, at);
            tl.to(
              panels[i - 1].querySelector("[data-svc-inner]"),
              { scale: 0.92, yPercent: -4, autoAlpha: 0.25, duration: ENTER, ease: "power2.in" },
              at,
            );
          }

          const [from, to] = charsIn(world);
          gsap.set(chars, from);
          tl.to(chars, { ...to, duration: 0.7 }, at + (i === 0 ? 0 : ENTER * 0.45));
          gsap.set(info, { autoAlpha: 0, y: 24 });
          tl.to(info, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, at + ENTER * 0.6);

          // World-specific visual beats
          const span = HOLD + ENTER;
          switch (world) {
            case "branding": {
              const chipsEls = pq("[data-chip]");
              gsap.set(chipsEls, { rotate: 0, yPercent: 30, autoAlpha: 0 });
              tl.to(chipsEls, { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, at + 0.1);
              tl.to(chipsEls, { rotate: (k: number) => (k - 1) * 14, duration: span * 0.7, ease: "power2.inOut" }, at + 0.4);
              break;
            }
            case "strategy": {
              gsap.set(pq("[data-plot]"), { strokeDasharray: 1, strokeDashoffset: 1 });
              gsap.set(pq("[data-target]"), { scale: 0, transformOrigin: "50% 50%" });
              tl.to(pq("[data-plot]"), { strokeDashoffset: 0, duration: span * 0.6, ease: "power1.inOut" }, at + 0.4);
              tl.to(pq("[data-target]"), { scale: 1, duration: 0.4, ease: "back.out(3)" }, at + 0.4 + span * 0.5);
              break;
            }
            case "marketing": {
              gsap.set(pq("[data-ring]"), { scale: 0.2, autoAlpha: 0, transformOrigin: "50% 50%" });
              tl.to(pq("[data-ring]"), { scale: 1, autoAlpha: 1, stagger: 0.12, duration: 0.8, ease: "expo.out" }, at + 0.3);
              tl.fromTo(
                pq("[data-ring-text]"),
                { rotate: -40, transformOrigin: "200px 200px" },
                { rotate: 120, duration: span + HOLD, ease: "none" },
                at,
              );
              break;
            }
            case "media": {
              tl.fromTo(pq("[data-monitor]"), { scale: 0.7, rotate: -3 }, { scale: 1, rotate: 0, duration: span, ease: "power2.out" }, at);
              break;
            }
            case "communications": {
              const docs = pq("[data-doc]");
              gsap.set(docs, { yPercent: 60, rotateX: 50, autoAlpha: 0, transformPerspective: 900 });
              tl.to(
                docs,
                { yPercent: 0, rotateX: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7, ease: "power3.out" },
                at + 0.35,
              );
              tl.to(docs, { x: (k: number) => k * (isMobile ? 18 : 42), rotate: (k: number) => (k - 1) * 5, duration: span * 0.6 }, at + 1);
              break;
            }
            case "content": {
              tl.fromTo(pq('[data-stream="0"]'), { yPercent: 0 }, { yPercent: -50, duration: span + HOLD }, at);
              tl.fromTo(pq('[data-stream="1"]'), { yPercent: -50 }, { yPercent: 0, duration: span + HOLD }, at);
              break;
            }
            case "technology": {
              const wires = pq("[data-wire] > *");
              gsap.set(wires, { strokeDasharray: 1, strokeDashoffset: 1 });
              tl.to(wires, { strokeDashoffset: 0, stagger: 0.05, duration: 0.6, ease: "power2.inOut" }, at + 0.4);
              break;
            }
          }
        });

        // Tail hold so the final world settles before unpinning.
        tl.to({}, { duration: HOLD * 0.8 });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", fit);
          q<HTMLElement>("[data-svc-fit]").forEach((el) => (el.style.fontSize = ""));
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} aria-labelledby="services-title">
      {children}
    </section>
  );
}
