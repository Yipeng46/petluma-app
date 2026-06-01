import { RegistryButton } from "./ui";

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-section__backdrop" aria-hidden="true" />

      <div className="hero-section__inner">
        <div id="passport" className="hero-section__content text-left">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[2.65rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#2e2820] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.25rem]">
            Every companion
            <span className="block">deserves to be</span>
            <span className="block">remembered.</span>
          </h1>
          <div className="mt-10 md:mt-12">
            <RegistryButton href="/passport">Register Companion</RegistryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
