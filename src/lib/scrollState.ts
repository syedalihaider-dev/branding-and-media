/**
 * Mutable, non-reactive scroll state shared between GSAP, Lenis and WebGL.
 * Written every frame by SmoothScroll and section timelines; read inside
 * render loops (useFrame / gsap.ticker). Never put this in React state —
 * doing so would re-render the tree on every scroll tick.
 */
export const scrollState = {
  /** Lenis velocity in px/frame, smoothed. Signed. */
  velocity: 0,
  /** Normalised |velocity|, 0..1 */
  energy: 0,
  /** Hero pinned-scene progress, 0..1 */
  hero: 0,
  /** Pointer in NDC (-1..1), smoothed by consumers */
  pointerX: 0,
  pointerY: 0,
};
