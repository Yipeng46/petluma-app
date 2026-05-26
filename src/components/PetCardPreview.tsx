import { PassportPreviewDisclaimer } from "@/components/PassportPreviewDisclaimer";
import { getPassportDisplay } from "@/lib/passport-display";
import type { PassportData } from "@/lib/passport-data";

type PetCardPreviewProps = {
  passportData: PassportData;
};

export function PetCardPreview({ passportData }: PetCardPreviewProps) {
  const display = getPassportDisplay(passportData);

  return (
    <section className="max-w-full min-w-0 overflow-x-hidden rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/74 p-3 shadow-[0_22px_70px_rgba(17,24,39,0.1)] backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#C8A97E]">
        <span>Passport Preview</span>
        <span>PetLuma Passport</span>
      </div>

      <article className="passport-identity-page relative max-w-full min-w-0 overflow-hidden rounded-[24px] p-4 sm:p-6">
        <div className="passport-identity-paper pointer-events-none absolute inset-0" />
        <div className="passport-identity-cotton pointer-events-none absolute inset-0" />
        <div className="passport-identity-fiber pointer-events-none absolute inset-0" />
        <div className="passport-identity-grain pointer-events-none absolute inset-0" />
        <div className="passport-identity-ambient pointer-events-none absolute inset-0" />
        <div className="passport-identity-vignette pointer-events-none absolute inset-0" />
        <div className="passport-identity-capture pointer-events-none absolute inset-0" />
        <div className="passport-identity-edge pointer-events-none absolute inset-0" />

        <div className="passport-identity-body passport-identity-print-layer relative min-h-[430px]">
          <header className="passport-identity-header min-w-0 max-w-full">
            <div className="min-w-0 max-w-full">
              <p className="passport-identity-header-kicker uppercase">
                PETLUMA PASSPORT
              </p>
              <p className="passport-identity-header-title mt-2 uppercase">
                Identity Page
              </p>
            </div>
          </header>

          <div className="mt-7 grid max-w-full gap-7 lg:grid-cols-[0.76fr_1.24fr]">
            <div className="min-w-0 max-w-full">
              <div className="passport-identity-photo-stack">
                <div className="passport-identity-photo-mount">
                  <div className="passport-identity-photo-thickness" aria-hidden="true" />
                  <div className="passport-identity-photo-frame relative flex aspect-[35/45] items-center justify-center overflow-hidden rounded-[0.12rem] p-[3px]">
                    <span className="passport-identity-photo-corner passport-identity-photo-corner--tl" aria-hidden="true" />
                    <span className="passport-identity-photo-corner passport-identity-photo-corner--tr" aria-hidden="true" />
                    <span className="passport-identity-photo-corner passport-identity-photo-corner--bl" aria-hidden="true" />
                    <span className="passport-identity-photo-corner passport-identity-photo-corner--br" aria-hidden="true" />
                    <div className="passport-identity-photo-inner relative flex h-full w-full items-center justify-center overflow-hidden">
                      {display.photo ? (
                        <img
                          src={display.photo}
                          alt={`${display.name} passport portrait`}
                          className="passport-identity-photo-img"
                          data-testid="passport-preview-photo"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
                          <span className="text-[0.5rem] font-normal uppercase tracking-[0.34em] text-[#1a1612]/20">
                            Passport Photo
                          </span>
                          <span className="mt-2 text-[0.4rem] font-normal uppercase tracking-[0.26em] text-[#6a5a48]/34">
                            Will appear here
                          </span>
                        </div>
                      )}
                      <div className="passport-identity-photo-feather pointer-events-none absolute inset-0" />
                      <div className="passport-identity-photo-laminate pointer-events-none absolute inset-0" />
                      <div className="passport-identity-photo-print pointer-events-none absolute inset-0" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <PassportPreviewField
                  label="Companion ID"
                  value={display.companionId}
                />
              </div>
            </div>

            <div className="min-w-0 max-w-full">
              <div className="passport-identity-fields">
                <PassportPreviewField label="Pet Name" value={display.name} large />

                <div className="passport-identity-fields__primary">
                  <PassportPreviewField label="Species" value={display.species} />
                  <PassportPreviewField label="Breed" value={display.breed} />
                  <PassportPreviewField label="Gender" value={display.gender} />
                  <PassportPreviewField
                    label="Date of Birth"
                    value={display.birthdate}
                  />
                  <PassportPreviewField
                    label="Country"
                    value={display.placeOfOrigin}
                  />
                  <PassportPreviewField
                    label="Passport No."
                    value={display.passportNo}
                    primary
                  />
                </div>

                <div className="passport-identity-fields__registry">
                  <PassportPreviewField
                    label="Registry"
                    value={display.registry}
                    official
                  />
                  <PassportPreviewField
                    label="Classification"
                    value={display.classification}
                    official
                  />
                  <PassportPreviewField
                    label="Issued By"
                    value={display.issuedBy}
                    official
                  />
                  <PassportPreviewField
                    label="Registered"
                    value={display.registered}
                    official
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 min-h-[4.5rem]">
            <div
              className="passport-identity-seal absolute -bottom-5 -right-1 flex rotate-[-13deg] items-center justify-center rounded-full text-center"
              aria-hidden="true"
            >
              <div className="passport-identity-seal__ring pointer-events-none absolute inset-2.5 rounded-full" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <span className="passport-identity-seal__kicker text-[0.32rem] uppercase">
                  Registry
                </span>
                <span className="passport-identity-seal__mark text-xl">PL</span>
                <span className="passport-identity-seal__kicker text-[0.3rem] uppercase">
                  PetLuma
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="passport-identity-mrz">
          <p className="passport-identity-mrz__line uppercase">{display.mrz.line1}</p>
          <p className="passport-identity-mrz__line uppercase">{display.mrz.line2}</p>
          <p className="passport-identity-mrz__line uppercase">{display.mrz.line3}</p>
        </div>
      </article>

      <PassportPreviewDisclaimer />
    </section>
  );
}

function PassportPreviewField({
  label,
  value,
  large = false,
  primary = false,
  official = false,
  wide = false,
}: {
  label: string;
  value: string;
  large?: boolean;
  primary?: boolean;
  official?: boolean;
  wide?: boolean;
}) {
  const fieldClass = [
    "passport-identity-field",
    large ? "passport-identity-field--hero" : "",
    official ? "passport-identity-field--official" : "",
    wide ? "passport-identity-field--wide" : "",
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
