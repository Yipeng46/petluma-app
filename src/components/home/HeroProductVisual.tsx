export function HeroProductVisual() {
  return (
    <div className="relative h-full w-full max-w-[540px] lg:max-w-none" aria-hidden>
      <div className="hero-editorial-stage relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5] lg:min-h-[min(72vh,640px)]">
        <div className="hero-archive-ambient pointer-events-none absolute inset-0" />

        <div className="hero-archive-sheet pointer-events-none absolute left-[8%] top-[14%] h-[38%] w-[52%] rotate-[-2.5deg]" />
        <div className="hero-archive-envelope pointer-events-none absolute right-[10%] top-[18%] h-[28%] w-[38%] rotate-[3deg]" />

        <div className="absolute inset-0 flex items-end justify-center px-5 pb-7 pt-8 sm:px-8 sm:pb-9 md:pb-11">
          <div className="hero-archive-composition relative h-[88%] w-full max-w-[420px]">
            <div className="hero-passport-stack absolute bottom-[6%] left-[4%] z-20 w-[58%] rotate-[-1.5deg] sm:w-[56%]">
              <div className="hero-passport-contact-shadow pointer-events-none absolute -bottom-3 left-[8%] h-8 w-[84%]" />
              <div className="hero-passport-shadow-back pointer-events-none absolute inset-0 translate-x-4 translate-y-5" />
              <div className="hero-passport-shadow-mid pointer-events-none absolute inset-0 translate-x-2 translate-y-2.5" />

              <div className="relative flex aspect-[3/4] w-full">
                <div className="hero-passport-spine-ivory absolute bottom-0 left-0 top-0 w-[9%] rounded-l-[2px]" />
                <div className="hero-passport-page-edge hero-passport-page-edge--3 absolute bottom-[1%] left-[5.5%] top-[1.5%] w-[89%]" />
                <div className="hero-passport-page-edge hero-passport-page-edge--2 absolute bottom-[1.25%] left-[6.25%] top-[1.25%] w-[88.5%]" />
                <div className="hero-passport-page-edge hero-passport-page-edge--1 absolute bottom-[1.5%] left-[6.75%] top-[1%] w-[88%]" />
                <div className="hero-passport-pages absolute bottom-[2%] left-[7%] top-[2%] w-[88%] rounded-[1px]" />

                <article className="hero-passport-ivory passport-texture relative ml-[6%] flex w-[91%] flex-col justify-between overflow-hidden rounded-r-[3px] p-5 sm:p-6 md:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(148deg,rgba(255,255,255,0.55)_0%,transparent_42%,rgba(0,0,0,0.03)_100%)]" />
                  <div className="hero-passport-emboss-glow pointer-events-none absolute inset-x-5 top-14 h-20" />

                  <header className="relative">
                    <p className="font-sans text-[7px] uppercase tracking-[0.36em] text-[#8a8278] sm:text-[8px]">
                      PetLuma Kingdom Registry
                    </p>
                    <p className="hero-passport-emboss-title mt-3 font-[family-name:var(--font-cormorant)] text-[1.35rem] leading-[1.05] tracking-tight text-[#2e2820] sm:text-[1.55rem]">
                      Companion
                      <br />
                      Passport
                    </p>
                  </header>

                  <div className="relative flex flex-col items-center py-3">
                    <div className="hero-passport-emblem flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full sm:h-[4.25rem] sm:w-[4.25rem]">
                      <span className="hero-gold-foil font-[family-name:var(--font-cormorant)] text-xl font-medium sm:text-2xl">
                        PL
                      </span>
                    </div>
                    <p className="mt-3 font-sans text-[6px] uppercase tracking-[0.3em] text-[#8a7349] sm:text-[7px]">
                      Registry Edition
                    </p>
                  </div>

                  <footer className="relative border-t border-kingdom-gold/20 pt-4">
                    <p className="font-sans text-[6px] uppercase tracking-[0.26em] text-[#8a8278] sm:text-[7px]">
                      Commemorative Identity Record
                    </p>
                  </footer>
                </article>
              </div>
            </div>

            <article className="hero-registry-card absolute bottom-[18%] right-[2%] z-30 w-[42%] rotate-[2.25deg] sm:right-[4%] sm:w-[40%]">
              <div className="hero-registry-card__inner passport-texture p-3 sm:p-3.5">
                <p className="font-sans text-[6px] uppercase tracking-[0.28em] text-[#8a7349]">
                  Kingdom Registry
                </p>
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-tight text-[#2e2820] sm:text-[1.05rem]">
                  Registry Card
                </p>
                <div className="mt-2.5 flex gap-2">
                  <div className="hero-registry-card__photo" />
                  <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                    <div className="hero-registry-card__line hero-registry-card__line--wide" />
                    <div className="hero-registry-card__line" />
                    <div className="hero-registry-card__line hero-registry-card__line--short" />
                  </div>
                </div>
                <p className="mt-2.5 font-sans text-[5px] uppercase tracking-[0.22em] text-[#8a8278]">
                  Companion ID · PLM-2026
                </p>
              </div>
            </article>

            <div className="hero-archive-floor-shadow pointer-events-none absolute inset-x-[10%] bottom-[2%] h-6" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-8 bottom-5 h-px bg-gradient-to-r from-transparent via-kingdom-gold/15 to-transparent" />
      </div>
    </div>
  );
}
