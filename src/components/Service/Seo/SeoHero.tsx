import Image from "next/image";
import { seoQueries } from "@/content/services/seo";
import { SeoHeroMotion } from "./SeoHeroMotion";
import styles from "./SeoHero.module.css";

const chars = (text: string) =>
  Array.from(text).map((c, i) =>
    c === " " ? (
      <span key={i} className={styles.space} />
    ) : (
      <span key={i} className={styles.ch} data-sh-ch>
        {c}
      </span>
    ),
  );

/**
 * SEO — opening. A search line types the questions real people ask;
 * the headline answers them. The grotesk settles from expanded to
 * condensed as it loads (Archivo's width axis — type that "resolves"),
 * a lens magnifies, and a ranking rule marks the only position that counts.
 */
export function SeoHero() {
  return (
    <SeoHeroMotion className={styles.hero} queries={seoQueries}>
      <div className={styles.inner}>
        <div className={styles.top} data-sh-fade>
          <p className="label kicker">
            <span className="kicker-index">02</span> Digital Growth &amp; Marketing
          </p>
          <p className="label">Organic search · Technical · Content · Authority</p>
        </div>

        <div className={styles.search} data-sh-fade aria-hidden="true">
          <svg className={styles.glass} viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5 L21 21" />
          </svg>
          <span className={styles.query}>
            <span data-sh-query>{seoQueries[0]}</span>
            <span className={styles.caret} />
          </span>
          <span className={`label ${styles.enter}`}>Search ↵</span>
        </div>

        <h1 className={styles.title} id="seo-hero-title">
          <span className={`label ${styles.eyebrow}`} data-sh-fade>
            Search Engine Optimization
          </span>
          <span className="sr-only">Be the answer.</span>
          <span className={styles.row} aria-hidden="true">
            <span className={styles.line}>
              <span data-sh-line>{chars("Be the")}</span>
            </span>
          </span>
          <span className={`${styles.row} ${styles.rowEnd}`} aria-hidden="true">
            <span className={styles.line}>
              <span data-sh-line className="accent">
                answer.
              </span>
            </span>
          </span>
        </h1>

        <figure className={styles.lens} data-sh-lens aria-hidden="true">
          <div className={styles.lensInner} data-sh-lens-img>
            <Image
              src="/media/stills/lens.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1100px) 30vw, 70vw"
            />
          </div>
        </figure>

        <ol className={styles.ruler} aria-hidden="true" data-sh-fade>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} data-on={i === 0}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {i === 0 ? <em>You</em> : null}
            </li>
          ))}
        </ol>

        <div className={styles.foot} data-sh-fade>
          <p className={styles.lead}>
            People search for what they need, then trust what they find. We make sure what they find is you — through
            technical precision, content worth ranking and authority that compounds.
          </p>
          <p className={`label ${styles.note}`}>No shortcuts. No penalties. No guesswork.</p>
        </div>
      </div>
    </SeoHeroMotion>
  );
}
