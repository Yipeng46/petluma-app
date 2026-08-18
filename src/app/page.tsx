import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeArchiveSection } from "@/components/home/HomeArchiveSection";
import { HomeIdentitySection } from "@/components/home/HomeIdentitySection";
import { HomePhysicalPassportSection } from "@/components/home/HomePhysicalPassportSection";
import { HomeThreeStepsSection } from "@/components/home/HomeThreeStepsSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import "@/styles/registry-home.css";

export default function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative text-[#2e2820]">
        <HeroSection />
        <HomeThreeStepsSection />
        <HomeIdentitySection />
        <HomePhysicalPassportSection />
        <HomeArchiveSection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
