import Image from "next/image";
import { officeCount, site } from "@/content/site";
import { HeroMotion } from "./HeroMotion";
import { HeroVisual } from "./HeroVisual";
import styles from "./Hero.module.css";

const chars = (word: string, offset = 0) =>
  Array.from(word).map((c, i) => (
    <span key={i} className={styles.char} style={{ "--i": i + offset } as React.CSSProperties}>
      {c}
    </span>
  ));

/** Lightweight stills for phones / no-WebGL — same art direction, no GPU. */
const fallbackStrips = [
  { src: "/media/reel/collage-a.webp", alt: "", cls: styles.stripA },
  { src: "/media/reel/portrait.webp", alt: "", cls: styles.stripB },
  { src: "/media/reel/city.webp", alt: "", cls: styles.stripC },
];

export function Hero() {
  return (
    <HeroMotion className={styles.hero} id="top">
      <div className={styles.stage} data-hero-stage>
        <div className={styles.visual} data-hero-visual>
          <HeroVisual />
          <div className={styles.fallback} aria-hidden="true">
            {fallbackStrips.map((s, i) => (
              <div key={s.src} className={`${styles.strip} ${s.cls}`} data-hero-strip>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1280}
                  height={285}
                  sizes="90vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className={styles.shade} data-hero-shade />
        </div>

        <h1 className={styles.title}>
          <span className="sr-only">Branding &amp; Media</span>
          <span className={styles.lineA} data-hero-line="a" aria-hidden="true">
            <span className={styles.lineInner} data-hero-depth="-1">
              {chars("Branding")}
            </span>
          </span>
          <span className={styles.amp} data-hero-amp aria-hidden="true">
            <span className={styles.ampInner}>&amp;</span>
          </span>
          <span className={styles.lineB} data-hero-line="b" aria-hidden="true">
            <span className={styles.lineInner} data-hero-depth="1">
              {chars("Media", 4)}
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-hero-foot>
          <p className={styles.statement}>
            Turning people and businesses into <em className="serif italic">impactful brands</em>
            {" — "}powered by humans, ideas and data.
          </p>
          <div className={styles.meta}>
            <p className="label">{site.descriptor}</p>
            <p className="label">
              Dallas · New York · London · Dubai <span className={styles.plus}>+{officeCount - 4}</span>
            </p>
          </div>
          <div className={styles.cue} aria-hidden="true">
            <span className="label">Scroll</span>
            <span className={styles.cueLine} />
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}
