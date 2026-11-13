import { Hero } from "@/components/Hero/Hero";
import { Intro } from "@/components/Intro/Intro";
import { Services } from "@/components/Services/Services";
import { Work } from "@/components/Work/Work";
import { Clients } from "@/components/Clients/Clients";
import { Philosophy } from "@/components/Philosophy/Philosophy";
import { CTA } from "@/components/CTA/CTA";

/**
 * Homepage — one continuous journey:
 * Hero (fly through the work) → Intro (a name becomes a brand) →
 * Services (seven worlds) → Work (editorial reel) → Clients (momentum) →
 * Approach (people · ideas · data) → CTA (the spotlight) → Footer (curtain).
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <Services />
      <Work />
      <Clients />
      <Philosophy />
      <CTA />
    </main>
  );
}
