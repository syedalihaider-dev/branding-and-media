"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

declare global {
  interface Window {
    __bmPreloader?: boolean;
    __bmHeroMedia?: boolean;
  }
}

/** Never hold the visitor longer than this, whatever the network does. */
const HARD_CAP_MS = 4500;
const BLOCKED_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);

/** Bounding box of a run of text (not its block container). */
function textRect(el: Element) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect();
}

/**
 * Waits for what the opening frame actually needs — webfonts and the
 * hero's first media (WebGL textures or the first still) — then
 * hands off. Progress is real: each readiness signal lights more offices.
 */
function trackReadiness(onProgress: (p: number) => void) {
  const weights = { fonts: 0.4, media: 0.6 };
  const done = new Set<keyof typeof weights>();
  let resolve!: () => void;
  const ready = new Promise<void>((r) => (resolve = r));
  const mark = (k: keyof typeof weights) => {
    if (done.has(k)) return;
    done.add(k);
    const p = [...done].reduce((s, key) => s + weights[key], 0);
    onProgress(p);
    if (done.size === 2) resolve();
  };

  (document.fonts?.ready ?? Promise.resolve()).then(() => mark("fonts"));

  const onMedia = () => mark("media");
  window.addEventListener("bm:hero-media", onMedia, { once: true });
  // HeroVisual decides WebGL vs stills in its own effect — check next frame.
  const raf = requestAnimationFrame(function check() {
    const hero = document.getElementById("top");
    const mode = hero?.dataset.webgl;
    if (window.__bmHeroMedia) return onMedia();
    if (mode === "off" || !hero) {
      const img = hero?.querySelector<HTMLImageElement>("[data-hero-strip] img");
      if (!img || img.complete) return onMedia();
      img.decode().then(onMedia, onMedia);
      return;
    }
    if (mode !== "on") requestAnimationFrame(check);
  });

  const cap = setTimeout(resolve, Math.max(0, HARD_CAP_MS - performance.now()));
  return {
    ready,
    dispose: () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      window.removeEventListener("bm:hero-media", onMedia);
    },
  };
}

let mounted = false;

export function PreloaderMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const html = document.documentElement;
    if (!root || html.dataset.preloader !== "active") return;
    window.__bmPreloader = true;

    const repeat = html.hasAttribute("data-preloader-repeat");
    const q = gsap.utils.selector(root);
    const cities = q<HTMLElement>("[data-pl-city]");
    const words = q<HTMLElement>("[data-pl-word]");
    const amp = q<HTMLElement>("[data-pl-amp] > span")[0];

    // ── Hold the page still without touching overflow (no scrollbar jump) ──
    const block = (e: Event) => {
      if (e instanceof KeyboardEvent && !BLOCKED_KEYS.has(e.key)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", block, opts);
    const release = () => {
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", block, opts);
    };

    // ── Real progress → offices light up in order ──
    const progress = { v: 0 };
    let lit = 0;
    const paint = () => {
      const n = Math.round(progress.v * cities.length);
      for (; lit < n; lit++) cities[lit].setAttribute("data-on", "");
    };
    const toProgress = (p: number) =>
      new Promise<void>((r) =>
        gsap.to(progress, { v: p, duration: repeat || settled ? 0.3 : 0.7, ease: "power2.out", onUpdate: paint, onComplete: r, overwrite: true }),
      );
    // Once settled, late signals must not overwrite the final fill.
    let settled = false;
    const tracker = trackReadiness((p) => !settled && toProgress(p));

    let exit: gsap.core.Timeline | null = null;
    let sweep: gsap.core.Tween | null = null;
    let cancelled = false;

    // ── Act I is pure CSS: it starts at first paint, before hydration. Once
    //    the letters land, GSAP takes the stage and sends one light across. ──
    const charAnims = q("[data-pl-char]").flatMap((c) => c.getAnimations());
    const minHold = Promise.all(charAnims.map((an) => an.finished.catch(() => undefined))).then(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled) return;
          // Freeze every CSS entrance at its end state so GSAP owns the transforms.
          root.setAttribute("data-landed", "");
          words.forEach((w) => w.setAttribute("data-lit", ""));
          sweep = gsap.fromTo(
            words,
            { backgroundPosition: "100% 0" },
            { backgroundPosition: "0% 0", duration: repeat ? 0.7 : 1.1, ease: "power2.inOut", stagger: 0.1 },
          );
          gsap.delayedCall(repeat ? 0.1 : 0.4, resolve);
        }),
    );


    const finish = () => {
      html.dataset.preloader = "done";
      release();
      try {
        sessionStorage.setItem("bm:opened", "1");
      } catch {}
      window.dispatchEvent(new Event("bm:preloaded"));
    };

    // ── Act II: split the curtain, fly the words into the hero headline ──
    const runExit = () => {
      if (cancelled) return;
      const heroA = document.querySelector('[data-hero-line="a"] [data-hero-depth]');
      const heroB = document.querySelector('[data-hero-line="b"] [data-hero-depth]');
      const heroAmp = document.querySelector("[data-hero-amp] > span");
      const atTop = window.scrollY < 40 && heroA && heroB && heroAmp;

      html.dataset.preloader = "exit";
      exit = gsap.timeline({ onComplete: finish });
      exit
        .to(q("[data-pl-chrome]"), { opacity: 0, y: -12, duration: 0.5, ease: "power2.in" }, 0)
        .to(q("[data-pl-glow]"), { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0)
        .to(q("[data-pl-horizon]"), { scaleX: 0, opacity: 0, duration: 0.7, ease: "power3.in" }, 0)
        .to(q('[data-pl-panel="top"]'), { yPercent: -100, duration: 1.25, ease: "expo.inOut" }, 0.12)
        .to(q('[data-pl-panel="bottom"]'), { yPercent: 100, duration: 1.25, ease: "expo.inOut" }, 0.12);

      if (atTop) {
        gsap.set(q("[data-pl-line]"), { overflow: "visible" });
        gsap.set(amp, { transformOrigin: "0 0" });
        // FLIP: each preloader element travels to the measured rect of its
        // hero twin; at the end the real headline is revealed in place.
        const pairs: [HTMLElement, Element][] = [
          [words[0], heroA],
          [words[1], heroB],
          [amp, heroAmp],
        ];
        pairs.forEach(([from, to], i) => {
          const a = from === amp ? from.getBoundingClientRect() : textRect(from);
          const b = to === heroAmp ? to.getBoundingClientRect() : textRect(to);
          const s = b.width / a.width;
          exit!.to(
            from,
            {
              x: `+=${b.left - a.left}`,
              y: `+=${b.top - a.top}`,
              scale: s,
              duration: 1.35,
              ease: "expo.inOut",
            },
            0.08 + i * 0.03,
          );
        });
      } else {
        exit.to(q("[data-pl-mark]"), { opacity: 0, scale: 1.08, duration: 0.8, ease: "power2.in" }, 0);
      }
    };

    // The light is still travelling when the curtain parts.
    Promise.all([tracker.ready, minHold])
      .then(() => {
        settled = true;
        return toProgress(1);
      })
      .then(runExit);

    mounted = true;
    return () => {
      mounted = false;
      cancelled = true;
      tracker.dispose();
      sweep?.kill();
      exit?.kill();
      release();
      // Dev StrictMode remounts synchronously; only a real unmount (e.g. a
      // route change mid-opening) should release the hero.
      setTimeout(() => {
        if (!mounted && html.dataset.preloader !== "done") html.dataset.preloader = "done";
      }, 0);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true" data-preloader-root>
      {children}
    </div>
  );
}
