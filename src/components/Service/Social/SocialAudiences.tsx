import Image from "next/image";
import { socialAudiences } from "@/content/services/social";
import { SocialAudiencesMotion } from "./SocialAudiencesMotion";
import styles from "./SocialAudiences.module.css";

/**
 * Two audiences, one studio. The halves slide in from opposite edges and
 * meet in the middle; each carries a vertical frame like a pinned post.
 */
export function SocialAudiences() {
  return (
    <SocialAudiencesMotion className={styles.audiences}>
      <h2 className="sr-only" id="social-audiences-title">
        Social media marketing for companies, authors and individuals
      </h2>
      {socialAudiences.map((a, i) => (
        <article
          key={a.id}
          className={styles.half}
          data-side={i === 0 ? "left" : "right"}
          data-svc-tone={i === 0 ? "blush" : "oxblood"}
          data-sa-half
          aria-labelledby={`aud-${a.id}`}
        >
          <p className="label kicker">
            <span className="kicker-index">{String(i + 1).padStart(2, "0")}</span> {a.label}
          </p>
          <figure className={styles.post} data-sa-post>
            <Image src={a.still.src} alt={a.still.alt} fill sizes="(min-width: 900px) 18vw, 50vw" />
          </figure>
          <div className={styles.copy}>
            <h3 className={styles.title} id={`aud-${a.id}`}>
              {a.title[0]} <span className="accent">{a.title[1]}</span>
            </h3>
            <p className={styles.body}>{a.body}</p>
            <ul className={styles.points}>
              {a.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </SocialAudiencesMotion>
  );
}
