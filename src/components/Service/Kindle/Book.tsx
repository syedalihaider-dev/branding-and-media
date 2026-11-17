import styles from "./Book.module.css";

/**
 * A hardback built from CSS 3D planes: front cover (hinged on the spine,
 * printed inside with endpapers), spine, fore-edge, top edge, back cover
 * and a title page beneath. `--open` (deg) swings the cover; the parent
 * rotates the whole object. No WebGL — a book is a box, and CSS is enough.
 */
export function Book({ className }: { className?: string }) {
  return (
    <div className={`${styles.book} ${className ?? ""}`} data-book>
      <div className={styles.back} />
      <div className={styles.spine}>
        <span>Your Name</span>
        <span className={styles.spineTitle}>The Book Everyone&rsquo;s Talking About</span>
      </div>
      <div className={styles.fore} />
      <div className={styles.topEdge} />

      <div className={styles.titlePage}>
        <span className={styles.tpChapter}>Chapter one</span>
        <span className={styles.tpRule} />
        <span className={styles.tpLine}>The right readers are already looking for this book.</span>
        <span className={styles.tpMark}>Branding &amp; Media</span>
      </div>

      <div className={styles.cover} data-book-cover>
        <div className={styles.coverFront}>
          <span className={styles.cAuthor}>Your Name</span>
          <span className={styles.cTitle}>
            The Book
            <em>Everyone&rsquo;s</em>
            Talking About
          </span>
          <span className={styles.cFoot}>
            <i />A bestseller in waiting
          </span>
        </div>
        <div className={styles.coverInside} />
      </div>
    </div>
  );
}
