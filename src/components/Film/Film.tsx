import { film } from "@/content/film";
import { FilmMotion } from "./FilmMotion";
import { FilmVideo } from "./FilmVideo";
import { FilmToggle } from "./FilmToggle";
import styles from "./Film.module.css";

/**
 * Interlude — "Made to be seen."
 * The film first plays *through* the letters of one word; scrolling flies
 * the letters apart toward the lens until the footage owns the screen, the
 * statement surfaces, and the frame closes like a cinema letterbox into
 * the work that follows.
 */
export function Film() {
  return (
    <FilmMotion className={styles.film} id="film">
      <div className={styles.stage} data-film-stage>
        <div className={styles.screen} data-film-screen>
          <div className={styles.media} data-film-media>
            <FilmVideo className={styles.video} />
          </div>
          {/* Knockout: ink everywhere except inside the letters. */}
          <div className={styles.knock} data-film-knock aria-hidden="true">
            <div className={styles.knockBg} data-film-knock-bg />
            <span className={styles.word}>
              {Array.from(film.word).map((c, i) => (
                <span key={i} className={styles.letter} data-film-letter>
                  {c}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.shade} data-film-shade />
        </div>

        <div className={styles.hud} data-film-hud>
          <p className="label">
            <span className={styles.rec} aria-hidden="true" /> Interlude — Behind the lens
          </p>
          <div className={styles.hudRight}>
            <p className={`label ${styles.tc}`} aria-hidden="true">
              <span data-film-tc>00:00:00:00</span>
            </p>
            <FilmToggle />
          </div>
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="film-title">
            <span className={styles.line} data-film-line>
              <span>Brands made</span>
            </span>
            <span className={styles.line} data-film-line>
              <span>
                to be <em className="serif italic">seen.</em>
              </span>
            </span>
          </h2>
          <p className={styles.sub} data-film-sub>
            Campaigns, content and media — crafted, shot and staged to be noticed.
          </p>
        </div>
      </div>
    </FilmMotion>
  );
}
