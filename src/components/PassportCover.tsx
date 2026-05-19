import { KingdomGateEmblem } from "@/components/KingdomGateEmblem";

type PassportCoverProps = {
  passportNo: string;
};

export function PassportCover({ passportNo }: PassportCoverProps) {
  return (
    <section
      aria-label="PetLuma Passport cover"
      className="passport-cover relative mx-auto aspect-[10/14] h-full min-h-[300px] w-full max-w-[340px] overflow-hidden rounded-[0.65rem] border border-[#0c1829]/90 [container-type:size] lg:mx-0 lg:max-w-none lg:rounded-r-none lg:border-r-0"
    >
      <div className="passport-cover-leather pointer-events-none absolute inset-0" />
      <div className="passport-cover-grain pointer-events-none absolute inset-0" />
      <div className="passport-cover-vignette pointer-events-none absolute inset-0" />
      <div className="passport-cover-edge pointer-events-none absolute inset-0" />
      <div className="passport-cover-spine pointer-events-none absolute inset-y-0 left-0 w-[3px]" />

      <div className="passport-cover-inner relative z-10 flex h-full flex-col items-center text-center">
        <header className="passport-cover-top shrink-0">
          <p className="passport-cover-gold passport-cover-kingdom">PetLuma Kingdom</p>
          <div className="passport-cover-heading">
            <h2 className="passport-cover-gold passport-cover-brand">PetLuma</h2>
            <p className="passport-cover-gold passport-cover-passport">Passport</p>
          </div>
        </header>

        <div
          className="passport-cover-emblem-stage"
          role="img"
          aria-label="PetLuma Kingdom Gate emblem"
        >
          <div className="passport-emblem-foil">
            <KingdomGateEmblem className="passport-cover-emblem__art" />
          </div>
        </div>

        <footer className="passport-cover-bottom shrink-0">
          <p className="passport-cover-gold passport-cover-footer">
            Official Companion Document
          </p>
          {passportNo ? <p className="passport-cover-number">{passportNo}</p> : null}
          <div className="passport-cover-chip-wrap">
            <PassportChipIcon />
          </div>
        </footer>
      </div>
    </section>
  );
}

function PassportChipIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      className="passport-cover-chip"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="6" width="40" height="24" rx="3" stroke="currentColor" strokeWidth="1" />
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
