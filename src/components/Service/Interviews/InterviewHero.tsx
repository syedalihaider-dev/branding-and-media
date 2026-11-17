import Image from "next/image";
import { InterviewHeroMotion } from "./InterviewHeroMotion";
import styles from "./InterviewHero.module.css";

const METER = 14;

/**
 * Interviews — opening. The page is a camera viewfinder: focus pulls in on
 * the speaker, the corners lock, the timecode runs and a lower-third
 * names the guest. Broadcast grammar, set with editorial restraint.
 */
export function InterviewHero() {
  return (
    <InterviewHeroMotion className={styles.hero}>
      <div className={styles.media} data-ih-media aria-hidden="true">
        <Image
          src="/media/stills/storyteller.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={72}
          className={styles.img}
        />
        <span className={styles.grade} />
      </div>

      {/* Viewfinder chrome */}
      <div className={styles.finder} aria-hidden="true">
        <span className={styles.corner} data-ih-corner="tl" />
        <span className={styles.corner} data-ih-corner="tr" />
        <span className={styles.corner} data-ih-corner="bl" />
        <span className={styles.corner} data-ih-corner="br" />
        <span className={styles.safe} data-ih-safe />
        <span className={styles.focus} data-ih-focus />

        <div className={styles.osd} data-ih-fade>
          <span className={styles.rec}>
            <i /> Rec
          </span>
          <span className={styles.tc} data-ih-tc>
            00:00:00:00
          </span>
          <span className={styles.spec}>4K · 25p · ISO 800</span>
        </div>

        <div className={styles.meter} data-ih-fade>
          {["L", "R"].map((ch, c) => (
            <span key={ch} className={styles.channel}>
              <b>{ch}</b>
              <span className={styles.bars}>
                {Array.from({ length: METER }, (_, i) => (
                  <i key={i} style={{ "--i": i, "--c": c } as React.CSSProperties} />
                ))}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.lower} data-ih-lower aria-hidden="true">
        <span className={styles.lowerTag}>Live</span>
        <span className={styles.lowerBody}>
          <b>Your name here</b>
          <span>Founder · Author · Expert</span>
        </span>
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-ih-fade>
          <p className="label kicker">
            <span className="kicker-index">01</span> Brand Development &amp; Media Relations
          </p>
          <p className="label">Television · Podcasts · Talks · Tours</p>
        </div>

        <h1 className={styles.title} id="interview-hero-title">
          <span className={`label ${styles.eyebrow}`} data-ih-fade>
            Media Interviews &amp; Appearances
          </span>
          <span className={styles.line}>
            <span data-ih-line>Your voice,</span>
          </span>
          <span className={styles.line}>
            <span data-ih-line className="accent">
              on the record.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-ih-fade>
          <p className={styles.lead}>
            We put founders, executives, authors and experts in front of the audiences that matter — on television,
            podcasts and stages — and make sure they&rsquo;re ready when the light turns red.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className="label">Positioned</dt>
              <dd>An angle producers want</dd>
            </div>
            <div>
              <dt className="label">Prepared</dt>
              <dd>Media-trained on camera</dd>
            </div>
          </dl>
        </div>
      </div>
    </InterviewHeroMotion>
  );
}
