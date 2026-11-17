import { Book } from "./Book";
import { KindleHeroMotion } from "./KindleHeroMotion";
import styles from "./KindleHero.module.css";

/**
 * Kindle & Book Marketing — opening. A hardback sits at an angle beside
 * the headline. Scrolling turns it to face you and opens the cover onto
 * its first page — the moment a browser becomes a reader.
 */
export function KindleHero() {
  return (
    <KindleHeroMotion className={styles.hero}>
      <div className={styles.pin} data-kh-pin>
        <div className={styles.top} data-kh-fade>
          <p className="label kicker">
            <span className="kicker-index">05</span> Digital Growth &amp; Marketing
          </p>
          <p className="label">Kindle · Amazon · Goodreads · Press · Podcasts</p>
        </div>

        <h1 className={styles.title} id="kindle-hero-title">
          <span className={`label ${styles.eyebrow}`} data-kh-fade>
            Kindle Management &amp; Book Marketing
          </span>
          <span className={styles.line}>
            <span data-kh-line>Every book</span>
          </span>
          <span className={styles.line}>
            <span data-kh-line>deserves its</span>
          </span>
          <span className={styles.line}>
            <span data-kh-line className="accent">
              readers.
            </span>
          </span>
        </h1>

        <div className={styles.stage} data-kh-stage aria-hidden="true">
          <div className={styles.turn} data-kh-turn>
            <Book className={styles.book} />
          </div>
          <span className={styles.shadow} data-kh-shadow />
        </div>

        <div className={styles.foot} data-kh-fade>
          <p className={styles.lead}>
            You wrote the book. We make sure it&rsquo;s found, chosen and talked about — on Kindle, on Amazon and
            everywhere readers decide what to read next.
          </p>
          <p className={`label ${styles.for}`}>For self-published &amp; traditionally published authors</p>
        </div>
      </div>
    </KindleHeroMotion>
  );
}
