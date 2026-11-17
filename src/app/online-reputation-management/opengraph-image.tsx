import { reputationMeta } from "@/content/services/reputation";
import { ogSize, renderOg } from "@/lib/og";

export const alt = reputationMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(reputationMeta.og);
}
