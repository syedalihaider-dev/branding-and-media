import Image from "next/image";
import { publicationsAnatomy } from "@/content/services/publications";
import { pad } from "../Words";
import { PublicationsAnatomyMotion } from "./PublicationsAnatomyMotion";
import styles from "./PublicationsAnatomy.module.css";

/** Greeked body lines — widths vary so the column reads as set type. */
const LINES = [100, 96, 99, 92, 100, 64, 0, 98, 100, 95, 100, 88, 41, 0, 100, 97, 99, 70];

/**
 * Story positioning, shown on the page itself: an article proof whose
 * parts are marked up one by one — angle, hook, assets, voice, proof — with
 * the margin note for each lighting up alongside. (The article is our own
 * illustration; no publication is depicted.)
 */
export function PublicationsAnatomy() {
  const mark = (i: number) => (
    <span className={styles.marker} aria-hidden="true">
      {i + 1}
    </span>
  );
  return (
    <PublicationsAnatomyMotion className={styles.anatomy}>
      <div className={styles.pin} data-pa-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">03</span> Story positioning
          </p>
          <h2 className={styles.title} id="publications-anatomy-title">
            Anatomy of a <span className="accent">placed story.</span>
          </h2>
          <p className={styles.intro}>
            Editors don&rsquo;t publish companies — they publish stories. Every element of yours is shaped before it
            reaches their inbox.
          </p>
        </header>

        <div className={styles.proof} aria-hidden="true" data-pa-sheet>
          <p className={styles.byline}>
            <span>Feature</span>
            <span>By your name · 6 min read</span>
          </p>
          <div className={styles.part} data-pa-part>
            {mark(0)}
            <p className={styles.headline}>Your angle, in the headline.</p>
          </div>
          <div className={styles.part} data-pa-part>
            {mark(1)}
            <p className={styles.standfirst}>
              Two lines that turn a passing reader into a committed one — specific, current and never promotional.
            </p>
          </div>
          <div className={styles.part} data-pa-part>
            {mark(2)}
            <div className={styles.image}>
              <Image src="/media/reel/city.webp" alt="" fill sizes="(min-width: 1100px) 40vw, 90vw" quality={70} />
            </div>
          </div>
          <div className={styles.cols}>
            <div className={styles.part} data-pa-part>
              {mark(3)}
              <p className={styles.pull}>&ldquo;The line you&rsquo;ll be quoted on.&rdquo;</p>
            </div>
            <div className={styles.part} data-pa-part>
              {mark(4)}
              <span className={styles.greek}>
                {LINES.map((w, i) => (
                  <i key={i} style={{ width: `${w}%` }} data-gap={w === 0 || undefined} />
                ))}
              </span>
            </div>
          </div>
        </div>

        <ol className={styles.notes}>
          {publicationsAnatomy.map((a, i) => (
            <li key={a.part} className={styles.note} data-pa-note>
              <span className={styles.noteNum} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <div>
                <p className="label">{a.part}</p>
                <h3 className={styles.noteTitle}>{a.label}</h3>
                <p className={styles.noteBody}>{a.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PublicationsAnatomyMotion>
  );
}
