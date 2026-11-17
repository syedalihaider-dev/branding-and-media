import Image from "next/image";
import { photos } from "@/content/editorialImages";
import { HeroActions } from "../HeroActions";
import { GhostHeroMotion } from "./GhostHeroMotion";
import styles from "./GhostHero.module.css";

/**
 * Ghostwriting — opening. Out of the dark, the words surface as if ink were
 * spreading through them: "Your story. Your voice." The third line, "Our
 * craft.", is only an outline — present, but barely — and as you scroll it
 * dissolves entirely. The signature that remains is yours.
 */
export function GhostHero() {
  return (
    <GhostHeroMotion className={styles.hero}>
      <div className={styles.media} data-gh-media aria-hidden="true">
        <Image src={photos.ghostNib.src} alt="" fill priority sizes="(min-width: 900px) 62vw, 100vw" quality={82} className={styles.img} />
        <span className={styles.vignette} />
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-gh-fade>
          <p className="label kicker">
            <span className="kicker-index">04</span> Editorial &amp; Publishing Services
          </p>
          <p className="label">Books · Memoirs · Articles · Speeches</p>
        </div>

        <h1 className={styles.title} id="ghost-hero-title">
          <span className={`label ${styles.eyebrow}`} data-gh-fade>
            Ghostwriting
          </span>
          <span className={styles.line} data-gh-ink>
            Your story.
          </span>
          <span className={styles.line} data-gh-ink>
            Your voice.
          </span>
          <span className={`${styles.line} ${styles.ghost}`} data-gh-ghost>
            <span data-gh-ghost-in>Our craft.</span>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.sign} aria-hidden="true">
            <span className="label">Written by</span>
            <span className={styles.signLine} data-gh-signline />
            <span className={styles.signName} data-gh-sign>
              You.
            </span>
          </p>
          <div className={styles.copy} data-gh-fade>
            <p className={styles.lead}>
              Books, memoirs, articles and speeches written in your voice, from your stories — with your name on the
              cover and ours nowhere at all.
            </p>
            <HeroActions label="Begin in confidence" />
          </div>
        </div>
      </div>
    </GhostHeroMotion>
  );
}
