const manifestoCore = [
  "Not as property.",
  "Not as data.",
  "But as family.",
] as const;

export function ManifestoSection() {
  return (
    <section aria-labelledby="manifesto-heading" className="manifesto-section">
      <div className="manifesto-section__inner mx-auto max-w-3xl px-6 md:px-10">
        <h2 id="manifesto-heading" className="manifesto-section__title">
          In the Kingdom, every companion is remembered.
        </h2>

        <div className="manifesto-section__core space-y-4 md:space-y-5">
          {manifestoCore.map((line) => (
            <p
              key={line}
              className={`manifesto-section__line ${
                line === "But as family." ? "manifesto-section__line--emphasis" : ""
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
