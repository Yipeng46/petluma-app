import { FeatureCards } from "./FeatureCards";
import { HeroProductVisual } from "./HeroProductVisual";
import { RegistryButton, SectionEyebrow } from "./ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20 lg:pb-36 lg:pt-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12 xl:gap-20">
        <div className="opacity-0-start animate-fade-in max-w-xl lg:pt-8 xl:max-w-lg">
          <SectionEyebrow>Kingdom Registry</SectionEyebrow>
          <h1 className="font-display text-[2.35rem] font-medium leading-[1.06] tracking-tight text-kingdom-ink sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
            Every companion deserves an identity.
          </h1>
          <p className="mt-7 max-w-md font-sans text-[15px] leading-[1.75] text-kingdom-ink-muted md:text-base md:leading-8">
            PetLuma Kingdom Registry creates refined companion passports, memory archives,
            and lifelong identity records.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RegistryButton href="/create">Create Passport</RegistryButton>
            <RegistryButton href="#registry" variant="secondary">
              Learn More
            </RegistryButton>
          </div>
        </div>

        <div
          className="opacity-0-start animate-fade-in-slow lg:pl-4 xl:pl-8"
          style={{ animationDelay: "0.12s" }}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-6">
            <HeroProductVisual />
            <div className="lg:pt-6">
              <FeatureCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
