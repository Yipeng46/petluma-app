const manifestoCore = [
  "Not as property.",
  "Not as data.",
  "But as family.",
] as const;

const manifestoClosing = [
  "Some stay for many years.",
  "Some leave too soon.",
  "But every companion deserves to be remembered.",
] as const;

export function ManifestoSection() {
  return (
    <section aria-labelledby="manifesto-heading" className="manifesto-section">
      <div className="manifesto-section__inner mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:py-32">
        <header className="manifesto-section__chapter">
          <p className="flex items-center gap-4 font-sans text-[10px] font-medium uppercase tracking-[0.34em] text-kingdom-gold-dark">
            <span className="manifesto-section__index">01</span>
            <span className="manifesto-section__chapter-rule" aria-hidden />
            <span>The Kingdom Manifesto</span>
          </p>
        </header>

        <div className="manifesto-section__grid mt-12 lg:mt-16">
          <div className="manifesto-section__title-col">
            <h2
              id="manifesto-heading"
              className="font-[family-name:var(--font-cormorant)] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.025em] text-kingdom-ink sm:text-5xl md:text-[3.5rem] lg:text-[3.85rem] xl:text-[4.35rem]"
            >
              In the Kingdom,
              <span className="mt-1 block sm:mt-2">every companion</span>
              <span className="mt-1 block text-kingdom-navy sm:mt-2">is remembered.</span>
            </h2>
          </div>

          <div className="manifesto-section__body-col">
            <div className="manifesto-section__body">
              <div className="manifesto-section__core space-y-5 md:space-y-6">
                {manifestoCore.map((line) => (
                  <p
                    key={line}
                    className={`font-[family-name:var(--font-cormorant)] text-[1.35rem] leading-[1.15] tracking-[-0.01em] text-kingdom-ink sm:text-[1.5rem] md:text-[1.65rem] ${
                      line === "But as family." ? "text-kingdom-forest" : ""
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="manifesto-section__divider" aria-hidden />

              <div className="manifesto-section__closing space-y-3 md:space-y-3.5">
                {manifestoClosing.map((line) => (
                  <p
                    key={line}
                    className="max-w-md font-sans text-[13px] leading-[1.85] text-kingdom-ink-muted md:text-[14px] md:leading-7"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
