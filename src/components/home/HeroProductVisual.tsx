export function HeroProductVisual() {
  return (
    <div className="relative h-full w-full max-w-[540px] lg:max-w-none">
      <div className="hero-editorial-stage relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5] lg:min-h-[min(72vh,640px)]">
        <div className="hero-editorial-linen pointer-events-none absolute -right-8 top-0 h-[55%] w-[48%] opacity-90" aria-hidden />
        <div className="hero-editorial-botanical pointer-events-none absolute bottom-[18%] left-[6%] h-28 w-20 opacity-70" aria-hidden />
        <div className="hero-editorial-botanical hero-editorial-botanical--alt pointer-events-none absolute right-[10%] top-[12%] h-16 w-12 opacity-50" aria-hidden />

        <div className="absolute inset-0 flex items-end justify-center px-6 pb-8 pt-10 sm:px-10 sm:pb-10 md:pb-12">
          <div className="hero-passport-stack relative w-[min(72%,280px)] rotate-[-1.25deg] sm:w-[min(68%,320px)] lg:w-[min(75%,360px)]">
            <div className="hero-passport-contact-shadow pointer-events-none absolute -bottom-3 left-[8%] h-8 w-[84%]" aria-hidden />
            <div className="hero-passport-shadow-back pointer-events-none absolute inset-0 translate-x-4 translate-y-5" aria-hidden />
            <div className="hero-passport-shadow-mid pointer-events-none absolute inset-0 translate-x-2 translate-y-2.5" aria-hidden />

            <div className="relative flex aspect-[3/4] w-full">
              <div className="hero-passport-spine-ivory absolute bottom-0 left-0 top-0 w-[9%] rounded-l-[2px]" aria-hidden />
              <div className="hero-passport-page-edge hero-passport-page-edge--3 absolute bottom-[1%] left-[5.5%] top-[1.5%] w-[89%]" aria-hidden />
              <div className="hero-passport-page-edge hero-passport-page-edge--2 absolute bottom-[1.25%] left-[6.25%] top-[1.25%] w-[88.5%]" aria-hidden />
              <div className="hero-passport-page-edge hero-passport-page-edge--1 absolute bottom-[1.5%] left-[6.75%] top-[1%] w-[88%]" aria-hidden />
              <div className="hero-passport-pages absolute bottom-[2%] left-[7%] top-[2%] w-[88%] rounded-[1px]" aria-hidden />

              <article className="hero-passport-ivory passport-texture relative ml-[6%] flex w-[91%] flex-col justify-between overflow-hidden rounded-r-[3px] p-6 sm:p-7 md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(148deg,rgba(255,255,255,0.55)_0%,transparent_42%,rgba(0,0,0,0.03)_100%)]" />
                <div className="hero-passport-emboss-glow pointer-events-none absolute inset-x-6 top-16 h-24" aria-hidden />

                <header className="relative">
                  <p className="font-sans text-[8px] uppercase tracking-[0.36em] text-[#8a8278]">
                    PetLuma Kingdom Registry
                  </p>
                  <p className="hero-passport-emboss-title mt-4 font-[family-name:var(--font-cormorant)] text-[1.65rem] leading-[1.05] tracking-tight text-[#2e2820] sm:text-[1.85rem]">
                    Companion
                    <br />
                    Passport
                  </p>
                </header>

                <div className="relative flex flex-col items-center py-4">
                  <div className="hero-passport-emblem flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full sm:h-20 sm:w-20">
                    <span className="hero-gold-foil font-[family-name:var(--font-cormorant)] text-2xl font-medium sm:text-[1.65rem]">
                      PL
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-[7px] uppercase tracking-[0.3em] text-[#8a7349]">
                    Registry Edition
                  </p>
                </div>

                <footer className="relative border-t border-kingdom-gold/20 pt-5">
                  <p className="font-sans text-[7px] uppercase tracking-[0.26em] text-[#8a8278]">
                    Commemorative Identity Record
                  </p>
                </footer>
              </article>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-8 bottom-5 h-px bg-gradient-to-r from-transparent via-kingdom-gold/20 to-transparent" />
      </div>
    </div>
  );
}
