import { kindleMeta } from "@/content/services/kindle";
import { ogSize, renderOg } from "@/lib/og";

export const alt = kindleMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(kindleMeta.og);
}
