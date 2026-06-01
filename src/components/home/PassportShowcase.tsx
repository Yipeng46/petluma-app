import Image from "next/image";

const COVER_WIDTH = 420;
const COVER_HEIGHT = 520;

export function PassportShowcase() {
  return (
    <div className="passport-showcase" aria-label="PetLuma Passport product display">
      <div className="passport-showcase__composition">
        <div className="passport-showcase__cover">
          <Image
            src="/hero-passport-product.png"
            alt="PetLuma Passport cover with gold-foil Kingdom emblem"
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            sizes="(max-width: 1023px) 72vw, 34vw"
            className="passport-showcase__cover-image"
          />
        </div>

        <article className="passport-showcase__identity">
          <header className="passport-showcase__identity-header">
            <p className="passport-showcase__identity-kingdom">PetLuma Kingdom Registry</p>
            <p className="passport-showcase__identity-title">Identity Page</p>
          </header>

          <div className="passport-showcase__identity-body">
            <div className="passport-showcase__photo" aria-hidden="true" />

            <dl className="passport-showcase__fields">
              <div className="passport-showcase__field">
                <dt>Companion</dt>
                <dd>Milo</dd>
              </div>
              <div className="passport-showcase__field">
                <dt>Species</dt>
                <dd>Golden Retriever</dd>
              </div>
              <div className="passport-showcase__field passport-showcase__field--id">
                <dt>Companion ID</dt>
                <dd>PK-2026-AU-000001</dd>
              </div>
            </dl>
          </div>

          <footer className="passport-showcase__identity-footer">
            <span>Archive Record</span>
            <span>2026.03.14</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
