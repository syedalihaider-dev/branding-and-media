/**
 * Non-reactive bridge between the gallery's ScrollTrigger (writer) and the
 * WebGL scene (reader). `u` is the camera's position along the journey:
 *   0            entrance
 *   1 … N        station i sits at u = i + 1
 *   N + 1        the press ring
 */
export const galleryState = {
  u: 0,
};

/** Shared journey easing: dwell at every station, glide between them. */
export function journey(progress: number, stationCount: number) {
  const span = stationCount + 1;
  // Small holds at both ends so the intro and finale can be read.
  const p = Math.min(1, Math.max(0, (progress - 0.04) / 0.9));
  const raw = p * span;
  const seg = Math.min(Math.floor(raw), span - 1);
  // Hold at each end of a segment (≈30% dwell per station), then glide.
  const f = Math.min(1, Math.max(0, (raw - seg - 0.15) / 0.7));
  // smootherstep → velocity is zero arriving at and leaving each station
  const e = f * f * f * (f * (f * 6 - 15) + 10);
  return seg + e;
}
