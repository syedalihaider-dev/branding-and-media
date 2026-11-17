import Image from "next/image";
import type { Case, Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { Words, pad } from "./Words";
import { ServiceProofMotion } from "./ServiceProofMotion";
import styles from "./ServiceProof.module.css";

/**
 * Proof, never invented. Real projects are shown as editorial spreads;
 * real engagements whose clients are confidential are set as a case file —
 * type only, no fabricated figures.
 */
export function ServiceProof({
  id,
  index,
  label,
  title,
  cases,
  tone = "ink",
}: {
  id: string;
  index: number;
  label: string;
  title: WordsType;
  cases: Case[];
  tone?: Tone;
}) {
  return (
    <ServiceProofMotion
      className={styles.proof}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby={id}
    >
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">{pad(index)}</span> {label}
        </p>
        <h2 className={styles.title} id={id} data-sp-title>
          <Words words={title} />
        </h2>
      </header>

      <div className={styles.cases}>
        {cases.map((c, i) =>
          c.kind === "project" ? (
            <article
              key={c.project.id}
              className={styles.spread}
              data-flip={i % 2 === 1}
              style={{ "--tint": c.project.tint } as React.CSSProperties}
              aria-labelledby={`${id}-${c.project.id}`}
            >
              <figure className={styles.frame} data-sp-frame>
                <div className={styles.frameInner} data-sp-img>
                  <Image
                    src={c.project.image.src}
                    alt={c.project.image.alt}
                    width={c.project.image.width}
                    height={c.project.image.height}
                    sizes="(min-width: 1100px) 56vw, 92vw"
                    quality={78}
                  />
                </div>
              </figure>
              <div className={styles.meta} data-sp-meta>
                <p className="label">
                  {c.project.discipline} <span className={styles.dim}>— Selected work</span>
                </p>
                <h3 className={styles.caseTitle} id={`${id}-${c.project.id}`}>
                  {c.project.title}
                </h3>
                <p className={styles.note}>{c.note}</p>
                <p className={styles.tags}>{c.project.services.join("  /  ")}</p>
              </div>
            </article>
          ) : c.kind === "voice" ? (
            <figure key={c.name} className={styles.voice} data-sp-voice data-flip={i % 2 === 0}>
              <p className={`label ${styles.voiceLabel}`}>In their words — {c.context}</p>
              <blockquote className={styles.voiceQuote}>
                <p>
                  <span className={styles.mark} aria-hidden="true">
                    &ldquo;
                  </span>
                  {c.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className={styles.voiceName}>
                <span className={styles.voiceRule} data-sp-rule aria-hidden="true" />
                {c.name}
              </figcaption>
            </figure>
          ) : (
            <article key={c.client} className={styles.file} aria-labelledby={`${id}-file-${i}`} data-sp-file>
              <div className={styles.fileHead}>
                <p className="label">Case file — client confidential</p>
                <p className="label">{c.discipline}</p>
              </div>
              <h3 className={styles.client} id={`${id}-file-${i}`}>
                {c.client}
              </h3>
              <p className={styles.brief}>{c.brief}</p>
              <p className={styles.outcome}>
                <span className="label">Outcome</span>
                <span className={styles.outcomeText} data-sp-outcome>
                  {c.outcome}
                </span>
              </p>
              <p className={styles.tags}>{c.services.join("  /  ")}</p>
            </article>
          ),
        )}
      </div>
    </ServiceProofMotion>
  );
}
