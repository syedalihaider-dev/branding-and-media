/**
 * Imperative header theming. Sections (or pinned timelines that swap
 * "worlds" mid-pin) call this directly — no React state, no re-render.
 */
export type HeaderTheme = "dark" | "light" | "signal";

let current: HeaderTheme = "dark";

export function setHeaderTheme(theme: HeaderTheme) {
  if (theme === current) return;
  current = theme;
  const header = document.getElementById("site-header");
  if (header) header.dataset.theme = theme;
}
