import { IntroMotion } from "./IntroMotion";
import styles from "./Intro.module.css";

const stages = [
  {
    key: "idea",
    title: "Idea",
    copy: "Every brand starts as a person or a business with something worth saying.",
  },
  {
    key: "strategy",
    title: "Strategy",
    copy: "We research the market and the audience, then build the position and the plan — backed by data and insight.",
  },
  {
    key: "brand",
    title: "Brand",
    copy: "Identity, messaging and voice, crafted so the right people recognise you instantly.",
  },
  {
    key: "impact",
    title: "Impact",
    copy: "Then we put it in front of the world — on TV, in the press, on stage and in the feed.",
  },
];

const notes = [
  { text: "Audience — founders, readers, buyers", x: "6%", y: "14%" },
  { text: "Position — the authority in the room", x: "60%", y: "9%" },
  { text: "Tone — warm, expert, direct", x: "64%", y: "82%" },
  { text: "Market — US · UK · GCC", x: "10%", y: "84%" },
];

const channels = [
  { text: "National TV", x: "8%", y: "12%" },
  { text: "Press", x: "74%", y: "8%" },
  { text: "Podcasts", x: "72%", y: "30%" },
  { text: "Book tours", x: "0%", y: "70%" },
  { text: "Stages", x: "30%", y: "88%" },
  { text: "Feeds", x: "66%", y: "90%" },
];

const word = "Your Name";

export function Intro() {
  return (
    <IntroMotion className={styles.intro}>
      <div className={styles.pin} data-intro-pin>
        <header className={styles.head}>
          <p className={`label ${styles.kicker}`}>
            <span className={styles.kickerIndex}>01</span> What we do
          </p>
          <h2 className={styles.headline} id="intro-title">
            From a name to a name <em className="serif italic">people know.</em>
          </h2>
        </header>

        <div className={styles.body}>
          <ol className={styles.rail}>
            {stages.map((s, i) => (
              <li key={s.key} className={styles.stage} data-intro-stage={i}>
                <span className={styles.stageIndex}>0{i + 1}</span>
                <h3 className={styles.stageTitle}>{s.title}</h3>
                <p className={styles.stageCopy}>{s.copy}</p>
              </li>
            ))}
          </ol>

          <div className={styles.canvas} aria-hidden="true">
            {/* Strategy: construction guides + annotations */}
            <div className={styles.guides} data-intro-guides>
              <span style={{ top: "33%" }} />
              <span style={{ top: "50%" }} />
              <span style={{ top: "67%" }} />
              <span className={styles.vGuide} style={{ left: "18%" }} />
              <span className={styles.vGuide} style={{ left: "82%" }} />
            </div>
            {notes.map((n) => (
              <span key={n.text} className={styles.note} style={{ left: n.x, top: n.y }} data-intro-note>
                <span className={styles.noteDot} />
                {n.text}
              </span>
            ))}

            {/* Impact: channels */}
            {channels.map((c) => (
              <span key={c.text} className={styles.channel} style={{ left: c.x, top: c.y }} data-intro-channel>
                {c.text}
              </span>
            ))}

            <div className={styles.name} data-intro-name>
              {/* Idea: handwritten-feeling serif */}
              <div className={styles.idea} data-intro-idea>
                <span className="serif italic">your name?</span>
                <svg className={styles.scribble} viewBox="0 0 400 40" preserveAspectRatio="none">
                  <path
                    d="M4 26 C 60 10, 120 34, 190 20 S 320 8, 396 22"
                    pathLength={1}
                    data-intro-scribble
                  />
                </svg>
              </div>

              {/* Strategy → Brand → Impact: the typeset name */}
              <div className={styles.typeset} data-intro-typeset>
                <span className={styles.monogram} data-intro-mark>
                  <span>Y</span>
                  <i>.</i>
                </span>
                <span className={styles.typeWord}>
                  {Array.from(word).map((ch, i) => (
                    <span key={i} className={styles.typeChar} data-intro-char>
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </span>
              </div>

              <div className={styles.lockupMeta} data-intro-meta>
                <span>Author · Speaker · Founder</span>
                <span className={styles.swatches}>
                  <i style={{ background: "var(--bone)" }} />
                  <i style={{ background: "var(--signal)" }} />
                  <i style={{ background: "var(--ink-3)" }} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          {stages.map((s, i) => (
            <span key={s.key} data-intro-tick={i}>
              <i />
            </span>
          ))}
        </div>
      </div>
    </IntroMotion>
  );
}
