import { SectionEyebrow, SectionTitle } from "./ui";

const editions = [
  {
    name: "Free Preview",
    price: null,
    description:
      "A first glimpse of your companion's registry identity — the opening page of their Kingdom record.",
    note: "Preview only",
  },
  {
    name: "Digital Passport",
    price: "AUD $9.99",
    description:
      "Official digital Companion Passport — archive-quality identity for sharing and keeping close.",
    note: "Digital archive",
  },
  {
    name: "Physical Passport",
    price: "AUD $69",
    description:
      "A tactile passport document — printed with registry care, for the moments that deserve something held.",
    note: "Physical record",
  },
  {
    name: "Kingdom Box",
    price: "AUD $149",
    description:
      "The complete registration ritual — passport, archive materials, and ceremonial presentation.",
    note: "Full registry set",
  },
];

export function EditionsSection() {
  return (
    <section id="editions" className="bg-kingdom-cream px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionEyebrow>Registry Editions</SectionEyebrow>
          <SectionTitle>Passport Editions</SectionTitle>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-kingdom-ink-muted">
            Choose how your companion enters the archive — each edition honours identity, not
            promotion.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {editions.map((edition) => (
            <li
              key={edition.name}
              className="flex flex-col border border-kingdom-gold/20 bg-kingdom-parchment/30 p-7 transition-shadow duration-500 hover:shadow-card"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kingdom-gold-dark">
                {edition.note}
              </p>
              <h3 className="mt-4 font-display text-xl text-kingdom-ink">{edition.name}</h3>
              {edition.price ? (
                <p className="mt-2 font-sans text-sm text-kingdom-brown">{edition.price}</p>
              ) : (
                <p className="mt-2 font-sans text-sm text-kingdom-ink-muted">Complimentary</p>
              )}
              <p className="mt-5 flex-1 font-sans text-sm leading-relaxed text-kingdom-ink-muted">
                {edition.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
