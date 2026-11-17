import Image from "next/image";
import Link from "next/link";
import { prefetchFor, serviceGroups } from "@/content/navigation";
import type { Tone } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { pad } from "./Words";
import { ServiceRelatedMotion } from "./ServiceRelatedMotion";
import styles from "./ServiceRelated.module.css";

type GroupId = (typeof serviceGroups)[number]["id"];

/**
 * The rest of a service family — internal links set
 * as a strip of tall frames. Hovering one widens it and wipes its still in.
 * (The category itself has no page; this is where it lives on a service page.)
 */
export function ServiceRelated({
  current,
  group: groupId = "growth",
  tone = "ink",
}: {
  current: string;
  group?: GroupId;
  tone?: Tone;
}) {
  const group = serviceGroups.find((g) => g.id === groupId)!;
  const others = group.services.filter((s) => s.href !== current);
  return (
    <ServiceRelatedMotion
      className={styles.related}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby="related-title"
    >
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">+</span> {group.label}
        </p>
        <h2 className={styles.title} id="related-title">
          {group.lockup[0]} <span className="accent">{group.lockup[1]}</span>
        </h2>
        <p className={styles.desc}>{group.description} Each discipline is stronger with the others beside it.</p>
      </header>

      <ul className={styles.strip}>
        {others.map((s) => {
          const n = group.services.findIndex((x) => x.href === s.href) + 1;
          return (
            <li key={s.href} className={styles.item} data-sr-item>
              <Link href={s.href} prefetch={prefetchFor(s.href)} className={styles.link}>
                <span className={styles.media} aria-hidden="true">
                  <Image src={s.still.src} alt="" fill sizes="(min-width: 900px) 30vw, 90vw" />
                </span>
                <span className={styles.num}>{pad(n)}</span>
                <span className={styles.body}>
                  <span className={styles.name}>{s.label}</span>
                  <span className={styles.blurb}>{s.blurb}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </ServiceRelatedMotion>
  );
}
