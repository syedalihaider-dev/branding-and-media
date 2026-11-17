import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { film } from "@/content/film";
import type { Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { pad } from "./Words";
import { ServiceCloseMotion } from "./ServiceCloseMotion";
import styles from "./ServiceClose.module.css";

export type CloseReveal =
  | "shutter"
  | "iris"
  | "card"
  | "slash"
  | "page"
  | "letterbox"
  | "columns"
  | "mirror"
  | "spot";

type Media = { kind: "image"; src: string } | { kind: "video" };

const BLINDS: Partial<Record<CloseReveal, number>> = { shutter: 12, columns: 6 };

/**
 * The closing moment. Same promise on every service page — a free first
 * conversation — but each arrives through its own reveal:
 *  shutter (a grid assembling), iris (a lens opening), card (a post
 *  expanding to full screen), slash (a fast diagonal cut), page (a leaf turning),
 *  letterbox (a cinema frame opening), columns (newsprint columns dropping in),
 *  mirror (a symmetrical split from the centre), spot (a spotlight cone from above).
 */
export function ServiceClose({
  index,
  lines,
  sub,
  tone = "signal",
  reveal,
  media,
}: {
  index: number;
  lines: WordsType[];
  sub: string;
  tone?: Tone;
  reveal: CloseReveal;
  media?: Media;
}) {
  const plain = lines.map((l) => l.map((w) => w.text).join(" ")).join(" ");
  return (
    <ServiceCloseMotion
      className={styles.close}
      data-reveal={reveal}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby="close-title"
    >
      <div className={styles.field} data-sc-field aria-hidden="true">
        {BLINDS[reveal]
          ? Array.from({ length: BLINDS[reveal]! }, (_, i) => <span key={i} className={styles.blind} data-sc-blind />)
          : null}
        {media ? (
          <div className={styles.media} data-sc-media>
            {media.kind === "image" ? (
              <Image src={media.src} alt="" fill sizes="100vw" quality={70} />
            ) : (
              <AmbientVideo
                className={styles.video}
                sources={film.sources}
                light={film.light}
                poster={film.poster}
                startAt={film.startAt}
              />
            )}
          </div>
        ) : null}
      </div>

      <div className={styles.content}>
        <p className="label kicker">
          <span className="kicker-index">{pad(index)}</span> Start a project
        </p>
        <h2 className={styles.title} id="close-title">
          <span className="sr-only">{plain}</span>
          {lines.map((line, i) => (
            <span key={i} className={styles.line} aria-hidden="true" data-sc-line>
              <span>
                {line.map((w, wi) => (
                  <span key={wi} className={w.em ? "accent" : undefined}>
                    {w.text}
                    {wi < line.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>
        <div className={styles.bottom} data-sc-fade>
          <p className={styles.sub}>{sub}</p>
          <div className={styles.actions}>
            <Link href="/contact-us" className={styles.go}>
              <span className={styles.goLabel}>Start the conversation</span>
              <span className={styles.goArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <a href={site.phone.href} className={styles.call}>
              or call <span>{site.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </ServiceCloseMotion>
  );
}
