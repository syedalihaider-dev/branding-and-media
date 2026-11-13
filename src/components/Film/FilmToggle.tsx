"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Film.module.css";

/** Play / pause control for the film (WCAG 2.2.2 — moving content can be paused). */
export function FilmToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current?.closest("section")?.querySelector<HTMLVideoElement>("[data-film-video]");
    if (!v) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    v.addEventListener("play", on);
    v.addEventListener("pause", off);
    return () => {
      v.removeEventListener("play", on);
      v.removeEventListener("pause", off);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      onClick={() =>
        ref.current?.closest("section")?.querySelector("[data-film-video]")?.dispatchEvent(new Event("film:toggle"))
      }
    >
      <span className={styles.toggleIcon} data-playing={playing} aria-hidden="true" />
      <span className="label">{playing ? "Pause film" : "Play film"}</span>
    </button>
  );
}
