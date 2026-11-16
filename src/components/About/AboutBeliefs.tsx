import Image from "next/image";
import { beliefs } from "@/content/about";
import { AboutBeliefsMotion } from "./AboutBeliefsMotion";
import styles from "./AboutBeliefs.module.css";

const Statement = ({ lead, accent, tail }: { lead: string; accent: string; tail: string }) => (
  <>
    {lead} <em className="serif italic">{accent}</em>
    {tail ? ` ${tail}` : null}
  </>
);

/**
 * What we believe — a manifesto, not a feature grid.
 * Each conviction is set full-width in outline; scrolling inks it in.
 */
export function AboutBeliefs() {
  return (
    <AboutBeliefsMotion className={styles.beliefs}>
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">02</span> What we believe
        </p>
        <h2 className={styles.title} id="beliefs-title">
          Five convictions behind <em className="serif italic">every</em> brief.
        </h2>
      </header>

      <ol className={styles.list}>
        {beliefs.map((b, i) => (
          <li key={b.lead} className={styles.row} data-ab-row={i}>
            <span className={styles.index}>0{i + 1}</span>
            <h3 className={styles.statement}>
              <span className={styles.fill} data-ab-fill>
                <Statement {...b} />
              </span>
              <span className={`${styles.ghost} stroke`} aria-hidden="true">
                <Statement {...b} />
              </span>
            </h3>
            <p className={styles.body}>{b.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.follower} data-ab-follower aria-hidden="true">
        {beliefs.map((b) => (
          <div key={b.still} className={styles.followerImg} data-ab-img>
            <Image src={b.still} alt="" fill sizes="20vw" />
          </div>
        ))}
      </div>
    </AboutBeliefsMotion>
  );
}
