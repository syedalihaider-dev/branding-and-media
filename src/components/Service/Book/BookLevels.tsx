import { bookLevels } from "@/content/services/book";
import { pad } from "../Words";
import { BookLevelsMotion } from "./BookLevelsMotion";
import styles from "./BookLevels.module.css";

/**
 * Four levels of edit as one continuous zoom: from the whole page down to a
 * single comma. The specimen page is our own illustrative prose, marked up
 * the way an editor would: a structural note in the margin, a paragraph
 * bracketed, a cut in the sentence, a comma circled.
 */
export function BookLevels() {
  return (
    <BookLevelsMotion className={styles.levels}>
      <div className={styles.pin} data-bl-pin>
        <div className={styles.side}>
          <p className="label kicker">
            <span className="kicker-index">02</span> Four levels of edit
          </p>
          <h2 className={styles.title} id="book-levels-title">
            From the whole book <span className="accent">to the comma.</span>
          </h2>
          <ol className={styles.list}>
            {bookLevels.map((l, i) => (
              <li key={l.level} className={styles.item} data-bl-item>
                <span className={styles.num} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div>
                  <p className="label">{l.scale}</p>
                  <h3 className={styles.level}>{l.level}</h3>
                  <p className={styles.body}>{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.window} data-bl-window aria-hidden="true">
          <div className={styles.page} data-bl-page data-bl-target="page">
            <p className={styles.running}>
              <span>The Second Year</span>
              <span>47</span>
            </p>
            <p className={styles.chapter}>Chapter Three</p>
            <p className={styles.heading}>The Second Year</p>
            <p className={styles.para}>
              By the second year the business no longer needed me in every room. It was the hardest thing I had to
              learn, and the last thing I learned.
            </p>
            <p className={`${styles.para} ${styles.target}`} data-bl-target="paragraph">
              I had built the company the way some people build a house: one room at a time, by hand, with no
              drawings.{" "}
              <span className={styles.sentence} data-bl-target="sentence">
                It worked
                <span className={styles.comma} data-bl-target="comma">
                  ,
                </span>{" "}
                until the day it <del className={styles.cut}>very suddenly</del> didn&rsquo;t.
              </span>{" "}
              And then it needed foundations I had never thought to pour.
            </p>
            <p className={styles.para}>
              So I hired. I listened. I made, in fairly short order, every mistake this chapter is about — and a few
              that deserve a chapter of their own.
            </p>
            <p className={styles.para}>
              What follows is not a method. It is a record of what broke, in the order it broke, and what we built in
              its place.
            </p>
            <span className={styles.note}>Strong — consider opening Ch. 3 with the hiring story?</span>
            <span className={styles.bracket} data-bl-bracket />
          </div>
        </div>
      </div>
    </BookLevelsMotion>
  );
}
