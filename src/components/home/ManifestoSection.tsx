import { SectionTitle } from "./ui";

const manifestoParagraphs = [
  "PetLuma was created to preserve the existence of the companions who quietly walk through our lives.",
  "Every registered companion receives an official Companion ID and a permanent place inside the Kingdom archives.",
  "Not as property.",
  "Not as data.",
  "But as family.",
  "Some stay for many years.",
  "Some leave too soon.",
  "But every companion deserves to be remembered.",
];

export function ManifestoSection() {
  return (
    <section className="registry-paper border-y border-kingdom-gold/15 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle as="h2" className="text-kingdom-forest">
          In the Kingdom, every companion is remembered.
        </SectionTitle>

        <div className="mt-14 space-y-6 text-left md:mt-16 md:space-y-7">
          {manifestoParagraphs.map((paragraph, index) => {
            const isEmphasis =
              paragraph === "Not as property." ||
              paragraph === "Not as data." ||
              paragraph === "But as family.";

            return (
              <p
                key={index}
                className={`font-display leading-relaxed ${
                  isEmphasis
                    ? "text-xl text-kingdom-ink md:text-2xl"
                    : "text-lg text-kingdom-ink-muted md:text-xl"
                } ${paragraph === "But as family." ? "text-kingdom-forest" : ""}`}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
