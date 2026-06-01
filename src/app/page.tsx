"use client";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { RegistryStatementSection } from "@/components/home/RegistryStatementSection";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative text-[#2e2820]">
        <HeroSection />
        <ManifestoSection />
        <RegistryStatementSection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
