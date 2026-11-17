import { copyMeta } from "@/content/services/copywriting";
import { ogSize, renderOg } from "@/lib/og";

export const alt = copyMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(copyMeta.og);
}
