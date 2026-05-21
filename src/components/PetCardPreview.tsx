import { getPassportDisplay } from "@/lib/passport-display";
import type { PassportData } from "@/lib/passport-data";

type PetCardPreviewProps = {
  passportData: PassportData;
};

export function PetCardPreview({ passportData }: PetCardPreviewProps) {
  const display = getPassportDisplay(passportData);

  return (
    <section className="rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/74 p-3 shadow-[0_22px_70px_rgba(17,24,39,0.1)] backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#C8A97E]">
        <span>Passport Preview</span>
        <span>PetLuma Passport</span>
      </div>

      <article className="passport-identity-page relative overflow-hidden rounded-[24px] border border-[#d9b36c]/14 p-4 sm:p-6">
        <div className="passport-identity-paper pointer-events-none absolute inset-0" />
        <div className="passport-identity-grain pointer-events-none absolute inset-0" />
        <div className="passport-identity-security pointer-events-none absolute inset-0" />
        <div className="passport-identity-fine-lines pointer-events-none absolute inset-0" />
        <div className="passport-identity-vignette pointer-events-none absolute inset-0" />
        <div className="passport-identity-watermark-ring pointer-events-none absolute -right-8 top-12 h-56 w-56 rounded-full" />
        <div className="passport-identity-watermark-text pointer-events-none absolute right-6 top-20 text-7xl leading-none">
          PL
        </div>

        <div className="relative min-h-[430px]">
          <div className="border-b border-[#9f7835]/10 pb-5">
            <div>
              <p className="passport-identity-header-kicker uppercase">
                PETLUMA PASSPORT
              </p>
              <p className="passport-identity-header-title mt-2 uppercase">
                Identity Page
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[0.76fr_1.24fr]">
            <div>
              <div className="passport-identity-photo-mount">
                <div className="passport-identity-photo-frame relative flex aspect-[35/45] items-center justify-center overflow-hidden rounded-[0.2rem] p-1">
                  <div className="passport-identity-photo-inner relative flex h-full w-full items-center justify-center overflow-hidden bg-[#faf7f0]">
                    {display.photo ? (
                      <img
                        src={display.photo}
                        alt={`${display.name} passport portrait`}
                        className="block max-h-full max-w-full object-contain object-center saturate-[0.84] sepia-[0.1] contrast-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
                        <span className="text-[0.52rem] font-medium uppercase tracking-[0.32em] text-[#0b1c32]/28">
                          Passport Photo
                        </span>
                        <span className="mt-2 text-[0.42rem] uppercase tracking-[0.24em] text-[#7a6030]/45">
                          Will appear here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="passport-identity-id-block mt-3 p-2.5 text-center">
                <p className="passport-identity-id-label uppercase">
                  Passport No.
                </p>
                <p className="passport-identity-id-value mt-1 uppercase">
                  {display.passportNo}
                </p>
              </div>
            </div>

            <div className="min-w-0">
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
                    label="Place of Origin"
                    value={display.placeOfOrigin}
                  />
                  <PassportPreviewField
                    label="Companion ID"
                    value={display.companionId}
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

          <div className="relative mt-6">
            <div className="passport-identity-notes p-3 pr-20">
              <p className="passport-identity-notes__label uppercase">
                Notes
              </p>
              <p className="passport-identity-notes__body text-base leading-5">
                {display.personality}
              </p>
            </div>
            <div
              className="passport-identity-seal absolute -bottom-5 -right-1 flex h-20 w-20 rotate-[-13deg] items-center justify-center rounded-full text-center"
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

          <div className="passport-identity-mrz">
            <p className="passport-identity-mrz__line uppercase">{display.mrz.line1}</p>
            <p className="passport-identity-mrz__line uppercase">{display.mrz.line2}</p>
            <p className="passport-identity-mrz__line uppercase">{display.mrz.line3}</p>
          </div>
        </div>
      </article>
    </section>
  );
}

function PassportPreviewField({
  label,
  value,
  large = false,
  official = false,
  wide = false,
}: {
  label: string;
  value: string;
  large?: boolean;
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

  return (
    <div className={fieldClass}>
      <p className="passport-identity-field__label uppercase">{label}</p>
      <p
        className={
          large
            ? "passport-identity-field__value passport-identity-field__value--large break-words"
            : "passport-identity-field__value break-words uppercase"
        }
      >
        {value}
      </p>
    </div>
  );
}
