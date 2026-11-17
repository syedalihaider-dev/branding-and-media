import { ghostLayers } from "@/content/services/ghostwriting";
import { GhostLayersMotion } from "./GhostLayersMotion";
import styles from "./GhostLayers.module.css";

/**
 * How a voice becomes a book, shown as three layers of paper: the
 * conversation transcript, the structure drawn from it, and the manuscript
 * written in your voice. Desktop: the stack lies flat in perspective,
 * separates into layers as you scroll, then turns to face you with the
 * finished page on top. (Sample text is illustrative.)
 */
export function GhostLayers() {
  const [transcript, outline, manuscript] = ghostLayers;
  return (
    <GhostLayersMotion className={styles.layers}>
      <div className={styles.pin} data-gl-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> How it works
          </p>
          <h2 className={styles.title} id="ghost-layers-title">
            From conversation <span className="accent">to manuscript.</span>
          </h2>
          <ol className={styles.labels}>
            {ghostLayers.map((l) => (
              <li key={l.name} data-gl-label>
                <span className="label">{l.label}</span>
                <span className={styles.labelName}>{l.name}</span>
              </li>
            ))}
          </ol>
          <p className={`label ${styles.note}`}>Sample pages — illustrative</p>
        </header>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.stack} data-gl-stack>
            <div className={`${styles.sheet} ${styles.transcript}`} data-gl-sheet>
              <p className={styles.sheetHead}>
                <span>Session 03</span>
                <span>00:14:02</span>
              </p>
              {transcript.lines.map((l, i) => (
                <p key={i} className={l.startsWith("—") ? styles.q : styles.a}>
                  {l}
                </p>
              ))}
            </div>
            <div className={`${styles.sheet} ${styles.outline}`} data-gl-sheet>
              <p className={styles.sheetHead}>
                <span>Outline — v2</span>
                <span>Working title</span>
              </p>
              {outline.lines.map((l, i) => (
                <p key={i} className={l.startsWith("Part") ? styles.part : styles.ch}>
                  {l}
                </p>
              ))}
            </div>
            <div className={`${styles.sheet} ${styles.manuscript}`} data-gl-sheet>
              <p className={styles.msChapter}>{manuscript.lines[0]}</p>
              <p className={styles.msTitle}>{manuscript.lines[1]}</p>
              <p className={styles.msBody}>{manuscript.lines[2]}</p>
              <span className={styles.msLines} />
            </div>
          </div>
        </div>
      </div>
    </GhostLayersMotion>
  );
}
