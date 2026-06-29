import { HomepagePrimaryCta } from "./HomepagePrimaryCta";

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-section__backdrop" aria-hidden="true" />

      <div className="hero-section__inner">
        <div id="passport" className="hero-section__content">
          <h1 className="pl-hero-title">
            Every companion
            <span className="block">deserves to be</span>
            <span className="block">remembered.</span>
          </h1>
          <div className="hero-section__cta">
            <HomepagePrimaryCta />
          </div>
        </div>
      </div>
    </section>
  );
}
