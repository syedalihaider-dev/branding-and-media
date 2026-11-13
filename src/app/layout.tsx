import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll/SmoothScroll";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { site } from "@/content/site";
import "./globals.css";

// Variable grotesk with a width axis — lets one family span condensed
// editorial headlines through expanded display type.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// The human voice: italic accents set against the grotesk.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Branding and Media — Global Integrated Marketing & Communication Agency";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Branding and Media",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "branding agency",
    "personal branding",
    "author branding",
    "marketing agency",
    "brand strategy",
    "media and PR",
    "communications agency",
    "web design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.tagline,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/mark.png`,
  description: site.description,
  telephone: "+1-917-765-8780",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
