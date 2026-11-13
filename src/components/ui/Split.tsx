import type { ElementType, ReactNode } from "react";

type SplitProps = {
  text: string;
  /** "words" wraps each word, "chars" wraps each character inside words. */
  by?: "words" | "chars";
  /** Wrap each word in a clipping mask so it can rise from below. */
  mask?: boolean;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  as?: ElementType;
};

/**
 * Server-side text splitting. Assistive tech and crawlers read the intact
 * sentence from the visually-hidden span; the animated spans are hidden from
 * the accessibility tree. No client JS required, no hydration mismatch.
 */
export function Split({
  text,
  by = "words",
  mask = false,
  className,
  wordClassName,
  charClassName,
  as: Tag = "span",
}: SplitProps) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          let inner: ReactNode = word;
          if (by === "chars") {
            inner = Array.from(word).map((ch, ci) => (
              <span key={ci} className={`split-char ${charClassName ?? ""}`} data-char="">
                {ch}
              </span>
            ));
          }
          const wordEl = (
            <span className={`split-word ${wordClassName ?? ""}`} data-word="">
              {inner}
            </span>
          );
          return (
            <span key={wi}>
              <span style={{ display: "inline-block" }} className={mask ? "mask" : undefined}>
                {wordEl}
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
