import Image from "next/image";
import { passportMeta, petCitizen } from "@/lib/registry-mock";

export function PassportHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute -left-6 top-8 hidden h-40 w-32 rotate-[-6deg] rounded-sm border border-kingdom-gold/15 bg-kingdom-parchment/80 shadow-card lg:block"
        aria-hidden
      >
        <div className="registry-paper h-full w-full p-4 opacity-90">
          <div className="h-2 w-16 bg-kingdom-gold/20" />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full bg-kingdom-ink/5" />
            <div className="h-1.5 w-[80%] bg-kingdom-ink/5" />
            <div className="h-1.5 w-[60%] bg-kingdom-ink/5" />
          </div>
        </div>
      </div>

      <article className="passport-card relative z-10 mx-auto max-w-sm transition-shadow duration-500 hover:shadow-passport lg:max-w-md">
        <div className="passport-texture pointer-events-none absolute inset-0 rounded-sm" aria-hidden />
        <div className="relative overflow-hidden rounded-sm border border-kingdom-gold/30 bg-gradient-to-br from-[#F8F2E8] via-[#F5EFE4] to-[#EDE6D8] p-6 shadow-passport md:p-7">
          <div className="absolute right-5 top-5 h-10 w-10 border-r border-t border-kingdom-gold/45" aria-hidden />
          <div className="absolute bottom-5 left-5 h-10 w-10 border-b border-l border-kingdom-gold/45" aria-hidden />

          <header className="border-b border-kingdom-gold/25 pb-4">
            <p className="font-display text-xl tracking-wide text-kingdom-gold-dark">
              Companion Passport
            </p>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-kingdom-ink-muted">
              Kingdom Registry · {passportMeta.issuedBy}
            </p>
          </header>

          <div className="mt-6 flex gap-5">
            <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-sm border border-kingdom-gold/35 shadow-inner">
              <Image
                src={petCitizen.avatarUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 128px"
                priority
              />
            </div>
            <dl className="flex-1 space-y-3 font-sans text-xs">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-kingdom-ink-muted">
                  Companion
                </dt>
                <dd className="font-display text-xl text-kingdom-ink">{petCitizen.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-kingdom-ink-muted">
                  Companion ID
                </dt>
                <dd className="font-mono text-[11px] tracking-wide text-kingdom-forest">
                  {petCitizen.kingdomId}
                </dd>
              </div>
            </dl>
          </div>

          <footer className="mt-7 flex items-end justify-between border-t border-dashed border-kingdom-gold/30 pt-4">
            <p className="font-sans text-[10px] uppercase tracking-wider text-kingdom-ink-muted">
              Archive Record
            </p>
            <p className="font-sans text-xs text-kingdom-ink">{passportMeta.issuedDate}</p>
          </footer>

          <div
            className="absolute -right-1 bottom-20 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-kingdom-gold/35 bg-kingdom-cream/40 font-display text-[7px] uppercase leading-tight tracking-[0.2em] text-kingdom-gold-dark"
            aria-hidden
          >
            Kingdom
            <br />
            Seal
          </div>
        </div>
      </article>

      <div
        className="pointer-events-none absolute -bottom-4 -right-2 z-20 hidden rounded-sm border border-kingdom-gold/25 bg-kingdom-cream px-4 py-3 shadow-card md:block"
        aria-hidden
      >
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-kingdom-ink-muted">
          Registered
        </p>
        <p className="mt-0.5 font-display text-sm text-kingdom-forest">Kingdom Archive</p>
      </div>
    </div>
  );
}
