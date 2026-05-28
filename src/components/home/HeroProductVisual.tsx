export function HeroProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
      <div
        className="hero-product-stage hero-product-linen relative aspect-[4/5] overflow-hidden rounded-sm border border-kingdom-gold/12 shadow-card"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_85%,rgba(0,0,0,0.06),transparent_70%)]" />

        <div className="absolute inset-0 flex items-center justify-center px-8 pb-10 pt-14">
          <div className="relative flex h-[78%] w-[62%] max-w-[220px]">
            <div className="hero-passport-spine absolute bottom-0 left-0 top-0 w-[14%] rounded-l-[2px]" />
            <article className="hero-passport-cover passport-texture relative ml-[12%] flex h-full w-[88%] flex-col justify-between overflow-hidden rounded-r-[3px] p-5 md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.06)_0%,transparent_38%,rgba(0,0,0,0.08)_100%)]" />

              <header>
                <p className="font-sans text-[8px] uppercase tracking-[0.34em] text-kingdom-gold-light/70">
                  PetLuma Kingdom
                </p>
                <p className="mt-3 font-display text-[1.35rem] leading-none tracking-wide text-kingdom-cream/95">
                  Companion
                  <br />
                  Passport
                </p>
              </header>

              <div className="flex flex-col items-center py-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-kingdom-gold/45 bg-kingdom-navy-deep/40">
                  <span className="hero-gold-foil font-display text-xl font-medium">PL</span>
                </div>
                <p className="mt-3 font-sans text-[7px] uppercase tracking-[0.28em] text-kingdom-gold-light/60">
                  Registry Edition
                </p>
              </div>

              <footer className="border-t border-white/8 pt-4">
                <p className="font-sans text-[7px] uppercase tracking-[0.24em] text-white/35">
                  Commemorative Identity · No. 001
                </p>
              </footer>

              <div
                className="pointer-events-none absolute -right-3 bottom-[38%] h-16 w-16 rounded-full border border-kingdom-gold/25 opacity-40"
                aria-hidden
              />
            </article>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-kingdom-gold/25 to-transparent" />
      </div>

      <p className="mt-4 text-center font-sans text-[9px] uppercase tracking-[0.26em] text-kingdom-warm-gray">
        Registry Collection · MMXVI
      </p>
    </div>
  );
}
