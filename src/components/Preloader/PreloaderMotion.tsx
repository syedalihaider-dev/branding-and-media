"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { FRAGMENTS, SCENES } from "./sequence";

declare global {
  interface Window {
    __bmPreloader?: boolean;
    __bmHeroMedia?: boolean;
  }
}

/** Never hold the visitor longer than this, whatever the network does. */
const HARD_CAP_MS = 4500;
const BLOCKED_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);

/**
 * Waits for what the opening frame actually needs — webfonts and the
 * hero's first media (WebGL textures or the first still). Progress is real:
 * each signal lights more of the agency's offices.
 */
function trackReadiness(onProgress: (p: number) => void) {
  const weights = { fonts: 0.4, media: 0.6 };
  const done = new Set<keyof typeof weights>();
  let resolve!: () => void;
  const ready = new Promise<void>((r) => (resolve = r));
  const mark = (k: keyof typeof weights) => {
    if (done.has(k)) return;
    done.add(k);
    onProgress([...done].reduce((s, key) => s + weights[key], 0));
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
  // The whole opening leaves the DOM once it has handed over to the hero.
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = ref.current;
    const html = document.documentElement;
    if (!root) return;
    if (html.dataset.preloader !== "active") {
      // Reduced motion / no-JS fallback / failsafe already fired.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGone(true);
      return;
    }
    window.__bmPreloader = true;
    mounted = true;

    const repeat = html.hasAttribute("data-preloader-repeat");
    const one = (sel: string) => root.querySelector<HTMLElement>(sel)!;
    const all = (sel: string, from: ParentNode = root) => [...from.querySelectorAll<HTMLElement>(sel)];

    const solid = one("[data-pl-solid]");
    const veil = one("[data-pl-veil]");
    const glow = one("[data-pl-glow]");
    const wipe = one("[data-pl-wipe]");
    const chrome = one("[data-pl-chrome]");
    const solidType = one('[data-pl-type="solid"]');
    const sLetters = all("[data-pl-letter]", solidType);
    const sAmp = solidType.querySelector<HTMLElement>("[data-pl-amp]")!;
    const frags = all("[data-pl-frag]");
    const cities = all("[data-pl-city]");
    const slateText = one("[data-pl-slate]");
    const slateIndex = one("[data-pl-slate-index]");

    const heroTitle = document.querySelector<HTMLElement>("#top h1");
    const heroChars = all("#top [data-hero-line] [data-hero-depth] > span", document);
    const heroAmp = document.querySelector<HTMLElement>("#top [data-hero-amp] > span");

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
    let settled = false;
    const paint = () => {
      const n = Math.round(progress.v * cities.length);
      for (; lit < n; lit++) cities[lit].setAttribute("data-on", "");
    };
    const toProgress = (p: number) =>
      new Promise<void>((r) =>
        gsap.to(progress, {
          v: p,
          duration: repeat || settled ? 0.3 : 0.7,
          ease: "power2.out",
          onUpdate: paint,
          onComplete: r,
          overwrite: true,
        }),
      );
    const tracker = trackReadiness((p) => !settled && toProgress(p));

    // ── Slate: 01 Idea → 02 Strategy → 03 Brand → 04 Impact ──
    const setSlate = (i: number) => {
      gsap.to(slateText, {
        yPercent: -110,
        duration: 0.22,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          slateText.textContent = SCENES[i];
          slateIndex.textContent = String(i + 1).padStart(2, "0");
          gsap.fromTo(slateText, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "expo.out" });
        },
      });
    };

    /**
     * Pin every replica glyph onto its twin in the hero headline, copying
     * the computed type metrics — the composition the sequence resolves to
     * IS the hero, to the pixel.
     */
    const place = () => {
      if (!heroTitle || !heroAmp || heroChars.length !== sLetters.length) return false;
      const cs = getComputedStyle(heroTitle);
      solidType.style.fontSize = cs.fontSize;
      solidType.style.lineHeight = cs.lineHeight;
      solidType.style.letterSpacing = cs.letterSpacing;
      heroChars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        sLetters[i].style.left = `${r.left}px`;
        sLetters[i].style.top = `${r.top}px`;
      });
      const ar = heroAmp.getBoundingClientRect();
      const acs = getComputedStyle(heroAmp);
      sAmp.style.left = `${ar.left}px`;
      sAmp.style.top = `${ar.top}px`;
      sAmp.style.fontSize = acs.fontSize;
      sAmp.style.lineHeight = acs.lineHeight;
      return true;
    };

    let tl: gsap.core.Timeline | null = null;
    let exit: gsap.core.Timeline | null = null;
    let cancelled = false;

    const finish = () => {
      html.dataset.preloader = "done";
      release();
      try {
        sessionStorage.setItem("bm:opened", "1");
      } catch {}
      window.dispatchEvent(new Event("bm:preloaded"));
      setGone(true);
    };

    // ── Scenes 01–03 ──
    const compose = () =>
      new Promise<void>((resolveComposed) => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        if (!place()) return resolveComposed();
        const rects = sLetters.map((l) => l.getBoundingClientRect());
        const fragAt = new Set<number>(repeat ? [] : FRAGMENTS.map((f) => f.index));
        const t = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl = t;

        // A slow camera settle through the whole build.
        t.fromTo(
          solidType,
          { rotationX: 14, rotationY: -9, z: -180 },
          { rotationX: 0, rotationY: 0, z: 0, duration: 1.7, ease: "power3.out" },
          0,
        );

        if (!repeat) {
          // 01 Idea — oversized crops drift in and cross (difference blend).
          FRAGMENTS.forEach((d, n) => {
            t.fromTo(
              frags[n],
              { x: d.from[0] * W, y: d.from[1] * H, rotation: d.rot[0], scale: 1, opacity: 1 },
              { x: d.to[0] * W, y: d.to[1] * H, rotation: d.rot[1], duration: 1.25, ease: "power3.out" },
              n * 0.07,
            );
          });
          t.call(setSlate, [1], 0.85);

          // 02 Strategy — the camera pulls back; crops land on their letters,
          // scaling *down* so the glyphs stay sharp, then hand over.
          FRAGMENTS.forEach((d, n) => {
            const r = rects[d.index];
            const at = 0.85 + n * 0.06;
            t.to(
              frags[n],
              {
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                rotation: 0,
                scale: r.height / frags[n].offsetHeight,
                duration: 0.95,
                ease: "expo.inOut",
              },
              at,
            )
              .to(sLetters[d.index], { opacity: 1, duration: 0.1, ease: "none" }, at + 0.84)
              .to(frags[n], { opacity: 0, duration: 0.1, ease: "none" }, at + 0.86);
          });
        }

        // …while the rest of BRANDING arrives from deep space.
        sLetters
          .slice(0, 8)
          .filter((_, i) => !fragAt.has(i))
          .forEach((l, k) => {
            const s = k % 2 ? 1 : -1;
            t.fromTo(
              l,
              { opacity: 0, z: -1700, rotationY: 62 * s, rotationX: -22 * s, yPercent: 32 * s },
              { opacity: 1, z: 0, rotationY: 0, rotationX: 0, yPercent: 0, duration: 1.1 },
              (repeat ? 0.05 : 0.95) + k * 0.06,
            );
          });

        // 03 Brand — the ampersand turns out of depth, MEDIA follows.
        const s3 = repeat ? 0.35 : 1.45;
        t.call(setSlate, [2], s3)
          .to(glow, { opacity: 1, duration: 1.2, ease: "power2.out" }, s3 - 0.15)
          .fromTo(
            sAmp,
            { opacity: 0, z: -2600, rotationY: -78, rotation: -36, xPercent: -40 },
            { opacity: 1, z: 0, rotationY: 0, rotation: 0, xPercent: 0, duration: 1.15 },
            s3,
          )
          .fromTo(
            sLetters.slice(8),
            { opacity: 0, z: -1300, x: W * 0.18, rotationY: -55 },
            { opacity: 1, z: 0, x: 0, rotationY: 0, duration: 1.0, stagger: 0.05 },
            s3 + 0.1,
          )
          .call(resolveComposed, undefined, s3 + 0.8);

        if (repeat) t.timeScale(1.5);
      });

    // ── Scene 04 — Impact: the letters become windows, the dark lifts ──
    const reveal = () => {
      if (cancelled) return;
      html.dataset.preloader = "exit";
      setSlate(3);
      const ex = gsap.timeline({ onComplete: finish });
      exit = ex;
      const lift = () => {
        html.dataset.preloader = "reveal";
        release();
      };

      if (window.scrollY > 40 || !place()) {
        // Restored mid-page (or no hero): a quiet fade is the honest choice.
        ex.add(lift, 0).to(solid, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0);
        return;
      }

      // The line's position over time, so each glyph ignites as it's crossed.
      const W = window.innerWidth;
      const T0 = 0.12;
      const D = 0.85;
      const ease = gsap.parseEase("power3.inOut");
      const crossedAt = (x: number) => {
        let lo = 0;
        let hi = 1;
        for (let i = 0; i < 18; i++) {
          const mid = (lo + hi) / 2;
          if (ease(mid) * W < x) lo = mid;
          else hi = mid;
        }
        return T0 + lo * D;
      };

      ex.to(chrome, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0)
        .to(glow, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 0)
        .set(wipe, { opacity: 1 }, T0)
        .fromTo(veil, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)", duration: D, ease: "power3.inOut" }, T0)
        .fromTo(wipe, { x: 0 }, { x: W + 2, duration: D, ease: "power3.inOut" }, T0)
        .set(wipe, { opacity: 0 }, T0 + D);
      [...sLetters, sAmp].forEach((el) => {
        const r = el.getBoundingClientRect();
        const at = crossedAt(r.left + r.width * 0.5);
        const rest = getComputedStyle(el).color;
        ex.to(el, { color: el === sAmp ? "#fff3e6" : "#ff4a1c", duration: 0.06, ease: "none" }, at).to(
          el,
          { color: rest, duration: 0.7, ease: "power2.out" },
          at + 0.08,
        );
      });
      // The replica now sits exactly on the real headline: swap and leave.
      ex.add(lift, T0 + D + 0.05).add(() => {}, T0 + D + 0.9);
      if (repeat) ex.timeScale(1.3);
    };

    // Type metrics must be final before anything is measured.
    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 1500)),
    ]);
    fontsReady
      .then(() => (cancelled ? undefined : compose()))
      .then(() => tracker.ready)
      .then(() => {
        settled = true;
        return toProgress(1);
      })
      .then(reveal);

    return () => {
      mounted = false;
      cancelled = true;
      tracker.dispose();
      tl?.kill();
      exit?.kill();
      release();
      // Dev StrictMode remounts synchronously; only a real unmount (route
      // change mid-opening) should release the hero.
      setTimeout(() => {
        if (!mounted && html.dataset.preloader !== "done") html.dataset.preloader = "done";
      }, 0);
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={ref} className={className} aria-hidden="true" data-preloader-root>
      {children}
    </div>
  );
}
