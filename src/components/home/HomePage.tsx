import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { HomeFooter } from "./HomeFooter";
import { RegistryStatementSection } from "./RegistryStatementSection";
import { SiteHeader } from "./SiteHeader";
import { ManifestoSection } from "./ManifestoSection";

export function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans text-kingdom-ink antialiased">
      <SiteHeader />
      <main>
        <HeroSection />
        <ManifestoSection />
        <RegistryStatementSection />
        <FinalCtaSection />
      </main>
      <HomeFooter />
    </div>
  );
}
