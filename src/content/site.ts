/**
 * Single source of truth for homepage copy and data.
 * All content is drawn from the existing brandingandmedia.com site.
 */

export const site = {
  name: "Branding and Media",
  shortName: "Branding & Media",
  url: "https://brandingandmedia.com",
  descriptor: "Global integrated marketing & communication agency",
  tagline:
    "Turning people and businesses into impactful brands — powered by humans, ideas and data.",
  description:
    "Branding and Media is a global integrated marketing and communication agency turning people and businesses into impactful brands through branding, strategy, marketing, media, communications, content and technology.",
  phone: { display: "(332) 203-2361", href: "tel:+13322032361" },
  address: {
    street: "539 W. Commerce St #1852",
    locality: "Dallas",
    region: "TX",
    postalCode: "75208",
    country: "US",
  },
} as const;

export type ServiceWorld =
  | "branding"
  | "strategy"
  | "marketing"
  | "media"
  | "communications"
  | "content"
  | "technology";

export type Service = {
  id: ServiceWorld;
  title: string;
  lede: string;
  items: string[];
  theme: "dark" | "light";
};

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding",
    lede: "Identity, positioning and voice for people and companies who intend to be remembered.",
    items: [
      "Brand strategy & positioning",
      "Personal & corporate identity",
      "Author branding & thought leadership",
      "Brand messaging & voice",
      "Naming",
      "Marketplace research",
    ],
    theme: "dark",
  },
  {
    id: "strategy",
    title: "Strategy",
    lede: "Research first. Then a vision, a position and a plan — backed by data and insight.",
    items: [
      "Research & analysis",
      "Business vision & mission",
      "Branding & marketing strategy",
      "Go-to-market strategy",
      "Book marketing strategy",
      "CX strategy",
    ],
    theme: "light",
  },
  {
    id: "marketing",
    title: "Marketing",
    lede: "360° campaigns across digital and offline — built to be seen, shared and acted on.",
    items: [
      "Marketing strategy",
      "360° campaigns",
      "Digital & offline campaigns",
      "Social & influencer marketing",
      "SEO",
      "Out-of-home & print",
    ],
    theme: "light",
  },
  {
    id: "media",
    title: "Media & Events",
    lede: "Airtime, column inches and stages. We put your story where the right people are watching.",
    items: [
      "National TV",
      "TV interviews & TED talks",
      "Digital publications & PR",
      "Book tours & signings",
      "Podcast booking",
      "Networking events",
    ],
    theme: "dark",
  },
  {
    id: "communications",
    title: "Communications",
    lede: "The documents and conversations that move investors, employees and stakeholders.",
    items: [
      "Annual & sustainability reports",
      "Stakeholder communication",
      "Pitch decks & investor presentations",
      "Sustainability campaigns",
      "Employee engagement",
    ],
    theme: "light",
  },
  {
    id: "content",
    title: "Content",
    lede: "Words that work as hard as the design around them.",
    items: [
      "Ad copywriting",
      "SEO copywriting",
      "Web content",
      "Blog & feature articles",
      "Author writing packages",
    ],
    theme: "dark",
  },
  {
    id: "technology",
    title: "Technology",
    lede: "Websites, apps and digital experiences designed around the people using them.",
    items: [
      "Web & digital UX/UI design",
      "Website development",
      "App development",
      "CX design & prototypes",
      "Software development",
      "Recruitment gamification",
    ],
    theme: "dark",
  },
];

export type Project = {
  id: string;
  title: string;
  discipline: string;
  summary: string;
  services: string[];
  image: { src: string; blur: string; width: number; height: number; alt: string };
  tint: string;
};

