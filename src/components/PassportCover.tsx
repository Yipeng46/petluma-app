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

      <header className="relative z-10 w-full">
        <p className="passport-cover-gold passport-cover-label">
          PetLuma Kingdom
        </p>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-6">
        <KingdomGateEmblem />
        <h2 className="passport-cover-gold passport-cover-title mt-8">
          <span className="block">PetLuma</span>
          <span className="passport-cover-subtitle mt-2 block">Passport</span>
        </h2>
      </div>

      <footer className="relative z-10 flex w-full flex-col items-center gap-5">
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

function KingdomGateEmblem() {
  return (
    <svg
      viewBox="0 0 100 150"
      className="h-[8.75rem] w-[5.85rem] text-[#b89558]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M50 12 C72 12 82 42 82 78 V118 C82 128 50 136 50 136 C50 136 18 128 18 118 V78 C18 42 28 12 50 12 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M32 26 H68 V112 C68 120 50 126 50 126 C50 126 32 120 32 112 Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.45"
      />
      <g fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.7">
        <path d="M42 18 H58 L50 12 Z" />
        <path d="M44 18 V14 M50 18 V11 M56 18 V14" fill="none" strokeLinecap="round" />
      </g>
      <g fill="currentColor">
        <path
          d="M50 38 L51 41.2 H54.2 L51.6 43.1 L52.6 46.2 L50 44.3 L47.4 46.2 L48.4 43.1 L45.8 41.2 H49 Z"
          fillOpacity="0.85"
        />
        <circle cx="38" cy="54" r="0.75" fillOpacity="0.35" />
        <circle cx="62" cy="50" r="0.6" fillOpacity="0.28" />
        <circle cx="58" cy="60" r="0.5" fillOpacity="0.22" />
      </g>
      <g fill="currentColor" fillOpacity="0.9">
        <path d="M34 108 C34 100 38 94 44 92 V108 H34 Z" />
        <path d="M44 92 C47 90 50 89 53 90 C56 91 60 95 62 100 V108 H56 V98 C53 96 50 96 47 98 V108 H44 V92 Z" />
        <path d="M58 100 C62 96 66 96 70 100 V108 H64 V98 C61 96 58 96 55 98 V108 H58 V100 Z" opacity="0.85" />
      </g>
    </svg>
  );
}

function PassportChipIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      className="h-7 w-9 text-[#b89558]/75"
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
