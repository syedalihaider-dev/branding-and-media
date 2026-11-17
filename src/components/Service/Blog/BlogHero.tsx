import Image from "next/image";
import { photos } from "@/content/editorialImages";
import { HeroActions } from "../HeroActions";
import { BlogHeroMotion } from "./BlogHeroMotion";
import styles from "./BlogHero.module.css";

const frag = (depth: number) => ({ "data-bh-depth": depth });

/**
 * Blog & article writing — opening. A headline moves through the frame
 * while fragments of articles — photographs, a pull quote, a subhead, a
 * byline — drift around it at different depths, some in front of the type,
 * some behind. Editorial, but in motion: content that keeps arriving.
 */
export function BlogHero() {
  return (
    <BlogHeroMotion className={styles.hero}>
      <div className={styles.stage} aria-hidden="true">
        <figure className={`${styles.frag} ${styles.f1}`} {...frag(0.6)}>
          <Image src={photos.blogMagazine.src} alt="" fill priority sizes="24vw" quality={78} />
        </figure>
        <figure className={`${styles.frag} ${styles.f2}`} {...frag(1.4)}>
          <Image src={photos.blogReader.src} alt="" fill sizes="16vw" quality={78} />
        </figure>
        <figure className={`${styles.frag} ${styles.f3}`} {...frag(1)}>
          <Image src={photos.blogReading.src} alt="" fill sizes="20vw" quality={78} />
        </figure>
        <p className={`${styles.frag} ${styles.quote}`} {...frag(1.8)}>
          &ldquo;The best articles answer the question you were too busy to ask.&rdquo;
        </p>
        <p className={`${styles.frag} ${styles.chip}`} {...frag(0.4)}>
          Thought leadership <span>· 6 min read</span>
        </p>
        <p className={`${styles.frag} ${styles.sub}`} {...frag(1.2)}>
          <span>H2</span> What the data actually says
        </p>
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-bh-fade>
          <p className="label kicker">
            <span className="kicker-index">03</span> Editorial &amp; Publishing Services
          </p>
          <p className="label">Articles · Guides · Features · Newsletters</p>
        </div>

        <h1 className={styles.title} id="blog-hero-title">
          <span className={`label ${styles.eyebrow}`} data-bh-fade>
            Blog &amp; Article Writing
          </span>
          <span className={styles.row} data-bh-row="1">
            <span data-bh-line>Worth</span>
          </span>
          <span className={`${styles.row} ${styles.rowEnd}`} data-bh-row="2">
            <span data-bh-line className="accent">
              reading.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-bh-fade>
          <p className={styles.lead}>
            Researched articles, guides and thought leadership in your voice — planned around what your audience
            searches for, and published on a schedule you never have to chase.
          </p>
          <HeroActions tone="light" label="Plan your content" />
        </div>
      </div>
    </BlogHeroMotion>
  );
}
