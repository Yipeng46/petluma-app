import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/home/SiteHeader";
import { RegistryButton } from "@/components/home/ui";
import { SiteFooter } from "@/components/SiteFooter";
import "@/styles/founding-chamber.css";

export const metadata: Metadata = {
  title: "Founding Chamber — PetLuma Kingdom Registry",
  description:
    "The place where the Kingdom began. An archival record of purpose, language, and the future of the PetLuma Registry.",
};

const CHARTER_PRINCIPLES = [
  "Every Companion Deserves To Be Remembered.",
  "Every Companion Has An Identity.",
  "Every Story Matters.",
  "Every Memory Has A Place.",
] as const;

const KINGDOM_BUILDINGS = [
  {
    name: "Passport Office",
    note: "Where companion identities are first inscribed and the official Kingdom passport is issued.",
    status: "Open",
    href: "/passport",
  },
  {
    name: "Registry Hall",
    note: "A public archive of companions preserved within the Kingdom.",
    status: "Open",
    href: "/hall",
  },
  {
    name: "Hall of Stories",
    note: "A chamber for letters, milestones, and the quiet chronicle of a shared life — preserved for generations.",
    status: "In preparation",
  },
  {
    name: "Memorial Garden",
    note: "A place of rest within the Kingdom for companions who have crossed the final threshold.",
    status: "In preparation",
  },
  {
    name: "Kingdom Map",
    note: "An evolving cartography of the Registry — rooms, passages, and the architecture yet to be built.",
    status: "Planned",
  },
] as const;

type FoundingSectionProps = {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  fullWidth?: boolean;
};

function FoundingSection({ index, label, title, children, fullWidth }: FoundingSectionProps) {
  return (
    <section className="founding-chamber__section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          className={`founding-chamber__section-inner${fullWidth ? " founding-chamber__section-inner--full" : ""}`}
        >
          <header>
            <p className="founding-chamber__chapter">
              <span className="founding-chamber__chapter-index">{index}</span>
              <span className="founding-chamber__chapter-rule" aria-hidden="true" />
              <span>{label}</span>
            </p>
            <h2 className="founding-chamber__section-title mt-8">{title}</h2>
          </header>
          <div className="founding-chamber__body-col">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function FoundingChamberPage() {
  return (
    <div className="founding-chamber min-h-screen font-sans antialiased">
      <div className="founding-chamber__texture" aria-hidden="true" />
      <SiteHeader />

      <main className="founding-chamber__main">
        <section className="founding-chamber__hero">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
            <div className="founding-chamber__hero-inner">
              <p className="founding-chamber__eyebrow">PetLuma Kingdom Registry</p>
              <h1 className="founding-chamber__title">The Founding Chamber</h1>
              <p className="founding-chamber__lead">The place where the Kingdom began.</p>
            </div>
          </div>
        </section>

        <FoundingSection index="II" label="Origin" title="Why The Kingdom Exists">
          <div className="founding-chamber__prose">
            <p>
              The Kingdom was founded to answer a quiet question: what becomes of a life
              shared with a companion when the years are brief and the bond is lasting?
            </p>
            <p>
              PetLuma began not as a product, but as a conviction — that companionship
              deserves a record as dignified as the love that precedes it. The Registry
              exists to hold identity, memory, and belonging in a form that can be passed
              forward.
            </p>
            <p>
              This chamber preserves the reason the Kingdom was opened: so that no
              companion who shared a home, a name, and a place in a family would disappear
              without trace.
            </p>
          </div>
        </FoundingSection>

        <FoundingSection index="III" label="Language" title="Why Companion, Not Pet">
          <div className="founding-chamber__prose">
            <p className="founding-chamber__prose-emphasis">
              &ldquo;Pet&rdquo; speaks of category. &ldquo;Companion&rdquo; speaks of
              relationship.
            </p>
            <p>
              The word guardians already use in private — when no one is listening, when
              no form demands a lesser term — is the word the Kingdom adopts in public.
            </p>
            <p>
              Companion acknowledges presence. It refuses reduction. It aligns the
              Registry with the truth of shared life: not property held, but a being
              remembered.
            </p>
          </div>
        </FoundingSection>

        <FoundingSection index="IV" label="Charter" title="The Kingdom Charter" fullWidth>
          <ol className="founding-chamber__charter-list">
            {CHARTER_PRINCIPLES.map((principle) => (
              <li key={principle} className="founding-chamber__charter-item">
                <p className="founding-chamber__charter-title">{principle}</p>
              </li>
            ))}
          </ol>
        </FoundingSection>

        <FoundingSection index="V" label="Architecture" title="The Future Of The Kingdom" fullWidth>
          <ul className="founding-chamber__catalog">
            {KINGDOM_BUILDINGS.map((building) => (
              <li key={building.name} className="founding-chamber__catalog-item">
                <p className="founding-chamber__catalog-status">{building.status}</p>
                <h3 className="founding-chamber__catalog-name">
                  {"href" in building ? (
                    <Link href={building.href}>{building.name}</Link>
                  ) : (
                    building.name
                  )}
                </h3>
                <p className="founding-chamber__catalog-note">{building.note}</p>
              </li>
            ))}
          </ul>
        </FoundingSection>

        <section className="founding-chamber__closing">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="founding-chamber__closing-lines">
              <p className="founding-chamber__closing-line">The Kingdom Is Still Young.</p>
              <p className="founding-chamber__closing-line founding-chamber__closing-line--muted">
                But Every Registry Begins With The First Entry.
              </p>
            </div>
            <div className="founding-chamber__cta">
              <RegistryButton href="/passport">Register A Companion</RegistryButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
