import Image from "next/image";
import { film } from "@/content/film";
import { socialFeed } from "@/content/services/social";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { SocialHeroMotion } from "./SocialHeroMotion";
import styles from "./SocialHero.module.css";

/**
 * Social — opening. Columns of vertical frames from Branding & Media
 * campaign films stream past in opposite directions (and run faster when
 * you scroll — the feed reacts to you). The headline sits in front like a
 * campaign line over its own content.
 */
export function SocialHero() {
  return (
    <SocialHeroMotion className={styles.hero}>
      <div className={styles.wall} aria-hidden="true" data-sh-wall>
        {socialFeed.map((col, ci) => (
          <div key={ci} className={styles.col} data-sh-col={ci}>
            <div className={styles.loop} data-sh-loop>
              {[0, 1].map((copy) =>
                col.map((item, i) => {
                  const withFilm = ci === 1 && i === 1 && copy === 0;
                  return (
                    <div key={`${copy}-${i}`} className={styles.card}>
                      {withFilm ? (
                        <AmbientVideo
                          className={styles.video}
                          sources={film.sources}
                          light={film.light}
                          poster={film.poster}
                          startAt={film.startAt}
                        />
                      ) : (
                        <Image
                          src={item.still.src}
                          alt=""
                          fill
                          sizes="(min-width: 1100px) 22vw, (min-width: 768px) 30vw, 45vw"
                          priority={copy === 0 && i === 0}
                        />
                      )}
                      <span className={styles.format}>{withFilm ? "Film · 0:45" : item.format}</span>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top} data-sh-fade>
          <p className="label kicker">
            <span className="kicker-index">03</span> Digital Growth &amp; Marketing
          </p>
        </div>

        <h1 className={styles.title} id="social-hero-title">
          <span className={`label ${styles.eyebrow}`} data-sh-fade>
            Social Media Marketing
          </span>
          <span className={styles.line}>
            <span data-sh-line>Made to</span>
          </span>
          <span className={styles.line}>
            <span data-sh-line>be</span>{" "}
            <span data-sh-line className="accent">
              shared.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-sh-fade>
          <p className={styles.lead}>
            We run social like a creative studio runs a campaign — an idea first, then content people actually stop
            for, share and come back to.
          </p>
          <p className={`label ${styles.for}`}>For companies · authors · personal brands</p>
        </div>
      </div>
    </SocialHeroMotion>
  );
}
