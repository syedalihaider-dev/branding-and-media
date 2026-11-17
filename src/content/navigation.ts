/**
 * Site navigation — single source of truth for the header, mega menu,
 * mobile menu and footer.
 *
 * Service categories are *groupings only*: they have no landing page of
 * their own. Each service gets a flat, top-level URL so the category can
 * be renamed or regrouped later without breaking links.
 * Digital Growth & Marketing pages are live; the other groups follow.
 */

export type Still = {
  src: string;
  width: number;
  height: number;
};

export type ServiceLink = {
  label: string;
  href: string;
  /** One line for the mega menu. */
  blurb: string;
  still: Still;
};

export type ServiceGroup = {
  id: "growth" | "media" | "editorial";
  /** Full category name (mega menu headline, footer, mobile menu). */
  label: string;
  /** Compact label for the desktop bar. */
  short: string;
  /** Category headline split for the editorial lockup: [grotesk, serif italic]. */
  lockup: [string, string];
  description: string;
  services: ServiceLink[];
};

const still = (name: string): Still => ({
  src: `/media/stills/${name}.webp`,
  width: 1440,
  height: 1070,
});

export const serviceGroups: ServiceGroup[] = [
  {
    id: "growth",
    label: "Digital Growth & Marketing",
    short: "Digital Growth",
    lockup: ["Digital growth", "& marketing"],
    description: "Be found, be chosen, be talked about — growth built on data, not guesswork.",
    services: [
      {
        label: "Web Design & Development",
        href: "/web-design-and-development",
        blurb: "Websites designed around the people using them.",
        still: still("screen"),
      },
      {
        label: "Search Engine Optimization",
        href: "/search-engine-optimization",
        blurb: "Visibility for the searches that matter.",
        still: still("lens"),
      },
      {
        label: "Social Media Marketing",
        href: "/social-media-marketing",
        blurb: "Content and communities worth following.",
        still: still("duo"),
      },
      {
        label: "Paid Advertising",
        href: "/paid-advertising",
        blurb: "Campaigns engineered for return, not reach alone.",
        still: still("reach"),
      },
      {
        label: "Kindle Management & Book Marketing",
        href: "/kindle-management-and-book-marketing",
        blurb: "Launch, rank and sell — for authors.",
        still: still("reader"),
      },
    ],
  },
  {
    id: "media",
    label: "Brand Development & Media Relations",
    short: "Brand & Media",
    lockup: ["Brand development", "& media relations"],
    description: "Airtime, column inches and a reputation that walks into the room before you do.",
    services: [
      {
        label: "Media Interviews & Appearances",
        href: "/media-interviews-and-appearances",
        blurb: "TV, podcasts and stages — prepared and placed.",
        still: still("storyteller"),
      },
      {
        label: "Media Publications",
        href: "/media-publications",
        blurb: "Your story in the publications your audience reads.",
        still: still("reflection"),
      },
      {
        label: "Online Reputation Management",
        href: "/online-reputation-management",
        blurb: "What people find when they search your name.",
        still: still("moment"),
      },
      {
        label: "Featured Media Placements",
        href: "/featured-media-placements",
        blurb: "Features that build authority, not just awareness.",
        still: still("spotlight"),
      },
    ],
  },
  {
    id: "editorial",
    label: "Editorial & Publishing Services",
    short: "Editorial",
    lockup: ["Editorial", "& publishing"],
    description: "Words that work as hard as the design around them — from a headline to a whole book.",
    services: [
      {
        label: "Media Copywriting",
        href: "/media-copywriting",
        blurb: "Copy for ads, press and every screen in between.",
        still: still("peach"),
      },
      {
        label: "Book Writing & Editing",
        href: "/book-writing-and-editing",
        blurb: "From first draft to finished manuscript.",
        still: still("haze"),
      },
      {
        label: "Blog & Article Writing",
        href: "/blog-and-article-writing",
        blurb: "Thought leadership, published consistently.",
        still: still("portrait"),
      },
      {
        label: "Ghostwriting",
        href: "/ghostwriting",
        blurb: "Your voice, your name — our pen.",
        still: still("arena"),
      },
    ],
  },
];

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; group: ServiceGroup };

/** Order of the primary navigation. */
export const primaryNav: NavItem[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "link", label: "About Us", href: "/about-us" },
  ...serviceGroups.map((group) => ({ kind: "group" as const, group })),
  { kind: "link", label: "Contact Us", href: "/contact-us" },
];

export const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/**
 * Service pages that exist. Until a page is built its links are not
 * prefetched (avoids background 404s); add the href here when it ships.
 */
const builtServicePages = new Set<string>(
  serviceGroups.find((g) => g.id === "growth")!.services.map((s) => s.href),
);

export const prefetchFor = (href: string) => (builtServicePages.has(href) ? undefined : false);
