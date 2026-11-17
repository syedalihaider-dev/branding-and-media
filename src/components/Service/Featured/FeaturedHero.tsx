import Image from "next/image";
import { FeaturedHeroMotion } from "./FeaturedHeroMotion";
import styles from "./FeaturedHero.module.css";

/**
 * Featured — opening. A dark house; one spotlight. The photograph is only
 * visible where the light falls, and the light finds its subject (or
 * follows your cursor). "Not mentioned." is struck through; "Featured."
 * takes the stage. Scrolling brings the house lights up.
 */
export function FeaturedHero() {
  return (
    <FeaturedHeroMotion className={styles.hero}>
      <div className={styles.house} aria-hidden="true" data-fh-house>
        <Image src="/media/stills/spotlight.webp" alt="" fill sizes="100vw" quality={40} className={styles.dim} />
      </div>
      <div className={styles.lit} aria-hidden="true" data-fh-lit>
        <div className={styles.litInner} data-fh-media>
          <Image
            src="/media/stills/spotlight.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={76}
            className={styles.img}
          />
        </div>
      </div>
      <span className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top} data-fh-fade>
          <p className="label kicker">
            <span className="kicker-index">04</span> Brand Development &amp; Media Relations
          </p>
          <p className="label">Profiles · Cover stories · Lists · Features</p>
        </div>

        <h1 className={styles.title} id="featured-hero-title">
          <span className={`label ${styles.eyebrow}`} data-fh-fade>
            Featured Media Placements
          </span>
          <span className={styles.not}>
            <span data-fh-not>Not mentioned.</span>
            <span className={styles.strike} data-fh-strike aria-hidden="true" />
          </span>
          <span className={styles.line}>
            <span className="accent" data-fh-line>
              Featured.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-fh-fade>
          <p className={styles.lead}>
            The profile, the cover story, the list, the feature — placements that give you the page rather than a
            line on it. We build the story worthy of the spotlight, and put you in it.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className="label">For</dt>
              <dd>Leaders, authors, brands</dd>
            </div>
            <div>
              <dt className="label">Standard</dt>
              <dd>Editorial, never paid-for</dd>
            </div>
          </dl>
        </div>
      </div>
    </FeaturedHeroMotion>
  );
}
