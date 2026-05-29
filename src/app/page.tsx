"use client";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { RegistryStatementSection } from "@/components/home/RegistryStatementSection";
import { SiteHeader } from "@/components/home/SiteHeader";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { RegistryButton } from "@/components/home/ui";

export default function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative text-[#2e2820]">
        <section
          id="home"
          className="hero-section relative min-h-[calc(100svh-var(--site-header-height))] overflow-hidden"
        >
          <div className="hero-section__inner mx-auto w-full max-w-[760px] px-6 pb-10 md:px-10 md:pb-14">
            <div id="passport" className="relative z-10">
              <h1 className="font-[family-name:var(--font-cormorant)] text-[2.65rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#2e2820] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                Every companion
                <span className="block">deserves to be remembered.</span>
              </h1>
              <p className="mt-8 max-w-[640px] font-sans text-[14px] leading-[1.85] text-[#6b6358] md:mt-10 md:text-[15px] md:leading-8">
                PetLuma Kingdom Registry preserves companion identities, memories, and
                stories for generations to come.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12">
                <RegistryButton href="/create">Register Companion</RegistryButton>
                <RegistryButton href="#registry" variant="secondary">
                  Explore the Kingdom
                </RegistryButton>
              </div>
            </div>
          </div>
        </section>

        <ManifestoSection />
        <RegistryStatementSection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
