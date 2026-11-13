/**
 * Cinematic film interlude — Branding & Media showreel.
 *
 * Source master: /public/media/film/branding.mp4 (2880×2140, ~43 MB) is
 * NOT served to visitors; these web encodes are. To swap the film, re-encode
 * to the same three variants and update the paths below.
 */
export const film = {
  /** Desktop / tablet: VP9 first (smallest), H.264 fallback. 1440px wide. */
  sources: [
    { src: "/media/film/branding-1440.webm", type: "video/webm" },
    { src: "/media/film/branding-1440.mp4", type: "video/mp4" },
  ],
  /** Phones and Save-Data: lighter 960px H.264. */
  light: { src: "/media/film/branding-960.mp4", type: "video/mp4" },
  /** Poster = the frame at `startAt`, so poster → playback is seamless. */
  poster: "/media/film/branding-poster.webp",
  startAt: 8.2,
  fps: 30,
  label: "Branding & Media showreel: campaigns, film, sport, fashion and digital work",
  /** The word the film plays through. */
  word: "Seen",
} as const;
