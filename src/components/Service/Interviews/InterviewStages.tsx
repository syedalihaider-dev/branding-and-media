import Image from "next/image";
import { interviewsStages } from "@/content/services/interviews";
import { pad } from "../Words";
import { InterviewStagesMotion } from "./InterviewStagesMotion";
import styles from "./InterviewStages.module.css";

/**
 * The rooms we put clients in — set as a monitor that changes channel.
 * Desktop: pinned; scrolling switches channel — the next shot wipes in
 * behind a scanline while the room's name lights up on the left.
 * Narrow screens and reduced motion: a sequence of framed shots.
 */
export function InterviewStages() {
  return (
    <InterviewStagesMotion className={styles.stages}>
      <div className={styles.pin} data-is-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> Where you&rsquo;ll appear
          </p>
          <h2 className={styles.title} id="interview-stages-title">
            Four rooms. <span className="accent">One voice.</span>
          </h2>
        </header>

        <ol className={styles.list}>
          {interviewsStages.map((s, i) => (
            <li key={s.title} className={styles.item} style={{ "--r": i + 1 } as React.CSSProperties} data-is-item>
              <h3 className={styles.name} data-is-name>
                <span className={styles.ch} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                {s.title}
              </h3>
              <figure className={styles.screen} data-is-screen>
                <Image src={s.still.src} alt={s.still.alt} fill sizes="(min-width: 1100px) 46vw, 92vw" quality={72} />
                <figcaption className={styles.osd} aria-hidden="true">
                  <span>
                    CH {pad(i + 1)} — {s.channel}
                  </span>
                  <span className={styles.live}>
                    <i /> On air
                  </span>
                </figcaption>
              </figure>
              <p className={styles.body} data-is-body>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <span className={styles.scan} data-is-scan aria-hidden="true" />
      </div>
    </InterviewStagesMotion>
  );
}
