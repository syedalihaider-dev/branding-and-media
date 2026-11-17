import Image from "next/image";
import { photos } from "@/content/editorialImages";
import { HeroActions } from "../HeroActions";
import { BookHeroMotion } from "./BookHeroMotion";
import styles from "./BookHero.module.css";

/**
 * Book writing — opening. Two cloth boards meet at the spine, the title
 * split across them. They swing open on load like a cover, revealing the
 * pages beneath and the promise of the service.
 */
export function BookHero() {
  return (
    <BookHeroMotion className={styles.hero}>
      <div className={styles.media} data-bh-media aria-hidden="true">
        <Image src={photos.bookPages.src} alt="" fill priority sizes="100vw" quality={82} className={styles.img} />
        <span className={styles.grade} />
      </div>

      <div className={styles.inner}>
        <div className={styles.top} data-bh-fade>
          <p className="label kicker">
            <span className="kicker-index">02</span> Editorial &amp; Publishing Services
          </p>
          <p className="label">Writing · Editing · Proofreading · Publishing prep</p>
        </div>

        <h1 className={styles.title} id="book-hero-title">
          <span className={`label ${styles.eyebrow}`} data-bh-fade>
            Book Writing &amp; Editing
          </span>
          <span className={styles.line}>
            <span data-bh-line>From first draft</span>
          </span>
          <span className={styles.line}>
            <span data-bh-line className="accent">
              to finished book.
            </span>
          </span>
        </h1>

        <div className={styles.foot} data-bh-fade>
          <p className={styles.lead}>
            Co-writing, developmental and line editing, copyediting and proofreading — the careful, unglamorous work
            that turns a manuscript into a book people finish.
          </p>
          <HeroActions label="Talk about your book" />
        </div>
      </div>

      {/* The cover boards — closed until the motion opens them; hidden without JS or motion */}
      <noscript>
        <style>{`.${styles.cover}{display:none!important}`}</style>
      </noscript>
      <div className={styles.cover} aria-hidden="true" data-bh-cover>
        <div className={`${styles.board} ${styles.left}`} data-bh-board="left">
          <span className={styles.emboss}>Book Writing</span>
        </div>
        <div className={`${styles.board} ${styles.right}`} data-bh-board="right">
          <span className={styles.emboss}>&amp; Editing</span>
        </div>
      </div>
    </BookHeroMotion>
  );
}
