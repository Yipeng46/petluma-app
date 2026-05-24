import { PassportCover } from "@/components/PassportCover";
import { getPassportDisplay } from "@/lib/passport-display";
import type { PassportData } from "@/lib/passport-data";

const LANDING_DEMO_PASSPORT: PassportData = {
  ownerEmail: "",
  photo: null,
  name: "Luma",
  breed: "Golden Retriever",
  gender: "Female",
  birthdate: "2024-03-15",
  species: "Dog",
  personality: "",
  placeOfOrigin: "PetLuma Kingdom",
  passportNo: "PLM-2026-00001",
  companionId: "PLK-AU-8K3QX",
};

export function LandingPassportHeroPreview() {
  const display = getPassportDisplay(LANDING_DEMO_PASSPORT);

  return (
    <div className="relative max-w-full min-w-0">
      <div className="pointer-events-none absolute -left-8 top-10 h-48 w-48 rounded-full bg-[#b9914c]/18 blur-3xl" />
      <div className="relative max-w-full overflow-hidden rounded-[1.6rem] border border-[#b8944d]/26 bg-[#fff8e8]/62 p-2 shadow-[0_30px_90px_rgba(8,21,38,0.13)] backdrop-blur sm:p-4">
        <article
          aria-hidden="true"
          className="relative w-full max-w-full min-w-0 overflow-hidden rounded-[1.25rem] border border-[#b8944d]/35 bg-[#081526] p-2 text-[#172030] shadow-[0_38px_120px_rgba(8,21,38,0.38)] sm:p-3 md:p-4"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(219,178,103,0.24),transparent_19rem),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.13),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />

          <div className="passport-spread relative grid min-h-0 gap-2 md:min-h-[520px] md:grid-cols-[0.68fr_1.32fr] md:gap-0">
            <PassportCover passportNo={display.passportNo} />

            <section className="passport-identity-page relative overflow-hidden rounded-[1rem] p-4 md:rounded-l-none sm:p-5 md:p-6">
              <div className="passport-identity-paper pointer-events-none absolute inset-0" />
              <div className="passport-identity-cotton pointer-events-none absolute inset-0" />
              <div className="passport-identity-fiber pointer-events-none absolute inset-0" />
              <div className="passport-identity-grain pointer-events-none absolute inset-0" />
              <div className="passport-identity-ambient pointer-events-none absolute inset-0" />
              <div className="passport-identity-vignette pointer-events-none absolute inset-0" />
              <div className="passport-identity-capture pointer-events-none absolute inset-0" />
              <div className="passport-identity-edge pointer-events-none absolute inset-0" />

              <div className="passport-identity-body passport-identity-print-layer relative flex min-h-0 flex-col md:min-h-[460px]">
                <header className="passport-identity-header">
                  <div>
                    <p className="passport-identity-header-kicker uppercase">
                      PETLUMA PASSPORT
                    </p>
                    <h2 className="passport-identity-header-title mt-2 uppercase md:mt-3">
                      Identity Page
                    </h2>
                  </div>
                </header>

                <div className="mt-5 grid flex-1 gap-5 md:mt-7 md:grid-cols-[0.82fr_1.18fr] md:gap-7">
                  <div>
                    <div className="passport-identity-photo-stack mx-auto max-w-[8.5rem] md:max-w-none">
                      <div className="passport-identity-photo-mount">
                        <div
                          className="passport-identity-photo-thickness"
                          aria-hidden="true"
                        />
                        <div className="passport-identity-photo-frame relative flex aspect-[35/45] items-center justify-center overflow-hidden rounded-[0.12rem] p-[3px]">
                          <span
                            className="passport-identity-photo-corner passport-identity-photo-corner--tl"
                            aria-hidden="true"
                          />
                          <span
                            className="passport-identity-photo-corner passport-identity-photo-corner--tr"
                            aria-hidden="true"
                          />
                          <span
                            className="passport-identity-photo-corner passport-identity-photo-corner--bl"
                            aria-hidden="true"
                          />
                          <span
                            className="passport-identity-photo-corner passport-identity-photo-corner--br"
                            aria-hidden="true"
                          />
                          <div className="passport-identity-photo-inner relative flex h-full w-full items-center justify-center overflow-hidden">
                            <div className="flex h-full w-full items-center justify-center px-3 text-center text-[0.5rem] font-normal uppercase tracking-[0.34em] text-[#1a1612]/20">
                              Portrait
                            </div>
                            <div className="passport-identity-photo-feather pointer-events-none absolute inset-0" />
                            <div className="passport-identity-photo-laminate pointer-events-none absolute inset-0" />
                            <div className="passport-identity-photo-print pointer-events-none absolute inset-0" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="passport-identity-id-block mt-3 p-3 text-center md:mt-4 md:p-4">
                      <p className="passport-identity-id-label uppercase">
                        Companion ID
                      </p>
                      <p className="passport-identity-id-value mt-1 uppercase md:mt-2">
                        {display.companionId}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between">
                    <div className="passport-identity-fields">
                      <LandingField label="Pet Name" value={display.name} large />

                      <div className="passport-identity-fields__primary">
                        <LandingField label="Species" value={display.species} />
                        <LandingField label="Breed" value={display.breed} />
                        <LandingField label="Gender" value={display.gender} />
                        <LandingField
                          label="Date of Birth"
                          value={display.birthdate}
                        />
                        <LandingField
                          label="Place of Origin"
                          value={display.placeOfOrigin}
                        />
                        <LandingField
                          label="Passport No."
                          value={display.passportNo}
                          primary
                        />
                      </div>

                      <div className="passport-identity-fields__registry">
                        <LandingField
                          label="Registry"
                          value={display.registry}
                          official
                        />
                        <LandingField
                          label="Classification"
                          value={display.classification}
                          official
                        />
                        <LandingField
                          label="Issued By"
                          value={display.issuedBy}
                          official
                        />
                        <LandingField
                          label="Registered"
                          value={display.registered}
                          official
                        />
                      </div>
                    </div>

                    <div className="relative mt-6 md:mt-8">
                      <div className="passport-identity-notes p-3 pr-16 pb-4 md:p-4 md:pr-20 md:pb-5">
                        <p className="passport-identity-notes__label uppercase">
                          Notes
                        </p>
                        <p className="passport-identity-notes__body">
                          Officially registered under PetLuma Kingdom.
                        </p>
                      </div>

                      <div
                        className="passport-identity-seal absolute -bottom-5 -right-1 flex rotate-[-13deg] items-center justify-center rounded-full text-center md:-bottom-7 md:-right-2"
                        aria-hidden="true"
                      >
                        <div className="passport-identity-seal__ring pointer-events-none absolute inset-2 rounded-full md:inset-3" />
                        <div className="relative flex h-full flex-col items-center justify-center">
                          <span className="passport-identity-seal__kicker uppercase">
                            Registry
                          </span>
                          <span className="passport-identity-seal__mark">PL</span>
                          <span className="passport-identity-seal__kicker uppercase">
                            PetLuma
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="passport-identity-mrz">
                <p className="passport-identity-mrz__line uppercase">
                  {display.mrz.line1}
                </p>
                <p className="passport-identity-mrz__line uppercase">
                  {display.mrz.line2}
                </p>
                <p className="passport-identity-mrz__line uppercase">
                  {display.mrz.line3}
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

function LandingField({
  label,
  value,
  large = false,
  primary = false,
  official = false,
}: {
  label: string;
  value: string;
  large?: boolean;
  primary?: boolean;
  official?: boolean;
}) {
  const fieldClass = [
    "passport-identity-field",
    large ? "passport-identity-field--hero" : "",
    official ? "passport-identity-field--official" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const valueClass = [
    "break-words",
    large
      ? "passport-identity-field__value passport-identity-field__value--large"
      : "passport-identity-field__value uppercase",
    !large && primary ? "passport-identity-field__value--primary" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={fieldClass}>
      <p className="passport-identity-field__label uppercase">{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}
