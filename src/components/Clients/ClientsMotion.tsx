"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { galleryState, journey } from "./galleryState";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Gallery choreography. One pinned, scrubbed trigger writes the camera's
 * journey position (galleryState.u) for the WebGL scene and swaps the HUD
 * panel for whichever client is in front of you — DOM writes only, no
 * React state while scrolling.
 */
export function ClientsMotion({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current!;
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(section);

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        const on = !!ctx.conditions?.motion && supportsWebGL();
        section.dataset.webgl = on ? "on" : "off";
        if (!on) return;
        const mobile = !!ctx.conditions?.mobile;

        const stations = q<HTMLElement>("[data-station]");
        const ticks = q<HTMLElement>("[data-tick]");
        const count = stations.length;
        const intro = q("[data-gallery-intro]")[0];
        const finale = q("[data-gallery-finale]")[0];
        const progressBar = q("[data-gallery-progress]")[0];

        gsap.set(stations, { autoAlpha: 0 });
        gsap.set(finale, { autoAlpha: 0 });

        const show = (el: HTMLElement) => {
          gsap.killTweensOf(el);
          gsap.set(el, { autoAlpha: 1 });
          const name = el.querySelectorAll("[data-hud-name]");
          const rest = el.querySelectorAll("[data-hud]");
          gsap.fromTo(name, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "expo.out", overwrite: true });
          gsap.fromTo(
            rest,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.12, ease: "power3.out", overwrite: true },
          );
        };
        const hide = (el: HTMLElement) => {
          gsap.to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.in", overwrite: true });
        };

        let current = -2; // -1 intro, count finale, -2 nothing yet
        const setPanel = (next: number) => {
          if (next === current) return;
          const prev = current;
          current = next;
          if (prev >= 0 && prev < count) hide(stations[prev]);
          if (prev === -1) gsap.to(intro, { autoAlpha: 0, y: -24, duration: 0.5, ease: "power2.in", overwrite: true });
          if (prev === count) gsap.to(finale, { autoAlpha: 0, duration: 0.4, overwrite: true });

          if (next === -1) gsap.to(intro, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
          else if (next === count) {
            gsap.set(finale, { autoAlpha: 1 });
            gsap.fromTo(
              finale.querySelectorAll("[data-finale-item]"),
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true },
            );
          } else if (next >= 0) show(stations[next]);
          ticks.forEach((t, i) => t.toggleAttribute("data-on", i === next));
        };

        gsap.fromTo(
          q("[data-intro-line]"),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * ((count + 1) * (mobile ? 0.62 : 0.75) + 0.6)}`,
            pin: q("[data-gallery-stage]")[0],
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const u = journey(self.progress, count);
              galleryState.u = u;
              gsap.set(progressBar, { scaleX: self.progress });
              // Which panel belongs on screen?
              // (-3 = between stations: the stage clears for the glide)
              let next = -3;
              if (u < 0.55) next = -1;
              else if (u > count + 0.5) next = count;
              else {
                const i = Math.round(u - 1);
                if (Math.abs(u - 1 - i) < 0.3) next = i;
              }
              setPanel(next);
            },
            onLeaveBack: () => {
              galleryState.u = 0;
              setPanel(-1);
            },
          },
        });
        setPanel(-1);

        return () => {
          galleryState.u = 0;
          delete section.dataset.webgl;
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-labelledby="clients-title">
      {children}
    </section>
  );
}
