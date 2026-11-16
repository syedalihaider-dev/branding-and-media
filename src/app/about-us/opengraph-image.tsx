import { ogSize, renderOg } from "@/lib/og";

export const alt = "About Branding & Media — we build brands people feel";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    kicker: "About us",
    line: "We build brands people",
    accent: "feel.",
    footnote: "A global integrated marketing & communication agency — founded on humans, ideas and data.",
  });
}
