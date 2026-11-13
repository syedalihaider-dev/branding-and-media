import type { ServiceWorld } from "@/content/site";
import { ReelVideo } from "./ReelVideo";
import styles from "./Services.module.css";

/**
 * One bespoke visual per service "world". All are DOM/SVG — cheap to
 * transform, crisp at any DPR, and each one illustrates the discipline
 * rather than decorating it.
 */
export function ServiceVisual({ world }: { world: ServiceWorld }) {
  switch (world) {
    case "branding":
      return (
        <div className={styles.vBranding} data-svc-anim>
          {[
            { name: "Ink", hex: "#0E0D0B", bg: "var(--ink-3)", fg: "var(--bone)" },
            { name: "Bone", hex: "#EDE8DF", bg: "var(--bone)", fg: "var(--ink)" },
            { name: "Signal", hex: "#FF4A1C", bg: "var(--signal)", fg: "var(--ink)" },
          ].map((c) => (
            <div key={c.name} className={styles.chip} style={{ background: c.bg, color: c.fg }} data-chip>
              <span className={styles.chipName}>{c.name}</span>
              <span className={styles.chipHex}>{c.hex}</span>
            </div>
          ))}
        </div>
      );

    case "strategy":
      return (
        <svg className={styles.vStrategy} viewBox="0 0 400 300" data-svc-anim>
          <g className={styles.grid}>
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
            ))}
          </g>
          <path
            className={styles.plot}
            d="M0 250 C 40 240, 70 210, 100 215 S 160 170, 200 160 S 260 150, 290 100 S 360 40, 400 30"
            pathLength={1}
            data-plot
          />
          <circle className={styles.target} cx="290" cy="100" r="14" data-target />
          <circle className={styles.targetDot} cx="290" cy="100" r="3.5" data-target />
          <text className={styles.plotLabel} x="306" y="94">
            position
          </text>
        </svg>
      );

    case "marketing":
      return (
        <div className={styles.vMarketing} data-svc-anim>
          <svg viewBox="0 0 400 400" className={styles.rings}>
            {[60, 100, 140, 180].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} data-ring />
            ))}
            <defs>
              <path id="ring-text" d="M200,200 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0" />
            </defs>
            <text className={styles.ringText} data-ring-text>
              <textPath href="#ring-text">
                360° campaigns · Digital · Offline · Go-to-market · Social · Out-of-home ·
              </textPath>
            </text>
          </svg>
        </div>
      );

    case "media":
      return (
        <div className={styles.vMedia} data-svc-anim>
          <div className={styles.monitor} data-monitor>
            <ReelVideo />
            <span className={styles.onAir}>
              <i /> On air
            </span>
          </div>
        </div>
      );

    case "communications":
      return (
        <div className={styles.vComms} data-svc-anim>
          {[
            { k: "Annual Report", s: "2026 — Year in review" },
            { k: "Sustainability Report", s: "Impact & progress" },
            { k: "Investor Deck", s: "Series A — Confidential" },
          ].map((d, i) => (
            <div key={d.k} className={styles.doc} data-doc style={{ "--i": i } as React.CSSProperties}>
              <span className={styles.docRule} />
              <span className={styles.docTitle}>{d.k}</span>
              <span className={styles.docSub}>{d.s}</span>
            </div>
          ))}
        </div>
      );

    case "content": {
      const a = ["Ad copy", "Blog", "Feature articles", "Web content", "SEO copy"];
      const b = ["Scripts", "Newsletters", "Social", "Author writing", "Captions"];
      return (
        <div className={styles.vContent} data-svc-anim>
          {[a, b].map((col, ci) => (
            <div key={ci} className={styles.stream} data-stream={ci}>
              {[...col, ...col].map((w, i) => (
                <span key={i} className={i % 2 ? "serif italic" : undefined}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }

    case "technology":
      return (
        <svg className={styles.vTech} viewBox="0 0 400 280" data-svc-anim>
          <g data-wire>
            <rect x="1" y="1" width="398" height="278" pathLength={1} />
            <line x1="1" y1="30" x2="399" y2="30" pathLength={1} />
            <circle cx="18" cy="15.5" r="4" pathLength={1} />
            <circle cx="32" cy="15.5" r="4" pathLength={1} />
            <rect x="24" y="54" width="170" height="16" pathLength={1} />
            <rect x="24" y="80" width="120" height="8" pathLength={1} />
            <rect x="24" y="96" width="140" height="8" pathLength={1} />
            <rect x="24" y="122" width="74" height="24" pathLength={1} />
            <rect x="214" y="54" width="162" height="190" pathLength={1} />
            <line x1="214" y1="54" x2="376" y2="244" pathLength={1} />
            <line x1="376" y1="54" x2="214" y2="244" pathLength={1} />
            <rect x="24" y="170" width="54" height="74" pathLength={1} />
            <rect x="86" y="170" width="54" height="74" pathLength={1} />
            <rect x="148" y="170" width="46" height="74" pathLength={1} />
          </g>
          <rect className={styles.cursor} x="100" y="128" width="2" height="12" data-cursor />
        </svg>
      );
  }
}
