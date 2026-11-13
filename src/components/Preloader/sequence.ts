/** Shared data for the opening sequence (server markup + client motion). */

/**
 * Oversized editorial crops that open Scene 01. Each later lands — scaling
 * *down*, so the type stays razor sharp — on its letter in the headline.
 * `fs` is the glyph size; `from` / `to` are viewport fractions for the
 * glyph centre; `rot` in degrees.
 */
export const FRAGMENTS = [
  { ch: "B", index: 0, fs: 118, from: [-0.3, 0.78], to: [0.2, 0.58], rot: [-9, -3] },
  { ch: "A", index: 2, fs: 140, from: [1.32, 0.05], to: [0.74, 0.3], rot: [11, 4] },
  { ch: "N", index: 3, fs: 92, from: [0.46, 1.65], to: [0.5, 0.88], rot: [3, -2] },
  { ch: "G", index: 7, fs: 82, from: [1.3, 1.0], to: [0.92, 0.7], rot: [-6, 2] },
] as const;

/** The slate reuses the brand journey from "What we do". */
export const SCENES = ["Idea", "Strategy", "Brand", "Impact"] as const;
