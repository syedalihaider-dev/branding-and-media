import type { Words as WordsType } from "@/content/services/types";

/**
 * Renders a Words run as individually addressable words (for read-in and
 * stagger effects) while assistive tech reads the intact sentence.
 * Accent runs are set in the serif italic.
 */
export function Words({ words, wordAttr = "data-w" }: { words: WordsType; wordAttr?: string }) {
  const plain = words.map((w) => w.text).join(" ");
  let n = 0;
  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {words.map((run, ri) =>
          run.text.split(" ").map((word, wi) => {
            const key = `${ri}-${wi}`;
            const attrs = { [wordAttr]: n++ };
            return (
              <span key={key}>
                <span className={run.em ? "accent" : undefined} style={{ display: "inline-block" }} {...attrs}>
                  {word}
                </span>{" "}
              </span>
            );
          }),
        )}
      </span>
    </>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
