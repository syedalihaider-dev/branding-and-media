/**
 * Cinematic film interlude — swap these files for the production film.
 * Keep the same aspect (16:9); posters are the first frame.
 *
 * TEMPORARY FOOTAGE: studio-shoot clips from Mixkit (free licence,
 * https://mixkit.co/license/#videoFree), cut and re-encoded for the web.
 * Replace with Branding & Media's own production film before launch.
 */
export const film = {
  /** Desktop / tablet: VP9 first (smallest), H.264 fallback. */
  sources: [
    { src: "/media/film/studio-1600.webm", type: "video/webm" },
    { src: "/media/film/studio-1600.mp4", type: "video/mp4" },
  ],
  /** Phones and Save-Data: lighter 960×540 H.264. */
  light: { src: "/media/film/studio-960.mp4", type: "video/mp4" },
  poster: "/media/film/studio-poster.webp",
  posterLight: "/media/film/studio-poster-960.webp",
  fps: 24,
  label: "Behind the lens: a studio shoot — styling, lighting and photography in progress",
  /** The word the film plays through. */
  word: "Seen",
} as const;
