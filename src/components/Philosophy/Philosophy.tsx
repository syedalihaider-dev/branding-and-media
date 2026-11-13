import Image from "next/image";
import { PhilosophyMotion } from "./PhilosophyMotion";
import styles from "./Philosophy.module.css";

const layers = [
  {
    key: "people",
    word: "People.",
    caption: "Strategists, writers, designers and publicists who treat your name like their own.",
  },
  {
    key: "ideas",
    word: "Ideas.",
    caption: "Concepts that earn attention instead of renting it.",
  },
  {
    key: "data",
    word: "Data.",
    caption: "Market research and insight behind every recommendation we make.",
  },
];

export function Philosophy() {
  return (
    <PhilosophyMotion className={styles.philosophy} id="approach">
      <div className={styles.pin} data-philo-pin>
        <p className={`label ${styles.kicker}`}>
          <span className={styles.kickerIndex}>05</span> Approach
        </p>

        <div className={styles.space} data-philo-space>
          <div className={styles.photo} data-philo-photo aria-hidden="true">
            <Image
              src="/media/editorial/stairs.webp"
              alt=""
              width={1028}
              height={771}
              sizes="(min-width: 900px) 40vw, 80vw"
            />
          </div>
          <div className={styles.grid} data-philo-grid aria-hidden="true" />

          {layers.map((l, i) => (
            <div key={l.key} className={styles.layer} data-layer={l.key} data-philo-layer={i}>
              <p className={styles.word}>{l.word}</p>
              <p className={styles.caption}>{l.caption}</p>
            </div>
          ))}
        </div>

        <div className={styles.final} data-philo-final>
          <h2 className={styles.statement} id="approach-title">
            Powered by humans, <em className="serif italic">ideas</em> and data.
          </h2>
          <p className={styles.guarantee}>
            <span className={styles.guaranteeMark} aria-hidden="true">
              ✳
            </span>
            We put our money where our mouth is. If our solution isn&rsquo;t right for you, you get your money
            back.
          </p>
        </div>
      </div>
    </PhilosophyMotion>
  );
}
