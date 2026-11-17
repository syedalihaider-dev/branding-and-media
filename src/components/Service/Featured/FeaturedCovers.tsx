import Image from "next/image";
import { featuredFormats } from "@/content/services/featured";
import { pad } from "../Words";
import { FeaturedCoversMotion } from "./FeaturedCoversMotion";
import styles from "./FeaturedCovers.module.css";

/**
 * The formats of a feature, set as covers of our own design (no real
 * mastheads): each names a kind of placement, not a publication.
 * Desktop: pinned — the covers wait in depth and fly forward one at a
 * time, passing the camera as the next takes its place.
 * Touch: a swipeable strip. Reduced motion: a grid.
 */
export function FeaturedCovers() {
  const n = featuredFormats.length;
  return (
    <FeaturedCoversMotion className={styles.covers}>
      <div className={styles.pin} data-fc-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> The placements
          </p>
          <h2 className={styles.title} id="featured-covers-title" data-fc-fade>
            Not a line. <span className="accent">The page.</span>
          </h2>
          <p className={`label ${styles.count}`} aria-hidden="true" data-fc-fade>
            <span data-fc-count>01</span> / {pad(n)}
          </p>
        </header>

        <ol className={styles.stage}>
          {featuredFormats.map((f, i) => (
            <li key={f.format} className={styles.item} data-fc-item>
              <figure className={styles.cover} data-fc-cover>
                <Image src={f.still.src} alt={f.still.alt} fill sizes="(min-width: 1100px) 30vw, 72vw" quality={74} />
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.mast} aria-hidden="true">
                  {f.format.replace("The ", "")}
                </span>
                <span className={styles.issue} aria-hidden="true">
                  No. {pad(i + 1)} — Featured placement
                </span>
                <span className={styles.coverline} aria-hidden="true">
                  {f.line}
                </span>
              </figure>
              <div className={styles.info} data-fc-info>
                <p className="label">Format {pad(i + 1)}</p>
                <h3 className={styles.name}>{f.format}</h3>
                <p className={styles.body}>{f.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </FeaturedCoversMotion>
  );
}
