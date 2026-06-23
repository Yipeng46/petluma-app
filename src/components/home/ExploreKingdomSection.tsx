import Link from "next/link";
import { RegistryButton } from "./RegistryButton";
import { TrackedRegistryButton } from "./TrackedRegistryButton";

const KINGDOM_ENTRIES = [
  {
    title: "Passport Office",
    description: "Begin registration and receive an official Companion ID.",
    href: "/passport",
  },
  {
    title: "Registry Hall",
    description: "A public archive of companions preserved within the Kingdom.",
    href: "/hall",
  },
  {
    title: "Founding Chamber",
    description: "Read the origin, charter, and future of the Kingdom.",
    href: "/founding",
  },
] as const;

export function ExploreKingdomSection() {
  return (
    <section id="explore-kingdom" className="home-section explore-section">
      <div className="home-section__inner mx-auto max-w-6xl px-6 md:px-10">
        <header className="home-section__chapter">
          <p className="home-section__chapter-label">
            <span className="home-section__chapter-index">04</span>
            <span className="home-section__chapter-rule" aria-hidden="true" />
            <span>Explore The Kingdom</span>
          </p>
        </header>

        <h2 className="home-section__title explore-section__title">Explore The Kingdom</h2>

        <ul className="explore-section__list">
          {KINGDOM_ENTRIES.map((entry, index) => (
            <li key={entry.title} className="kingdom-wayfinding">
              <p className="kingdom-wayfinding__index">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="kingdom-wayfinding__body">
                <h3 className="kingdom-wayfinding__title">
                  <Link href={entry.href}>{entry.title}</Link>
                </h3>
                <p className="kingdom-wayfinding__description">{entry.description}</p>
              </div>
              <div className="kingdom-wayfinding__action">
                {entry.href === "/passport" ? (
                  <TrackedRegistryButton href={entry.href} variant="secondary">
                    Enter
                  </TrackedRegistryButton>
                ) : (
                  <RegistryButton href={entry.href} variant="secondary">
                    Enter
                  </RegistryButton>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
