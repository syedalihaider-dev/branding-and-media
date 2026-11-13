import { ImageResponse } from "next/og";

export const alt = "Branding & Media — turning people and businesses into impactful brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", opacity: 0.6 }}>
          Global integrated marketing &amp; communication agency
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.86 }}>
          <div style={{ fontSize: 176, fontWeight: 800, letterSpacing: -8 }}>BRANDING</div>
          <div style={{ display: "flex", alignItems: "flex-end", alignSelf: "flex-end", gap: 24 }}>
            <span style={{ fontSize: 176, color: "#ff4a1c", fontStyle: "italic", fontFamily: "serif" }}>&amp;</span>
            <span style={{ fontSize: 176, fontWeight: 800, letterSpacing: -8 }}>MEDIA</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, maxWidth: 900, lineHeight: 1.25 }}>
          Turning people and businesses into impactful brands — powered by humans, ideas and data.
        </div>
      </div>
    ),
    size,
  );
}
