import Image from "next/image";
import { projects } from "@/content/site";
import { WorkMotion } from "./WorkMotion";
import styles from "./Work.module.css";

export function Work() {
  const total = String(projects.length).padStart(2, "0");
  return (
    <WorkMotion className={styles.work} id="work">
      <div className={styles.pin} data-work-pin>
        <div className={styles.track} data-work-track>
          <header className={styles.opener}>
            <p className={`label ${styles.kicker}`}>
              <span className={styles.kickerIndex}>03</span> Selected work
            </p>
            <h2 className={styles.openerTitle} id="work-title">
              <span className={styles.line} data-work-line>
                <span>The impact we create</span>
              </span>
              <span className={styles.line} data-work-line>
                <span>
                  gets <em className="serif italic">us</em> — and <em className="serif italic">you</em> —
                </span>
              </span>
              <span className={styles.line} data-work-line>
                <span>noticed.</span>
              </span>
            </h2>
          </header>

          {projects.map((p, i) => {
            const portrait = p.image.width / p.image.height < 1.2;
            return (
              <article
                key={p.id}
                className={styles.spread}
                data-shape={portrait ? "square" : "wide"}
                style={{ "--tint": p.tint } as React.CSSProperties}
                data-work-spread
                aria-labelledby={`work-${p.id}`}
              >
                <div className={styles.backdrop} aria-hidden="true" data-work-backdrop>
                  {/* Pre-blurred 360px still — atmosphere without a blur filter at runtime */}
                  <Image src={p.image.blur} alt="" fill sizes="10vw" unoptimized />
                </div>

                <div className={styles.meta}>
                  <span className={styles.bigIndex} aria-hidden="true" data-work-index>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="label">
                    {p.discipline} <span className={styles.of}>— {String(i + 1).padStart(2, "0")} / {total}</span>
                  </p>
                  <h3 className={styles.title} id={`work-${p.id}`} data-work-title>
                    {p.title}
                  </h3>
                  <p className={styles.summary}>{p.summary}</p>
                  <p className={styles.tags}>{p.services.join("  /  ")}</p>
                </div>

                <figure className={styles.frame} data-work-frame>
                  <div className={styles.frameInner} data-work-img>
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      sizes="(min-width: 900px) 55vw, 92vw"
                      quality={75}
                    />
                  </div>
                </figure>
              </article>
            );
          })}

          <div className={styles.closer}>
            <p className={styles.closerText}>
              From personal branding and <em className="serif italic">TV interviews</em> to building
              sustainable brands.
            </p>
            <a href="#contact" className={styles.closerLink}>
              <span>Start yours</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span data-work-progress />
        </div>
      </div>
    </WorkMotion>
  );
}
