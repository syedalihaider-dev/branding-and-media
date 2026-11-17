"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { copyVoice } from "@/content/services/copywriting";
import { photos } from "@/content/editorialImages";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";
import styles from "./CopyVoice.module.css";

/**
 * Brand voice, demonstrated rather than described: one message written
 * three ways. Scroll (pinned on desktop) or tap a voice — the old line's
 * words fall away and the new one sets word by word.
 * The example product is illustrative.
 */
export function CopyVoice() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const voices = copyVoice.voices;

  // Word swap on change.
  useGSAP(
    () => {
      if (!window.matchMedia(MQ.motion).matches) return;
      gsap.fromTo(
        "[data-cv-word]",
        { yPercent: 110, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.04, ease: "power4.out" },
      );
    },
    { scope: ref, dependencies: [active] },
  );

  // Scroll drives the voice on desktop.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion || !ctx.conditions.desktop) return;
        const q = gsap.utils.selector(ref);
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * voices.length * 0.7}`,
          pin: q("[data-cv-pin]")[0],
          anticipatePin: 1,
          snap: { snapTo: (v) => (Math.round(v * voices.length - 0.5) + 0.5) / voices.length, duration: { min: 0.2, max: 0.5 } },
          onUpdate: (self) => setActive(Math.min(voices.length - 1, Math.floor(self.progress * voices.length))),
        });
        gsap.from(q("[data-cv-photo]"), {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const words = voices[active].line.split(" ");

  return (
    <section ref={ref} className={styles.voice} data-svc-tone="blush" data-theme="light" aria-labelledby="copy-voice-title">
      <div className={styles.pin} data-cv-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">03</span> Brand voice
          </p>
          <h2 className={styles.title} id="copy-voice-title">
            Same message. <span className="accent">Three voices.</span>
          </h2>
          <p className={styles.intro}>
            Voice is the difference between being understood and being remembered. We define yours — then write
            everything in it.
          </p>
        </header>

        <figure className={styles.photo} data-cv-photo>
          <Image src={photos.copyWoodtype.src} alt={photos.copyWoodtype.alt} fill sizes="(min-width: 1100px) 26vw, 92vw" quality={78} />
        </figure>

        <div className={styles.stage}>
          <p className={`label ${styles.brief}`}>
            The message — <span>{copyVoice.message}</span>
          </p>
          <p className={styles.line} aria-live="polite">
            {words.map((w, i) => (
              <span key={`${active}-${i}`} className={styles.mask}>
                <span data-cv-word>{w}</span>
              </span>
            ))}
          </p>
          <div className={styles.switch} role="group" aria-label="Choose a voice">
            {voices.map((v, i) => (
              <button
                key={v.name}
                type="button"
                className={styles.option}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <span className={styles.optNum}>{String(i + 1).padStart(2, "0")}</span>
                {v.name}
              </button>
            ))}
          </div>
          <p className={`label ${styles.note}`}>Demonstration copy</p>
        </div>
      </div>
    </section>
  );
}