export const projects: Project[] = [
  {
    id: "healthy-lifestyle",
    title: "Healthy Lifestyle Brands",
    discipline: "Brand platform",
    summary:
      "A single, confident identity for a collective of wellness authors, trainers and experts.",
    services: ["Brand identity", "Personal branding", "Digital"],
    image: {
      src: "/media/work/healthy-lifestyle.webp",
      blur: "/media/work/healthy-lifestyle-blur.webp",
      width: 920,
      height: 448,
      alt: "Healthy Lifestyle Brands identity beside portraits of six wellness personalities",
    },
    tint: "#0d2321",
  },
  {
    id: "butterfly-effect",
    title: "The Butterfly Effect",
    discipline: "Author website",
    summary:
      "A web home for Marcus J. Moore's biography of Kendrick Lamar — editorial, musical, unmistakably his.",
    services: ["Author branding", "Web design", "Development"],
    image: {
      src: "/media/work/butterfly-effect.webp",
      blur: "/media/work/butterfly-effect-blur.webp",
      width: 920,
      height: 448,
      alt: "Website for The Butterfly Effect by Marcus J. Moore showing the book cover and the author's portrait",
    },
    tint: "#171310",
  },
  {
    id: "aventics",
    title: "Aventics",
    discipline: "Out-of-home campaign",
    summary:
      "A street-level campaign positioning the pneumatics specialist on agility, focus and passion for its clients.",
    services: ["Campaign", "Art direction", "OOH"],
    image: {
      src: "/media/work/aventics.webp",
      blur: "/media/work/aventics-blur.webp",
      width: 448,
      height: 448,
      alt: "Aventics billboard at night showing a man touching a glowing interface",
    },
    tint: "#0b0e13",
  },
  {
    id: "naval",
    title: "Su Partner Naval",
    discipline: "Corporate editorial",
    summary:
      "Print editorial for a shipbuilding, repair and shipyard-management partner — industrial scale, human detail.",
    services: ["Communications", "Editorial design", "Print"],
    image: {
      src: "/media/work/naval.webp",
      blur: "/media/work/naval-blur.webp",
      width: 448,
      height: 448,
      alt: "Brochure cover reading Su partner naval, showing a worker beneath a ship's hull",
    },
    tint: "#24110a",
  },
];

export const press = [
  "Forbes",
  "GQ",
  "TODAY",
  "Entrepreneur",
  "USA Today",
  "Inc.",
  "New York Post",
  "LA Weekly",
];

export const clients = [
  "Pirkani",
  "Bohemian Boat Charters",
  "Lincoln Business Consultant",
  "Cargobase",
  "Lezzet Turkish Kitchen",
  "AdMediary",
  "Lavishway",
  "International Charity Organization",
  "Healthy Lifestyle Brands",
  "Aventics",
  "Montage",
  "KKDW Studio",
];

export const testimonials = [
  {
    quote:
      "I have thoroughly enjoyed my branding journey with Branding and Media. I now hold myself accountable to not only scale my business but drive my life forward in all the ways that matter to me.",
    name: "Kate Holden",
    context: "Personal branding",
  },
  {
    quote:
      "From logo design to mapping our consumer journey to come up with user-friendly design, Branding and Media outdid themselves and translated our vision perfectly.",
    name: "Montage",
    context: "Identity & UX",
  },
  {
    quote:
      "The Branding and Media team is remarkable and has done a fabulous job with my personal branding. I highly recommend them for all your marketing needs.",
    name: "Steve H.",
    context: "Personal branding",
  },
  {
    quote:
      "We didn't have time to work on our brand so opted to go with Branding and Media. Their team, especially customer support, is exceptional.",
    name: "KKDW Studio",
    context: "Brand development",
  },
];

export const reviewPlatforms = ["Bark", "Manta", "Sortlist", "Reviews.io", "ProvenExpert"];

export const offices = [
  { region: "Americas", cities: ["New York", "Brooklyn", "Los Angeles", "San Jose", "Dallas", "Toronto"] },
  { region: "EMEA", cities: ["London", "Dubai", "Riyadh", "Limerick"] },
  { region: "APAC", cities: ["Canberra", "Asia"] },
] as const;

export const officeCount = offices.reduce((n, o) => n + o.cities.length, 0);
