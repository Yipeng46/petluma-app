/* eslint-disable @next/next/no-img-element */

const KINGDOM_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

type PassportCoverProps = {
  passportNo: string;
};

export function PassportCover({ passportNo }: PassportCoverProps) {
  return (
    <section
      aria-label="PetLuma Passport cover"
      className="passport-cover relative flex min-h-[496px] flex-col items-center justify-between overflow-hidden rounded-[1.15rem] border border-[#1e2d45]/80 px-6 py-9 text-center sm:px-7 sm:py-10 lg:rounded-r-none lg:border-r-0"
    >
      <div className="passport-cover-grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.04)_0%,transparent_38%,rgba(0,0,0,0.22)_100%)]" />
      <div className="pointer-events-none absolute inset-y-8 right-0 w-px bg-white/[0.06]" />

      <header className="relative z-10 w-full pt-1">
        <p className="passport-cover-gold passport-cover-label">
          PetLuma Kingdom
        </p>
      </header>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start pt-3">
        <div
          className="passport-cover-emblem"
          role="img"
          aria-label="PetLuma Kingdom Gate emblem"
        >
          <img
            src={KINGDOM_GATE_EMBLEM_SRC}
            alt=""
            width={220}
            height={330}
            className="passport-cover-emblem__art"
            draggable={false}
          />
        </div>

        <h2 className="passport-cover-gold passport-cover-title mt-8">
          <span className="block">PetLuma</span>
          <span className="passport-cover-subtitle mt-2 block">Passport</span>
        </h2>
      </div>

      <footer className="relative z-10 flex w-full flex-col items-center gap-5 pb-1">
        <p className="passport-cover-gold passport-cover-label">
          Official Companion Document
        </p>
        {passportNo ? (
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.26em] text-[#8f9bb0]/90">
            {passportNo}
          </p>
        ) : null}
        <PassportChipIcon />
      </footer>
    </section>
  );
}

function PassportChipIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      className="h-7 w-9 text-[#d4af37]/70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="6"
        width="40"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="12"
        width="20"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <circle cx="24" cy="18" r="3.5" stroke="currentColor" strokeWidth="0.85" />
      <path d="M8 14 H12 M8 18 H12 M8 22 H12" stroke="currentColor" strokeWidth="0.7" />
      <path d="M36 14 H40 M36 18 H40 M36 22 H40" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}
