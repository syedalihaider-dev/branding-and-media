import { featuredPress } from "@/content/services/featured";
import { FeaturedPressMotion } from "./FeaturedPressMotion";
import styles from "./FeaturedPress.module.css";

/**
 * "As seen in" — the press list from the agency's own site, set as type
 * (never as borrowed logos) on a slowly turning drum. The name facing you
 * is lit; the rest recede into the dark. Sticky while the drum turns.
 */
export function FeaturedPress() {
  const n = featuredPress.length;
  return (
    <FeaturedPressMotion className={styles.press} style={{ "--n": n } as React.CSSProperties}>
      <div className={styles.sticky}>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">03</span> As seen in
          </p>
          <h2 className={styles.title} id="featured-press-title" data-fp-fade>
            In good <span className="accent">company.</span>
          </h2>
          <p className={styles.body} data-fp-fade>
            Outlets where Branding &amp; Media&rsquo;s work and clients have been seen. The next headline is the one we
            write with you.
          </p>
        </header>

        <div className={styles.viewport}>
          <ul className={styles.drum} data-fp-drum>
            {featuredPress.map((p, i) => (
              <li
                key={p}
                className={`${styles.name} ${i % 2 ? styles.serif : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                data-fp-name
              >
                {p}
              </li>
            ))}
          </ul>
          <span className={styles.frame} aria-hidden="true" />
        </div>
      </div>
    </FeaturedPressMotion>
  );
}
