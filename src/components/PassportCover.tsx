/* eslint-disable @next/next/no-img-element */

const KINGDOM_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

type PassportCoverProps = {
  passportNo: string;
};

export function PassportCover({ passportNo }: PassportCoverProps) {
  return (
    <section
      aria-label="PetLuma Passport cover"
      className="passport-cover relative flex min-h-[496px] flex-col overflow-x-visible overflow-y-hidden rounded-[1.15rem] border border-[#0c1829]/85 text-center lg:overflow-hidden lg:rounded-r-none lg:border-r-0 [container-type:size]"
    >
      <div className="passport-cover-leather pointer-events-none absolute inset-0" />
      <div className="passport-cover-grain pointer-events-none absolute inset-0" />
      <div className="passport-cover-vignette pointer-events-none absolute inset-0" />
      <div className="passport-cover-edge pointer-events-none absolute inset-0" />
      <div className="passport-cover-spine pointer-events-none absolute inset-y-0 left-0 w-[3px]" />

      <div className="passport-cover-inner relative z-10">
        <div className="passport-cover-title-group">
          <p className="passport-cover-gold passport-cover-kingdom">PETLUMA KINGDOM</p>
          <div className="passport-cover-heading">
            <h2 className="cover-title passport-cover-gold passport-cover-brand">PETLUMA</h2>
            <p className="passport-cover-gold passport-cover-passport">PASSPORT</p>
          </div>
        </div>

        <div className="passport-cover-hero">
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
              className="cover-gate-emblem passport-cover-emblem__art"
              draggable={false}
            />
          </div>
        </div>

        <footer className="passport-cover-bottom">
          <p className="cover-footer-text passport-cover-gold passport-cover-footer">
            OFFICIAL COMPANION DOCUMENT
          </p>
          {passportNo ? (
            <p className="passport-cover-number">{passportNo}</p>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
