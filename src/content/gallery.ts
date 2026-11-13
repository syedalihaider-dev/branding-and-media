import { clients, press, projects, reviewPlatforms, testimonials } from "./site";

/**
 * The client gallery — real Branding & Media clients only, drawn from the
 * existing site: featured projects, client testimonials, the client list
 * and press. Order alternates image / voice so the walk has rhythm.
 */
export type GalleryStation = {
  id: string;
  /** Client name, as it appears in 3D and in the HUD */
  name: string;
  /** Typographic treatment in space */
  type: "sans" | "serif";
  context: string;
  detail?: string;
  image?: { src: string; width: number; height: number; alt: string };
  quote?: string;
};

const project = (id: string) => projects.find((p) => p.id === id)!;
const voice = (name: string) => testimonials.find((t) => t.name === name)!;

const hlb = project("healthy-lifestyle");
const aventics = project("aventics");
const butterfly = project("butterfly-effect");

export const stations: GalleryStation[] = [
  {
    id: "healthy-lifestyle",
    name: hlb.title,
    type: "sans",
    context: hlb.discipline,
    detail: hlb.services.join(" · "),
    image: hlb.image,
  },
  {
    id: "montage",
    name: "Montage",
    type: "serif",
    context: voice("Montage").context,
    quote: voice("Montage").quote,
  },
  {
    id: "aventics",
    name: aventics.title,
    type: "sans",
    context: aventics.discipline,
    detail: aventics.services.join(" · "),
    image: aventics.image,
  },
  {
    id: "kate-holden",
    name: "Kate Holden",
    type: "serif",
    context: voice("Kate Holden").context,
    quote: voice("Kate Holden").quote,
  },
  {
    id: "marcus-j-moore",
    name: "Marcus J. Moore",
    type: "sans",
    context: `${butterfly.discipline} — ${butterfly.title}`,
    detail: butterfly.services.join(" · "),
    image: butterfly.image,
  },
  {
    id: "kkdw",
    name: "KKDW Studio",
    type: "serif",
    context: voice("KKDW Studio").context,
    quote: voice("KKDW Studio").quote,
  },
];

const featured = new Set(stations.map((s) => s.name));

/** Everyone else on the client list drifts through the gallery's periphery. */
export const ambientClients = [...clients.filter((c) => !featured.has(c)), "Su Partner Naval"];

export { press, reviewPlatforms };
