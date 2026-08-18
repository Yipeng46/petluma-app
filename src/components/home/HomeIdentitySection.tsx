import Image from "next/image";
import Link from "next/link";
import { homeIdentityShowcase } from "@/lib/home-showcase-data";
import { SectionEyebrow } from "./RegistryButton";

const identityFields = [
  { label: "Companion ID", value: homeIdentityShowcase.companionId },
  { label: "Species", value: homeIdentityShowcase.species },
  { label: "Breed", value: homeIdentityShowcase.breed },
  { label: "Gender", value: homeIdentityShowcase.gender },
  { label: "Birth Date", value: homeIdentityShowcase.birthDate },
  { label: "Country", value: homeIdentityShowcase.country },
] as const;

export function HomeIdentitySection() {
  return (
    <section
      id="companion-identity"
      className="home-section home-showcase home-showcase--identity"
      aria-labelledby="home-identity-title"
    >
      <div className="home-showcase__inner mx-auto max-w-6xl px-6 md:px-10">
        <div className="home-showcase__grid">
          <article className="home-identity-panel" aria-label="Companion Identity example">
            <header className="home-identity-panel__header">
              <p className="home-identity-panel__registry">PetLuma Registry</p>
              <p className="home-identity-panel__label">Companion Identity</p>
            </header>

            <div className="home-identity-panel__body">
              <div className="home-identity-panel__portrait">
                <Image
                  src={homeIdentityShowcase.photoUrl}
                  alt={`Portrait of ${homeIdentityShowcase.name}`}
                  fill
                  sizes="(max-width: 767px) 42vw, 180px"
                  className="home-identity-panel__photo"
                />
              </div>

              <div className="home-identity-panel__summary">
                <h3 className="home-identity-panel__name">{homeIdentityShowcase.name}</h3>
                <dl className="home-identity-panel__fields">
                  {identityFields.map((field) => (
                    <div key={field.label} className="home-identity-panel__field">
                      <dt>{field.label}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>

          <div className="home-showcase__copy">
            <SectionEyebrow>A unique identity</SectionEyebrow>
            <h2 id="home-identity-title" className="pl-section-title home-showcase__title">
              Their identity, officially recorded.
            </h2>
            <p className="home-showcase__body pl-body">
              Each companion receives a unique ID, a portrait, and key details — forming
              their permanent record in the PetLuma Registry.
            </p>
            <Link href="/hall" className="registry-btn registry-btn--secondary pl-btn mt-8 inline-flex px-6 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
