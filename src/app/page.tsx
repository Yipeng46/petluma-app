"use client";

import Link from "next/link";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroProductVisual } from "@/components/home/HeroProductVisual";
import { HomeFooter } from "@/components/home/HomeFooter";
import { RegistryStatementSection } from "@/components/home/RegistryStatementSection";
import { SiteHeader } from "@/components/home/SiteHeader";
import { StorySection } from "@/components/home/StorySection";
import { RegistryButton } from "@/components/home/ui";

export default function HomePage() {
  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative z-10 text-[#2e2820]">
        <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden md:min-h-[calc(100svh-4.75rem)]">
          <div className="mx-auto flex h-full min-h-[inherit] max-w-[1400px] flex-col px-6 py-10 md:px-10 md:py-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16 xl:gap-20">
            <div className="relative z-10 flex flex-col justify-center lg:max-w-xl xl:max-w-[34rem]">
              <h1 className="font-[family-name:var(--font-cormorant)] text-[2.65rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#2e2820] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                Every companion
                <span className="block">deserves an identity.</span>
              </h1>
              <p className="mt-8 max-w-md font-sans text-[14px] leading-[1.85] text-[#6b6358] md:mt-10 md:text-[15px] md:leading-8">
                PetLuma Kingdom Registry provides official companion passports, memorial
                archives, and lifelong identity records.
              </p>
              <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center md:mt-12">
                <RegistryButton href="/create">Create Passport</RegistryButton>
                <RegistryButton href="#registry" variant="secondary">
                  Learn More
                </RegistryButton>
                <Link
                  href="/registry-library"
                  className="inline-flex w-full items-center justify-center border border-kingdom-ink/12 bg-transparent px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-kingdom-ink transition-all duration-500 hover:border-kingdom-ink/25 hover:bg-kingdom-ivory sm:w-auto"
                >
                  Explore The Registry Library
                </Link>
              </div>
            </div>

            <div className="relative z-10 mt-12 flex min-h-[320px] flex-1 items-center justify-center lg:mt-0 lg:min-h-0">
              <HeroProductVisual />
            </div>
          </div>
        </section>

        <RegistryStatementSection />
        <StorySection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
