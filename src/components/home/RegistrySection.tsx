import { RegistryDivider, SectionEyebrow, SectionTitle } from "./ui";

const registryPoints = [
  {
    title: "Official Companion ID",
    description:
      "A unique identifier issued at registration — your companion's place in the Kingdom record.",
  },
  {
    title: "Permanent Kingdom Archive",
    description:
      "A lasting archive entry — preserved with care, not as data, but as family.",
  },
  {
    title: "Digital & Physical Passport",
    description:
      "Identity documents crafted with passport realism — for the desk, the shelf, and the years ahead.",
  },
];

export function RegistrySection() {
  return (
    <section id="kingdom-registry" className="border-t border-kingdom-gold/10 bg-kingdom-cream px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl opacity-0-start animate-fade-in">
          <SectionEyebrow>Institution</SectionEyebrow>
          <SectionTitle>The Kingdom Registry</SectionTitle>
          <p className="mt-6 font-sans text-base leading-relaxed text-kingdom-ink-muted md:text-lg">
            PetLuma records the companions who quietly walk through our lives. Each registered
            companion receives a unique Companion ID and a place inside the Kingdom Archive.
          </p>
          <RegistryDivider className="mt-10" />
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {registryPoints.map((point, index) => (
            <li
              key={point.title}
              className="opacity-0-start animate-fade-in border border-kingdom-gold/15 bg-kingdom-parchment/40 p-8 transition-shadow duration-500 hover:shadow-card"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <span className="font-display text-3xl text-kingdom-gold/50" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl text-kingdom-ink">{point.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-kingdom-ink-muted">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
