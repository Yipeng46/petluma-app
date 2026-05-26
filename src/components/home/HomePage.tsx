import { EditionsSection } from "./EditionsSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { ManifestoSection } from "./ManifestoSection";
import { RegistrySection } from "./RegistrySection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhySection } from "./WhySection";

export function HomePage() {
  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />
      <main>
        <HeroSection />
        <RegistrySection />
        <ManifestoSection />
        <EditionsSection />
        <WhySection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
