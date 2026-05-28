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
    <section
      aria-labelledby="manifesto-heading"
      className="manifesto-section px-6 py-28 md:px-10 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="manifesto-heading"
          className="font-[family-name:var(--font-cormorant)] text-[2.35rem] font-medium leading-[1.06] tracking-[-0.02em] text-kingdom-ink sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]"
        >
          In the Kingdom,
          <span className="mt-2 block">every companion is remembered.</span>
        </h2>

        <div className="mt-20 space-y-10 md:mt-24 md:space-y-14 lg:mt-28 lg:space-y-16">
          {manifestoCore.map((line) => (
            <p
              key={line}
              className="font-[family-name:var(--font-cormorant)] text-[1.45rem] leading-none tracking-[-0.01em] text-kingdom-ink sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2rem]"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-24 space-y-4 md:mt-32 md:space-y-5 lg:mt-40">
          {manifestoClosing.map((line) => (
            <p
              key={line}
              className="font-sans text-[13px] leading-[1.9] tracking-[0.01em] text-kingdom-ink-muted md:text-[14px] md:leading-8"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
