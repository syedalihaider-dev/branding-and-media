import Image from "next/image";
import { blogLife } from "@/content/services/blog";
import { photos } from "@/content/editorialImages";
import { pad } from "../Words";
import { BlogLifeMotion } from "./BlogLifeMotion";
import styles from "./BlogLife.module.css";

/**
 * The process, told through one article: the same headline at every stage
 * from brief to published page. Each stage shows the artefact as it
 * actually looks at that point. (Topic and headline are illustrative.)
 */
export function BlogLife() {
  const { topic, final, stages } = blogLife;
  const artefacts = [
    <div key="brief" data-bl-art className={`${styles.art} ${styles.card}`}>
      <p className={styles.cardQ}>Q. {topic}?</p>
      <dl className={styles.meta}>
        <div><dt>Reader</dt><dd>Heads of People</dd></div>
        <div><dt>Goal</dt><dd>Download the retention guide</dd></div>
      </dl>
    </div>,
    <div key="research" data-bl-art className={`${styles.art} ${styles.research}`}>
      <p>
        <mark data-bl-mark>why new employees quit</mark> · <mark data-bl-mark>first-year turnover</mark> ·{" "}
        <mark data-bl-mark>onboarding</mark>
      </p>
      <ul>
        <li>Search demand</li>
        <li>Interview — your Head of People</li>
        <li>Exit-survey themes</li>
      </ul>
    </div>,
    <div key="draft" data-bl-art className={`${styles.art} ${styles.draft}`}>
      <p className={styles.typed} data-bl-typed>
        {topic}
      </p>
      <span className={styles.lines} />
    </div>,
    <div key="edit" data-bl-art className={`${styles.art} ${styles.edit}`}>
      <p className={styles.old}>
        {topic}
        <i data-bl-strike />
      </p>
      <p className={styles.new} data-bl-new>
        {final}
      </p>
    </div>,
    <div key="optimise" data-bl-art className={`${styles.art} ${styles.snippet}`}>
      <p className={styles.url}>yourcompany.com › insights › first-year-exit</p>
      <p className={styles.snTitle}>{final}</p>
      <p className={styles.snDesc}>Why good hires leave in their first year — the five patterns behind early exits, and what the companies that keep people do differently.</p>
      <p className={styles.count}>
        Title <b data-bl-count="58">58</b>/60 · Description <b data-bl-count="148">148</b>/155
      </p>
    </div>,
    <div key="publish" data-bl-art className={`${styles.art} ${styles.published}`}>
      <figure className={styles.pubImg} data-bl-img>
        <Image src={photos.blogNewspaper.src} alt={photos.blogNewspaper.alt} fill sizes="(min-width: 1100px) 26vw, 80vw" quality={76} />
      </figure>
      <p className="label">Insights · 6 min read</p>
      <p className={styles.pubTitle}>{final}</p>
      <p className={styles.byline}>By your Head of People</p>
    </div>,
  ];

  return (
    <BlogLifeMotion className={styles.life}>
      <div className={styles.pin} data-bl-pin>
        <div className={styles.track} data-bl-track>
          <header className={styles.opener}>
            <p className="label kicker">
              <span className="kicker-index">02</span> The life of an article
            </p>
            <h2 className={styles.title} id="blog-life-title">
              Brief to <span className="accent">byline.</span>
            </h2>
            <p className={styles.intro}>
              One article, six stages. This is the work behind every piece we publish for you.
            </p>
            <p className={`label ${styles.note}`}>Illustration — example topic</p>
          </header>

          <ol className={styles.stages}>
            {stages.map((s, i) => (
              <li key={s.stage} className={styles.stage} data-bl-stage>
                <p className={`label ${styles.step}`}>
                  <span>{pad(i + 1)}</span> {s.stage}
                </p>
                <div className={styles.frame} aria-hidden="true">
                  {artefacts[i]}
                </div>
                <h3 className={styles.stageTitle}>{s.stage}</h3>
                <p className={styles.body}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <i data-bl-progress />
        </div>
      </div>
    </BlogLifeMotion>
  );
}
