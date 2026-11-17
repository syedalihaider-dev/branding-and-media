import Image from "next/image";
import { PublicationsHeroMotion } from "./PublicationsHeroMotion";
import styles from "./PublicationsHero.module.css";

const letters = (s: string) =>
  s.split("").map((ch, i) => (
    <span key={i} data-pb-ch style={{ display: "inline-block" }}>
      {ch === " " ? " " : ch}
    </span>
  ));

/**
 * Publications — opening. A broadsheet front page in Branding & Media's
 * own hand: rules, folio, a headline set letter by letter as if by a
 * compositor, a black-and-white photograph and copy in columns.
 * On scroll the sheet tilts back and is laid down, like a paper on a desk.
 */
export function PublicationsHero() {
  return (
    <PublicationsHeroMotion className={styles.hero}>
      <div className={styles.sheet} data-pb-sheet>
        <div className={styles.folio} data-pb-fade>
          <p className="label kicker">
            <span className="kicker-index">02</span> Brand Development &amp; Media Relations
          </p>
          <p className={styles.mast}>Branding &amp; Media</p>
          <p className="label">Features · Bylines · Commentary</p>
        </div>
        <span className={styles.rule} data-pb-rule aria-hidden="true" />

        <h1 className={styles.title} id="publications-hero-title">
          <span className={`label ${styles.eyebrow}`} data-pb-fade>
            Media Publications
          </span>
          <span className="sr-only">Be the story they print.</span>
          <span className={styles.line} aria-hidden="true">
            {letters("Be the story")}
          </span>
          <span className={`${styles.line} ${styles.lineEnd} accent`} aria-hidden="true">
            {letters("they print.")}
          </span>
        </h1>

        <span className={styles.rule} data-pb-rule aria-hidden="true" />

        <div className={styles.grid}>
          <p className={styles.stand} data-pb-fade>
            Coverage you can&rsquo;t buy, earned with stories editors want to run.
          </p>

          <figure className={styles.photo} data-pb-photo>
            <div className={styles.photoInner} data-pb-img>
              <Image
                src="/media/editorial/stairs.webp"
                alt="Looking down a spiral of staircases and walkways in a modern atrium, figures on every level"
                fill
                priority
                sizes="(min-width: 1100px) 38vw, 92vw"
                quality={72}
              />
            </div>
            <figcaption className={styles.caption}>Fig. 1 — Every level of an organisation has a story worth telling.</figcaption>
          </figure>

          <div className={styles.copy} data-pb-fade>
            <span className={styles.colRule} data-pb-col aria-hidden="true" />
            <p className={styles.body}>
              We find the story in your business, your expertise or your book; write it the way editors need to
              receive it; and pitch it to the desks that cover your world — features, bylined articles, expert
              commentary and digital publications.
            </p>
            <dl className={styles.facts}>
              <div>
                <dt className="label">For</dt>
                <dd>Brands, executives, authors &amp; experts</dd>
              </div>
              <div>
                <dt className="label">Approach</dt>
                <dd>Editorial first, never advertorial</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PublicationsHeroMotion>
  );
}
