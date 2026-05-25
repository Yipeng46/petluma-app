export function HeroPassportMockup() {
  return (
    <div className="hero-passport-mockup" aria-hidden="true">
      <div className="hero-passport-mockup__stage">
        <div className="hero-passport-mockup__ambient" />

        <div className="hero-passport-mockup__stack">
          <article className="hero-passport-mockup__page">
            <div className="hero-passport-mockup__page-grain" />
            <header className="hero-passport-mockup__page-header">
              <p className="hero-passport-mockup__page-title">Companion Identity</p>
              <p className="hero-passport-mockup__page-kingdom">PetLuma Kingdom</p>
            </header>
            <div className="hero-passport-mockup__page-body">
              <div className="hero-passport-mockup__page-photo" />
              <dl className="hero-passport-mockup__page-fields">
                <div className="hero-passport-mockup__page-field">
                  <dt>Name</dt>
                  <dd>Luna</dd>
                </div>
                <div className="hero-passport-mockup__page-field">
                  <dt>Species</dt>
                  <dd>Golden Retriever</dd>
                </div>
                <div className="hero-passport-mockup__page-field">
                  <dt>Date of Birth</dt>
                  <dd>2022.04.12</dd>
                </div>
                <div className="hero-passport-mockup__page-field">
                  <dt>Companion ID</dt>
                  <dd>PLK-2022-0412-001</dd>
                </div>
              </dl>
            </div>
            <footer className="hero-passport-mockup__page-footer">
              <span className="hero-passport-mockup__page-signature" />
              <span className="hero-passport-mockup__page-seal" />
            </footer>
          </article>

          <article className="hero-passport-mockup__cover">
            <div className="hero-passport-mockup__cover-thickness" />
            <div className="hero-passport-mockup__cover-edge" />
            <div className="hero-passport-mockup__cover-leather" />
            <div className="hero-passport-mockup__cover-texture" />
            <div className="hero-passport-mockup__cover-sheen" />
            <div className="hero-passport-mockup__cover-spine" />
            <header className="hero-passport-mockup__cover-header">
              <p className="hero-passport-mockup__cover-kingdom">PetLuma Kingdom</p>
              <p className="hero-passport-mockup__cover-brand">PetLuma</p>
              <p className="hero-passport-mockup__cover-passport">Passport</p>
            </header>
            <div className="hero-passport-mockup__cover-crest" aria-hidden="true">
              <span className="hero-passport-mockup__cover-crest-shield">
                <span className="hero-passport-mockup__cover-crest-paw" />
              </span>
            </div>
            <footer className="hero-passport-mockup__cover-footer">
              <span className="hero-passport-mockup__cover-mark" />
            </footer>
          </article>

          <article className="hero-passport-mockup__card">
            <div className="hero-passport-mockup__card-grain" />
            <p className="hero-passport-mockup__card-kingdom">PetLuma Kingdom</p>
            <p className="hero-passport-mockup__card-label">Companion ID Card</p>
            <p className="hero-passport-mockup__card-name">Luna</p>
            <p className="hero-passport-mockup__card-breed">Golden Retriever</p>
            <p className="hero-passport-mockup__card-id">PLK-2022-0412-001</p>
            <div className="hero-passport-mockup__card-qr" />
          </article>
        </div>

        <div className="hero-passport-mockup__shadow hero-passport-mockup__shadow--contact" />
        <div className="hero-passport-mockup__shadow hero-passport-mockup__shadow--floor" />
      </div>
    </div>
  );
}
