import { PassportShowcase } from "./PassportShowcase";

export function PassportSection() {
  return (
    <section id="passport-product" className="home-section passport-section">
      <div className="home-section__inner mx-auto max-w-6xl px-6 md:px-10">
        <header className="home-section__chapter">
          <p className="home-section__chapter-label">
            <span className="home-section__chapter-index">02</span>
            <span className="home-section__chapter-rule" aria-hidden="true" />
            <span>The Passport</span>
          </p>
        </header>

        <div className="passport-section__intro">
          <h2 className="home-section__title">THE PASSPORT</h2>
          <p className="home-section__subtitle">A permanent identity for every companion.</p>
        </div>

        <PassportShowcase />
      </div>
    </section>
  );
}
