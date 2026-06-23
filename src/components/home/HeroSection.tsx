import { TrackedRegistryButton } from "./TrackedRegistryButton";

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-section__backdrop" aria-hidden="true" />

      <div className="hero-section__inner">
        <div id="passport" className="hero-section__content text-left">
          <h1 className="pl-hero-title">
            Every companion
            <span className="block">deserves to be</span>
            <span className="block">remembered.</span>
          </h1>
          <div className="hero-section__cta">
            <TrackedRegistryButton href="/passport">Register Companion</TrackedRegistryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
