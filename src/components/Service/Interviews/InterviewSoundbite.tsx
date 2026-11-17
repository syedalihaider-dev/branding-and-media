import { interviewsSoundbite } from "@/content/services/interviews";
import { InterviewSoundbiteMotion } from "./InterviewSoundbiteMotion";
import styles from "./InterviewSoundbite.module.css";

const BARS = 96;
/** Deterministic "speech" envelope — phrases with breaths between. */
const level = (i: number) => {
  const phrase = Math.abs(Math.sin(i * 0.19)) * 0.6 + 0.25;
  const grain = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const breath = i % 24 > 20 ? 0.18 : 1;
  return Math.max(0.08, Math.min(1, (phrase + Math.abs(grain) * 0.45) * breath));
};

/**
 * The soundbite. One sentence, set like captions synced to a waveform:
 * as you scroll, the playhead moves and each word lights as it's "said".
 * The idea of media training in a single gesture.
 */
export function InterviewSoundbite() {
  const words = interviewsSoundbite.quote.split(" ");
  return (
    <InterviewSoundbiteMotion className={styles.bite}>
      <p className="label kicker">
        <span className="kicker-index">03</span> The soundbite
      </p>

      <h2 className={styles.lead} id="interview-bite-title" data-ib-fade>
        {interviewsSoundbite.lead}
      </h2>

      <blockquote className={styles.quote}>
        <span className={styles.mark} aria-hidden="true" data-ib-mark>
          &ldquo;
        </span>
        <p>
          <span className="sr-only">{interviewsSoundbite.quote}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <span key={i}>
                <span className={styles.word} data-ib-word>
                  {w}
                </span>{" "}
              </span>
            ))}
          </span>
        </p>
      </blockquote>

      <div className={styles.wave} aria-hidden="true">
        <span className={styles.bars}>
          {Array.from({ length: BARS }, (_, i) => (
            <i key={i} style={{ "--h": level(i).toFixed(3) } as React.CSSProperties} data-ib-bar />
          ))}
        </span>
        <span className={styles.head} data-ib-head />
        <span className={`label ${styles.time}`}>
          <span>00:00</span>
          <span>00:08</span>
        </span>
      </div>

      <p className={styles.note} data-ib-fade>
        {interviewsSoundbite.note}
      </p>
    </InterviewSoundbiteMotion>
  );
}
