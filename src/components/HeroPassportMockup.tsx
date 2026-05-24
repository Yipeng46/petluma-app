/* eslint-disable @next/next/no-img-element */

const KINGDOM_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

export function HeroPassportMockup() {
  return (
    <div className="hero-passport-mockup" aria-hidden="true">
      <div className="hero-passport-mockup__ambient" />
      <div className="hero-passport-mockup__stage">
        <div className="hero-passport-mockup__scene">
          <article className="hero-passport-mockup__identity">
            <p className="hero-passport-mockup__identity-name">Luma</p>
            <p className="hero-passport-mockup__identity-breed">Golden Retriever</p>
            <p className="hero-passport-mockup__identity-id">Companion ID</p>
          </article>

          <article className="hero-passport-mockup__cover">
            <div className="hero-passport-mockup__cover-texture" />
            <div className="hero-passport-mockup__cover-sheen" />
            <div className="hero-passport-mockup__cover-spine" />
            <header className="hero-passport-mockup__cover-header">
              <p className="hero-passport-mockup__cover-kingdom">PetLuma Kingdom</p>
              <p className="hero-passport-mockup__cover-brand">PetLuma</p>
              <p className="hero-passport-mockup__cover-passport">Passport</p>
            </header>
            <div className="hero-passport-mockup__cover-emblem-wrap">
              <img
                src={KINGDOM_GATE_EMBLEM_SRC}
                alt=""
                width={176}
                height={264}
                className="hero-passport-mockup__cover-emblem"
                draggable={false}
              />
            </div>
          </article>
        </div>
        <div className="hero-passport-mockup__shadow" />
      </div>
    </div>
  );
}
