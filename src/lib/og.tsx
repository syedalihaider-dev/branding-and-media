import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared social card for inner pages — same art direction as the root
 * card: ink field, condensed caps, one signal-orange serif accent.
 */
export function renderOg({
  kicker,
  line,
  accent,
  footnote,
}: {
  kicker: string;
  line: string;
  accent: string;
  footnote: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0e0d0b",
          color: "#ede8df",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          <span>Branding &amp; Media</span>
          <span>{kicker}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, textTransform: "uppercase" }}>{line}</div>
          <div style={{ fontSize: 150, color: "#ff4a1c", fontStyle: "italic", fontFamily: "serif", alignSelf: "flex-end" }}>
            {accent}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, maxWidth: 900, lineHeight: 1.25, opacity: 0.85 }}>{footnote}</div>
      </div>
    ),
    ogSize,
  );
}
