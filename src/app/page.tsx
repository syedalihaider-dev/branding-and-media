import { Preloader } from "@/components/Preloader/Preloader";
import { Hero } from "@/components/Hero/Hero";
import { Intro } from "@/components/Intro/Intro";
import { Services } from "@/components/Services/Services";
import { Film } from "@/components/Film/Film";
import { Work } from "@/components/Work/Work";
import { Clients } from "@/components/Clients/Clients";
import { Philosophy } from "@/components/Philosophy/Philosophy";
import { CTA } from "@/components/CTA/CTA";

/**
 * Homepage — one continuous journey:
 * Preloader (the studio lights come up) → Hero (fly through the work) →
 * Intro (a name becomes a brand) → Services (seven worlds) →
 * Film (made to be seen) → Work (editorial reel) →
 * Clients (a gallery you travel through) → Approach (people · ideas · data) →
 * CTA (the spotlight) → Footer (curtain).
 */
export default function Home() {
  return (
    <main id="main">
      <Preloader />
      <Hero />
      <Intro />
      <Services />
      <Film />
      <Work />
      <Clients />
      <Philosophy />
      <CTA />
    </main>
  );
}
