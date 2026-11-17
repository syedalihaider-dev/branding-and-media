import { copyDrafts, copyFinal } from "@/content/services/copywriting";
import { photos } from "@/content/editorialImages";
import { HeroActions } from "../HeroActions";
import { CopyHeroMotion } from "./CopyHeroMotion";
import styles from "./CopyHero.module.css";

/**
 * Copywriting — opening. The headline is an editor's decision made in
 * front of you: "Copy that…" tries three verbs, strikes each in red and
 * settles on the one that sells. Beneath, a single word fills the width —
 * set in the photograph of a typewriter's typebars (type as image, image
 * as type).
 */
export function CopyHero() {
  return (
    <CopyHeroMotion className={styles.hero}>
      <div className={styles.top} data-ch-fade>
        <p className="label kicker">
          <span className="kicker-index">01</span> Editorial &amp; Publishing Services
        </p>
        <p className="label">Ads · Web · Press · Scripts · Email · Taglines</p>
      </div>

      <div className={styles.body}>
        <h1 className={styles.title} id="copy-hero-title">
          <span className={`label ${styles.eyebrow}`} data-ch-fade>
            Media Copywriting
          </span>
          <span className="sr-only">Copy that {copyFinal}</span>
          <span className={styles.line} aria-hidden="true">
            <span data-ch-line>Copy that</span>
          </span>
          <span className={`${styles.line} ${styles.slot}`} aria-hidden="true">
            {copyDrafts.map((d) => (
              <span key={d} className={styles.draft} data-ch-draft>
                {d}
                <i className={styles.strike} data-ch-strike />
              </span>
            ))}
            <span className={`${styles.final} accent`} data-ch-final>
              {copyFinal}
            </span>
          </span>
        </h1>

        <div className={styles.side} data-ch-fade>
          <p className={styles.lead}>
            Ads, web pages, press releases, scripts and taglines — written around one clear message, in a voice your
            audience recognises as yours.
          </p>
          <HeroActions tone="light" />
        </div>
      </div>

      <p
        className={styles.word}
        aria-hidden="true"
        data-ch-word
        style={{ backgroundImage: `url(${photos.copyTypebars.src})` }}
      >
        Words
      </p>
    </CopyHeroMotion>
  );
}
