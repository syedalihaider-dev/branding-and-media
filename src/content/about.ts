/**
 * About page copy. Facts are drawn from brandingandmedia.com/about-us
 * (origin, approach, specialisms, global presence); presentation and
 * phrasing are rewritten for the new site.
 */

export const aboutMeta = {
  title: "About Us",
  description:
    "Branding and Media builds brands that change how people think and feel. Founded on humans, ideas and data — from a boutique personal-branding studio to a global integrated marketing and communication agency.",
  socialTitle: "About Branding and Media — We build brands people feel",
};

export const story = {
  heading: ["From a boutique", "to a", "global", "agency."],
  body: "Branding and Media was founded on a simple belief: the brands people remember are built by humans, sharpened by ideas and proven by data. We began as a boutique personal-branding studio for authors and executives, and quickly grew into an integrated marketing and communication agency — global experience, local expertise, and one measure of success: your return on investment.",
  eras: [
    {
      word: "Boutique",
      caption: "Personal branding for authors and C-level executives, built on research and insight.",
    },
    {
      word: "Integrated",
      caption: "Branding, strategy, marketing, media, communications, content and technology under one roof.",
    },
    {
      word: "Glocal",
      caption: "Teams across the Americas, EMEA and APAC — global reach, local knowledge.",
    },
  ],
};

export type Belief = {
  lead: string;
  accent: string;
  tail: string;
  body: string;
  still: string;
};

export const beliefs: Belief[] = [
  {
    lead: "Humans, ideas",
    accent: "& data.",
    tail: "",
    body: "We were founded on all three. Strategists, writers, designers and publicists bring the humanity; research and insight keep every idea honest.",
    still: "/media/stills/duo.webp",
  },
  {
    lead: "Global reach,",
    accent: "local",
    tail: "expertise.",
    body: "A truly global agency, with people who know the market you're actually selling in.",
    still: "/media/stills/reach.webp",
  },
  {
    lead: "Return on",
    accent: "investment.",
    tail: "",
    body: "Attention is only the start. Everything we do is measured by what it returns for you.",
    still: "/media/stills/lens.webp",
  },
  {
    lead: "Stories",
    accent: "worth",
    tail: "telling.",
    body: "We place clients on national TV and in newspapers and magazines — when they have something unique to offer. We'll tell you honestly if you're ready.",
    still: "/media/stills/storyteller.webp",
  },
  {
    lead: "Your money",
    accent: "back.",
    tail: "",
    body: "We put our money where our mouth is. If our solution isn't right for you, you get your money back.",
    still: "/media/stills/moment.webp",
  },
];

export type Step = {
  title: string;
  accent?: string;
  body: string;
  theme: "light" | "paper" | "dark" | "signal";
};

export const steps: Step[] = [
  {
    title: "Ice",
    accent: "breaker.",
    body: "It starts with a free first conversation. Tell us who you are and where you want to go — no obligation, no hard sell.",
    theme: "light",
  },
  {
    title: "Discovery",
    accent: ".",
    body: "Our experts learn your requirements and your challenges, then come back with real insight and honest feedback.",
    theme: "paper",
  },
  {
    title: "The B&M",
    accent: "difference.",
    body: "You're kept informed at every step, so you see — and buy into — the value we bring before anything is built.",
    theme: "dark",
  },
  {
    title: "Let's get you",
    accent: "famous.",
    body: "Once the approach is aligned with your objectives, we execute. Then the world gets to meet you.",
    theme: "signal",
  },
];

export const practiceStills: Record<string, { src: string; alt: string }> = {
  growth: {
    src: "/media/stills/duo.webp",
    alt: "Two friends laughing together in front of a lilac backdrop, from a Branding & Media campaign film",
  },
  media: {
    src: "/media/stills/storyteller.webp",
    alt: "A bearded storyteller seated in a wicker chair outdoors, from a Branding & Media film",
  },
  editorial: {
    src: "/media/stills/reader.webp",
    alt: "A man in glasses and a striped shirt looking up thoughtfully, from a Branding & Media film",
  },
};
