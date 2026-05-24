/* eslint-disable @next/next/no-img-element */

const KINGDOM_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

export function HeroPassportMockup() {
  return (
    <div className="hero-passport-mockup" aria-hidden="true">
      <div className="hero-passport-mockup__glow" />
      <div className="hero-passport-mockup__stage">
        <div className="hero-passport-mockup__identity">
          <p className="hero-passport-mockup__identity-kicker">PetLuma Passport</p>
          <p className="hero-passport-mockup__identity-name">Luma</p>
          <p className="hero-passport-mockup__identity-breed">Golden Retriever</p>
          <div className="hero-passport-mockup__identity-id">
            <span className="hero-passport-mockup__identity-id-label">Companion ID</span>
            <span className="hero-passport-mockup__identity-id-value">PLK-AU-8K3QX</span>
          </div>
        </div>

        <div className="hero-passport-mockup__cover">
          <div className="hero-passport-mockup__cover-sheen" />
          <p className="hero-passport-mockup__cover-kingdom">PetLuma Kingdom</p>
          <div className="hero-passport-mockup__cover-titles">
            <p className="hero-passport-mockup__cover-brand">PetLuma</p>
            <p className="hero-passport-mockup__cover-passport">Passport</p>
          </div>
          <img
            src={KINGDOM_GATE_EMBLEM_SRC}
            alt=""
            width={180}
            height={270}
            className="hero-passport-mockup__cover-emblem"
            draggable={false}
          />
          <p className="hero-passport-mockup__cover-footer">Official Companion Document</p>
        </div>
      </div>
    </div>
  );
}
