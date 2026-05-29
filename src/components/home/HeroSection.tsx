import { HeroProductVisual } from "./HeroProductVisual";
import { RegistryButton } from "./ui";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden md:min-h-[calc(100svh-4.75rem)]">
      <div className="mx-auto flex h-full min-h-[inherit] max-w-[1400px] flex-col px-6 py-10 md:px-10 md:py-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16 xl:gap-20">
        <div className="relative z-10 flex flex-col justify-center lg:max-w-xl xl:max-w-[34rem]">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[2.65rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#2e2820] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.25rem]">
            Every companion
            <span className="block">deserves to be remembered.</span>
          </h1>
          <p className="mt-8 max-w-md font-sans text-[14px] leading-[1.85] text-[#6b6358] md:mt-10 md:text-[15px] md:leading-8">
            PetLuma Kingdom Registry preserves companion identities, memories, and stories
            for generations to come.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12">
            <RegistryButton href="/create">Register Companion</RegistryButton>
            <RegistryButton href="#registry" variant="secondary">
              Explore the Kingdom
            </RegistryButton>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex min-h-[320px] flex-1 items-center justify-center lg:mt-0 lg:min-h-0">
          <HeroProductVisual />
        </div>
      </div>
    </section>
  );
}
