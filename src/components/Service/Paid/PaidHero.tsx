import Image from "next/image";
import { PaidHeroMotion } from "./PaidHeroMotion";
import styles from "./PaidHero.module.css";

/**
 * Paid — opening. A runner at full speed, toned in signal; a targeting
 * reticle follows the cursor (or locks on by itself on touch) with live
 * coordinates. The headline cuts in at speed. Precision and velocity in
 * one frame — the whole service in a single image.
 */
export function PaidHero() {
  return (
    <PaidHeroMotion className={styles.hero}>
      <div className={styles.media} data-ph-media aria-hidden="true">
        <Image
          src="/media/stills/arena.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className={styles.img}
        />
        <span className={styles.tone} />
        <span className={styles.streaks}>
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </span>
      </div>

      <div className={styles.reticle} data-ph-reticle aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="44" />
          <circle cx="60" cy="60" r="2.5" className={styles.dot} />
          <path d="M60 4 V26 M60 94 V116 M4 60 H26 M94 60 H116" />
        </svg>
        <span className={styles.coords}>
          <b>Your customer</b>
          <span data-ph-coords>x 0.62 · y 0.48</span>
        </span>
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-ph-fade>
          <p className="label kicker">
            <span className="kicker-index">04</span> Digital Growth &amp; Marketing
          </p>
          <p className="label">Search · Social · Display · Video · OOH</p>
        </div>

        <h1 className={styles.title} id="paid-hero-title">
          <span className={`label ${styles.eyebrow}`} data-ph-fade>
            Paid Advertising
          </span>
          <span className={styles.line} data-ph-row="1">
            <span data-ph-line>Every dollar,</span>
          </span>
          <span className={`${styles.line} ${styles.lineEnd}`} data-ph-row="2">
            <span data-ph-line className="accent">
              accountable.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-ph-fade>
          <p className={styles.lead}>
            Paid media is the fastest way to be seen — and the fastest way to waste a budget. We plan, create and
            optimize campaigns where every impression has a job and every result is tracked.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className="label">Optimized for</dt>
              <dd>Return, not reach</dd>
            </div>
            <div>
              <dt className="label">Reporting</dt>
              <dd>Plain English, every month</dd>
            </div>
          </dl>
        </div>
      </div>
    </PaidHeroMotion>
  );
}
