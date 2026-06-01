const manifestoCore = [
  "Not as property.",
  "Not as data.",
  "But as family.",
] as const;

export function ManifestoSection() {
  return (
    <section aria-labelledby="manifesto-heading" className="manifesto-section">
      <div className="manifesto-section__inner mx-auto max-w-3xl px-6 md:px-10">
        <h2
          id="manifesto-heading"
          className="manifesto-section__title font-[family-name:var(--font-cormorant)] text-[2.25rem] font-medium leading-[1.06] tracking-[-0.02em] text-kingdom-ink sm:text-4xl md:text-[2.75rem]"
        >
          In the Kingdom, every companion is remembered.
        </h2>

        <div className="manifesto-section__core mt-10 space-y-4 md:mt-12 md:space-y-5">
          {manifestoCore.map((line) => (
            <p
              key={line}
              className={`font-[family-name:var(--font-cormorant)] text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-kingdom-ink sm:text-[1.4rem] ${
                line === "But as family." ? "text-kingdom-forest" : ""
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
