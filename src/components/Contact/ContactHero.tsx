import { hq } from "@/content/contact";
import { LocalTime } from "@/components/ui/LocalTime";
import { ContactHeroMotion } from "./ContactHeroMotion";
import styles from "./ContactHero.module.css";

const chars = (text: string) =>
  Array.from(text).map((c, i) =>
    c === " " ? (
      <span key={i} className={styles.space} />
    ) : (
      <span key={i} className={styles.ch} data-ch>
        {c}
      </span>
    ),
  );

/**
 * Contact — the collaboration chapter opens on a promise.
 * The letters respond to the visitor: Archivo's width axis swells under
 * the cursor, so the headline literally makes room for you.
 */
export function ContactHero() {
  return (
    <ContactHeroMotion className={styles.hero}>
      <div className={styles.inner} data-ch-inner>
        <div className={styles.top} data-ch-fade>
          <p className="label kicker">
            <span className="kicker-index">B&amp;M</span> Contact
          </p>
          <p className={`label ${styles.status}`}>
            <span className={styles.pulse} aria-hidden="true" />
            {hq.city} HQ <LocalTime timeZone={hq.timeZone} className={styles.time} />
          </p>
        </div>

        <h1 className={styles.title} id="contact-hero-title">
          <span className="sr-only">Let&rsquo;s make your name known.</span>
          <span className={styles.row} aria-hidden="true">
            <span className={styles.line} data-ch-line>
              {chars("Let's make")}
            </span>
          </span>
          <span className={`${styles.row} ${styles.rowIndent}`} aria-hidden="true">
            <span className={styles.line} data-ch-line>
              {chars("your name")}
            </span>
          </span>
          <span className={`${styles.row} ${styles.rowEnd}`} aria-hidden="true">
            <span className={styles.known}>
              <span className={styles.line} data-ch-line>
                <span className="serif italic">known.</span>
              </span>
              <svg className={styles.scribble} viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M4 24 C 70 8, 140 34, 210 18 S 330 6, 396 20" pathLength={1} data-ch-scribble />
              </svg>
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-ch-fade>
          <p className={styles.lead}>
            Whether you&rsquo;re an author, a founder or a growing business — tell us where you want to be heard.
            The first conversation is free.
          </p>
          <a href="#enquiry" className={styles.jump}>
            <span>Start the conversation</span>
            <span className={styles.jumpArrow} aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </ContactHeroMotion>
  );
}
