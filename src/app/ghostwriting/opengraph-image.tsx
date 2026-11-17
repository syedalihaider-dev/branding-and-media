import { ghostMeta } from "@/content/services/ghostwriting";
import { ogSize, renderOg } from "@/lib/og";

export const alt = ghostMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(ghostMeta.og);
}
