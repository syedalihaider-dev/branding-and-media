import Image from "next/image";
import { story } from "@/content/about";
import { Split } from "@/components/ui/Split";
import { AboutStoryMotion } from "./AboutStoryMotion";
import styles from "./AboutStory.module.css";

export function AboutStory() {
  return (
    <AboutStoryMotion className={styles.story}>
      <aside className={styles.aside}>
        <p className="label kicker">
          <span className="kicker-index">01</span> Who we are
        </p>
        <figure className={styles.figure} data-as-figure>
          <div className={styles.frame}>
            <div className={styles.img} data-as-img>
              <Image
                src="/media/stills/reflection.webp"
                alt="Close-up of a man in patterned sunglasses with a plane reflected in the lenses, from a Branding & Media film"
                fill
                sizes="(min-width: 1100px) 28vw, 70vw"
              />
            </div>
          </div>
          <figcaption className={styles.caption}>
            <span>Fig. 01</span>
            <span>Perception, reflected.</span>
          </figcaption>
        </figure>
      </aside>

      <div className={styles.main}>
        <h2 className={styles.heading} id="story-title">
          <span className={styles.hLine} data-as-line>
            <span>{story.heading[0]}</span>
          </span>
          <span className={styles.hLine} data-as-line>
            <span>
              {story.heading[1]} <em className="serif italic">{story.heading[2]}</em> {story.heading[3]}
            </span>
          </span>
        </h2>

        <Split as="p" text={story.body} className={styles.body} wordClassName={styles.word} />

        <ol className={styles.eras}>
          {story.eras.map((e, i) => (
            <li key={e.word} className={styles.era} data-as-era>
              <span className={styles.eraRule} data-as-rule aria-hidden="true" />
              <span className={styles.eraIndex}>0{i + 1}</span>
              <h3 className={styles.eraWord}>{e.word}</h3>
              <p className={styles.eraCaption}>{e.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </AboutStoryMotion>
  );
}
