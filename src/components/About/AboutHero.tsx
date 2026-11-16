import { film } from "@/content/film";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { AboutHeroMotion } from "./AboutHeroMotion";
import styles from "./AboutHero.module.css";

/**
 * About — opening. The headline holds a small window onto the showreel;
 * scrolling pushes the camera through it until the film fills the frame.
 * The brand promise ("people feel") is literally what you step into.
 */
export function AboutHero() {
  return (
    <AboutHeroMotion className={styles.hero}>
      <div className={styles.pin} data-ah-pin>
        <div className={styles.film} data-ah-film>
          <div className={styles.filmMedia} data-ah-media>
            <AmbientVideo
              className={styles.video}
              sources={film.sources}
              light={film.light}
              poster={film.poster}
              startAt={film.startAt}
            />
          </div>
          <div className={styles.filmShade} data-ah-shade aria-hidden="true" />
          <p className={styles.filmLine} data-ah-filmline>
            Every brand has a story. <em className="serif italic">We make sure people feel it.</em>
          </p>
        </div>

        <p className={`label kicker ${styles.kicker}`} data-ah-fade>
          <span className="kicker-index">B&amp;M</span> About us
        </p>

        <h1 className={styles.title} id="about-title">
          <span className="sr-only">We build brands people feel.</span>
          <span className={styles.row} aria-hidden="true" data-ah-row="1">
            <span className={styles.line}>
              <span data-ah-line>We build</span>
            </span>
            <span className={styles.window} data-ah-window />
          </span>
          <span className={styles.row} aria-hidden="true" data-ah-row="2">
            <span className={styles.line}>
              <span data-ah-line>brands people</span>
            </span>
          </span>
          <span className={`${styles.row} ${styles.rowEnd}`} aria-hidden="true" data-ah-row="3">
            <span className={styles.line}>
              <span data-ah-line className="serif italic">
                feel.
              </span>
            </span>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead} data-ah-fade>
            We build brands — empowering them to tell their story in a way that changes how people think,
            and feel, about them.
          </p>
          <dl className={styles.facts} data-ah-fade>
            <div>
              <dt className="label">Founded on</dt>
              <dd>Humans · Ideas · Data</dd>
            </div>
            <div>
              <dt className="label">Practice</dt>
              <dd>Global integrated marketing &amp; communication</dd>
            </div>
          </dl>
          <div className={styles.cue} aria-hidden="true" data-ah-fade>
            <span className="label">Scroll</span>
            <span className={styles.cueLine} />
          </div>
        </div>
      </div>
    </AboutHeroMotion>
  );
}
