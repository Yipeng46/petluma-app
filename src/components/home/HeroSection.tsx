import { PassportHeroVisual } from "./PassportHeroVisual";
import { RegistryButton, SectionEyebrow } from "./ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden registry-hero-bg">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-20">
        <div className="opacity-0-start animate-fade-in max-w-xl">
          <SectionEyebrow>Kingdom Registry</SectionEyebrow>
          <h1 className="font-display text-[2rem] font-medium leading-[1.15] tracking-tight text-kingdom-ink sm:text-4xl lg:text-[2.85rem]">
            Every companion deserves to be remembered.
          </h1>
          <p className="mt-6 font-sans text-base leading-relaxed text-kingdom-ink-muted md:text-lg">
            Register your companion with an official Companion ID and a permanent place inside
            the Kingdom Archive.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <RegistryButton href="/create">Register Your Companion</RegistryButton>
            <RegistryButton href="#kingdom-registry" variant="secondary">
              Discover the Kingdom
            </RegistryButton>
          </div>
        </div>

        <div className="opacity-0-start animate-fade-in-slow lg:justify-self-end" style={{ animationDelay: "0.15s" }}>
          <PassportHeroVisual />
        </div>
      </div>
    </section>
  );
}
