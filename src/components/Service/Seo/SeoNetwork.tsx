import { seoCluster } from "@/content/services/seo";
import { SeoNetworkMotion } from "./SeoNetworkMotion";
import styles from "./SeoNetwork.module.css";

const CORE = { x: 50, y: 52 };

/**
 * Topics, not keywords. A real topic cluster from the agency's own core
 * market drawn as a constellation: the pillar topic at the centre, the
 * subtopics it should own around it, and the internal links between them.
 */
export function SeoNetwork() {
  const { core, nodes, links } = seoCluster;
  return (
    <SeoNetworkMotion className={styles.network}>
      <header className={styles.copy}>
        <p className="label kicker">
          <span className="kicker-index">03</span> Content strategy
        </p>
        <h2 className={styles.title} id="seo-network-title">
          Topics, <span className="accent">not keywords.</span>
        </h2>
        <p className={styles.body}>
          Search engines now understand subjects, not strings. We map every question your audience asks around a
          topic, then build connected content that answers all of it — so you rank for the subject, not a single
          phrase.
        </p>
        <p className={`label ${styles.example}`}>Example cluster — {core.toLowerCase()}</p>
        <ul className="sr-only">
          {nodes.map((n) => (
            <li key={n.label}>{n.label}</li>
          ))}
        </ul>
      </header>

      <div className={styles.map} aria-hidden="true">
        <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <line key={`c${i}`} x1={CORE.x} y1={CORE.y} x2={n.x} y2={n.y} pathLength={1} data-sn-spoke />
          ))}
          {links.map(([a, b], i) => (
            <line
              key={`l${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              pathLength={1}
              className={styles.cross}
              data-sn-link
            />
          ))}
        </svg>

        <span className={styles.core} style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }} data-sn-core>
          <span className={styles.ring} />
          <span className={styles.coreLabel}>{core}</span>
        </span>

        {nodes.map((n, i) => (
          <span key={n.label} className={styles.node} style={{ left: `${n.x}%`, top: `${n.y}%` }} data-sn-node>
            <i />
            <span>
              <small>{String(i + 1).padStart(2, "0")}</small> {n.label}
            </span>
          </span>
        ))}
      </div>
    </SeoNetworkMotion>
  );
}
