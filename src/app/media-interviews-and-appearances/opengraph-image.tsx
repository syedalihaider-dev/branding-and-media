import { interviewsMeta } from "@/content/services/interviews";
import { ogSize, renderOg } from "@/lib/og";

export const alt = interviewsMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(interviewsMeta.og);
}
