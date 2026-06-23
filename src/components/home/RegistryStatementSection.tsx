import { RegistryDivider, SectionTitle } from "./RegistryButton";

const registryPillars = [
  {
    label: "Official Identity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="0.75" />
        <path
          d="M12 8.5v7M9 12h6"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Lifetime Registry",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M6 7.5h12M6 7.5v10.5h12V7.5M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Memorial Archive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M5 8.5 12 5l7 3.5v8L12 20l-7-3.5v-8Z"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path d="M12 8.5v11.5" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    ),
  },
  {
    label: "Kingdom Member",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M12 5.5 13.8 9.2l4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L8.2 9.8l4-.6Z"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function RegistryStatementSection() {
  return (
    <section
      id="registry"
      className="registry-parchment-surface border-y border-kingdom-gold/10 px-6 py-24 md:px-10 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-4xl text-center">
        <SectionTitle as="h2" className="text-4xl md:text-5xl lg:text-[3.25rem]">
          A registry of love.
          <span className="mt-2 block text-kingdom-navy">A record for forever.</span>
        </SectionTitle>
        <p className="mx-auto mt-8 max-w-2xl font-sans text-[15px] leading-[1.8] text-kingdom-ink-muted md:text-base">
          In the PetLuma Kingdom, every companion is recognized, every memory is preserved,
          and every story becomes part of the archive.
        </p>
        <RegistryDivider className="mx-auto mt-12" />
      </div>

      <ul className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {registryPillars.map((pillar) => (
          <li key={pillar.label} className="flex flex-col items-center text-center">
            <div className="registry-icon-ring flex h-14 w-14 items-center justify-center rounded-full text-kingdom-forest">
              {pillar.icon}
            </div>
            <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.22em] text-kingdom-ink">
              {pillar.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
