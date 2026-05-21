/* eslint-disable @next/next/no-img-element */

const KINGDOM_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

type PassportCoverProps = {
  passportNo: string;
};

export function PassportCover({ passportNo }: PassportCoverProps) {
  return (
    <section
      aria-label="PetLuma Passport cover"
      className="passport-cover relative flex min-h-[496px] flex-col overflow-hidden rounded-[1.15rem] border border-[#0c1829]/85 text-center lg:rounded-r-none lg:border-r-0 [container-type:size]"
    >
      <div className="passport-cover-leather pointer-events-none absolute inset-0" />
      <div className="passport-cover-grain pointer-events-none absolute inset-0" />
      <div className="passport-cover-vignette pointer-events-none absolute inset-0" />
      <div className="passport-cover-edge pointer-events-none absolute inset-0" />
      <div className="passport-cover-spine pointer-events-none absolute inset-y-0 left-0 w-[3px]" />

      <div className="passport-cover-inner relative z-10">
        <p className="passport-cover-gold passport-cover-kingdom">PETLUMA KINGDOM</p>

        <div className="passport-cover-hero">
          <div className="passport-cover-heading">
            <h2 className="passport-cover-gold passport-cover-brand">PETLUMA</h2>
            <p className="passport-cover-gold passport-cover-passport">PASSPORT</p>
          </div>

          <div
            className="passport-cover-emblem-stage"
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
        </div>

        <footer className="passport-cover-bottom">
          <p className="passport-cover-gold passport-cover-footer">
            OFFICIAL COMPANION DOCUMENT
          </p>
          {passportNo ? (
            <p className="passport-cover-number">{passportNo}</p>
          ) : null}
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
      <rect x="4" y="6" width="40" height="24" rx="3" stroke="currentColor" strokeWidth="0.9" />
      <rect
        x="14"
        y="12"
        width="20"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="24" cy="18" r="3.5" stroke="currentColor" strokeWidth="0.75" />
      <path d="M8 14 H12 M8 18 H12 M8 22 H12" stroke="currentColor" strokeWidth="0.65" />
      <path d="M36 14 H40 M36 18 H40 M36 22 H40" stroke="currentColor" strokeWidth="0.65" />
    </svg>
  );
}
