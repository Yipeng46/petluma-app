import { ExploreKingdomSection } from "@/components/home/ExploreKingdomSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { PassportSection } from "@/components/home/PassportSection";
import { RecentlyRegisteredSection } from "@/components/home/RecentlyRegisteredSection";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative text-[#2e2820]">
        <HeroSection />
        <PassportSection />
        <RecentlyRegisteredSection />
        <ExploreKingdomSection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
