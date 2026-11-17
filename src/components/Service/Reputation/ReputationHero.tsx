import Image from "next/image";
import { ReputationHeroMotion } from "./ReputationHeroMotion";
import styles from "./ReputationHero.module.css";

/**
 * Reputation — opening. The headline sits on a horizon with its own
 * reflection beneath: the reflection is perception — rippled, unreliable.
 * As you scroll the water stills and the reflection sharpens: reputation,
 * brought under quiet control. A pointer disturbs the surface briefly.
 */
export function ReputationHero() {
  const lines = (
    <>
      <span className={styles.line}>
        <span data-rh-line>What they find</span>
      </span>
      <span className={styles.line}>
        <span data-rh-line className="accent">
          when they search you.
        </span>
      </span>
    </>
  );

  return (
    <ReputationHeroMotion className={styles.hero}>
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <filter id="rh-ripple" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="2" seed="7" result="noise" data-rh-noise />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G" data-rh-disp />
        </filter>
      </svg>

      <div className={styles.media} data-rh-media aria-hidden="true">
        <Image
          src="/media/stills/reflection.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={72}
          className={styles.img}
        />
        <span className={styles.grade} />
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-rh-fade>
          <p className="label kicker">
            <span className="kicker-index">03</span> Brand Development &amp; Media Relations
          </p>
          <p className="label">Audit · Monitor · Respond · Build</p>
        </div>

        <div className={styles.stage}>
          <h1 className={styles.title} id="reputation-hero-title">
            <span className={`label ${styles.eyebrow}`} data-rh-fade>
              Online Reputation Management
            </span>
            {lines}
          </h1>
          <div className={styles.horizon} aria-hidden="true">
            <span className={styles.horizonLine} data-rh-horizon />
            <span className={`label ${styles.tagUp}`} data-rh-fade>
              ↑ Who you are
            </span>
            <span className={`label ${styles.tagDown}`} data-rh-fade>
              ↓ What they see
            </span>
          </div>
          <div className={styles.reflection} aria-hidden="true" data-rh-reflect>
            <span className={styles.reflectInner}>
              <span className={styles.title}>{lines}</span>
            </span>
          </div>
        </div>

        <div className={styles.foot} data-rh-fade>
          <p className={styles.lead}>
            Your reputation is decided on the first page of search, long before the first meeting. We audit it, watch
            it, answer for it and build the presence that should come first — calmly, and for the long term.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className="label">For</dt>
              <dd>People &amp; companies</dd>
            </div>
            <div>
              <dt className="label">Approach</dt>
              <dd>Build, don&rsquo;t bury</dd>
            </div>
          </dl>
        </div>
      </div>
    </ReputationHeroMotion>
  );
}
