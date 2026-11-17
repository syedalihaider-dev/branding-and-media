import { webMeta } from "@/content/services/web";
import { ogSize, renderOg } from "@/lib/og";

export const alt = webMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(webMeta.og);
}
