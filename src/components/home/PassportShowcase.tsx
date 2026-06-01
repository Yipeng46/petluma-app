import Image from "next/image";

const COVER_WIDTH = 560;
const COVER_HEIGHT = 700;

const SHOWCASE = {
  name: "Milo",
  species: "Golden Retriever",
  breed: "Golden Retriever",
  companionId: "PK-2026-AU-000001",
  archiveDate: "2026.03.14",
} as const;

export function PassportShowcase() {
  return (
    <div className="passport-showcase" aria-label="PetLuma Passport product display">
      <figure className="passport-showcase__panel passport-showcase__panel--cover">
        <figcaption className="passport-showcase__caption">
          <span className="passport-showcase__caption-index">01</span>
          Passport Cover
        </figcaption>
        <div className="passport-showcase__frame passport-showcase__frame--cover">
          <Image
            src="/hero-passport-product.png"
            alt="PetLuma Passport cover with Kingdom emblem"
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            sizes="(max-width: 767px) 88vw, (max-width: 1279px) 52vw, 34rem"
            className="passport-showcase__cover-image"
          />
        </div>
      </figure>

      <figure className="passport-showcase__panel passport-showcase__panel--identity">
        <figcaption className="passport-showcase__caption">
          <span className="passport-showcase__caption-index">02</span>
          Identity Page
        </figcaption>
        <article className="passport-showcase__frame passport-showcase__identity">
          <header className="passport-showcase__identity-header">
            <p className="passport-showcase__identity-kingdom">PetLuma Kingdom Registry</p>
            <p className="passport-showcase__identity-title">Identity Page</p>
          </header>

          <div className="passport-showcase__identity-body">
            <div className="passport-showcase__photo" aria-hidden="true" />

            <dl className="passport-showcase__fields">
              <div className="passport-showcase__field">
                <dt>Companion</dt>
                <dd>{SHOWCASE.name}</dd>
              </div>
              <div className="passport-showcase__field">
                <dt>Species</dt>
                <dd>{SHOWCASE.species}</dd>
              </div>
              <div className="passport-showcase__field">
                <dt>Breed</dt>
                <dd>{SHOWCASE.breed}</dd>
              </div>
              <div className="passport-showcase__field passport-showcase__field--id">
                <dt>Companion ID</dt>
                <dd>{SHOWCASE.companionId}</dd>
              </div>
            </dl>
          </div>

          <footer className="passport-showcase__identity-footer">
            <span>Archive Record</span>
            <span>{SHOWCASE.archiveDate}</span>
          </footer>
        </article>
      </figure>

      <figure className="passport-showcase__panel passport-showcase__panel--detail">
        <figcaption className="passport-showcase__caption">
          <span className="passport-showcase__caption-index">03</span>
          Companion ID Detail
        </figcaption>
        <div className="passport-showcase__frame passport-showcase__id-detail">
          <p className="passport-showcase__id-detail-label">Companion ID</p>
          <p className="passport-showcase__id-detail-value">{SHOWCASE.companionId}</p>
          <div className="passport-showcase__id-detail-rule" aria-hidden="true" />
        </div>
      </figure>
    </div>
  );
}
