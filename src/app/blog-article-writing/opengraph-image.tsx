import { blogMeta } from "@/content/services/blog";
import { ogSize, renderOg } from "@/lib/og";

export const alt = blogMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(blogMeta.og);
}
