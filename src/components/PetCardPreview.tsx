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

      <article className="passport-identity-page relative overflow-hidden rounded-[24px] border border-[#d9b36c]/30 p-4 sm:p-6">
        <div className="passport-identity-paper pointer-events-none absolute inset-0" />
        <div className="passport-identity-grain pointer-events-none absolute inset-0" />
        <div className="passport-identity-vignette pointer-events-none absolute inset-0" />
        <div className="passport-identity-watermark-ring pointer-events-none absolute -right-8 top-12 h-56 w-56 rounded-full" />
        <div className="passport-identity-watermark-text pointer-events-none absolute right-6 top-20 text-7xl leading-none">
          PL
        </div>

        <div className="relative min-h-[430px]">
          <div className="flex items-start justify-between gap-4 border-b border-[#9f7835]/28 pb-5">
            <div>
              <p className="passport-identity-header-kicker uppercase">
                PETLUMA PASSPORT
              </p>
              <p className="passport-identity-header-title mt-2 uppercase">
                Identity Page
              </p>
            </div>
            <p className="passport-identity-official-badge px-3 py-1.5 uppercase">
              Official
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[0.76fr_1.24fr]">
            <div>
              <div className="passport-identity-photo-frame relative flex aspect-[35/45] items-center justify-center overflow-hidden rounded-[0.35rem] p-2">
                <div className="passport-identity-photo-inner relative flex h-full w-full items-center justify-center overflow-hidden rounded-[0.15rem] bg-[#f8edd8]">
                  {display.photo ? (
                    <img
                      src={display.photo}
                      alt={`${display.name} passport portrait`}
                      className="block max-h-full max-w-full object-contain object-center saturate-[0.86] sepia-[0.08] contrast-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
                      <span className="text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#0b1c32]/42">
                        Passport Photo
                      </span>
                      <span className="mt-2 text-[0.44rem] uppercase tracking-[0.2em] text-[#7a6030]/72">
                        Will appear here
                      </span>
                    </div>
                  )}
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

            <div className="min-w-0 space-y-4">
              <PassportPreviewField
                label="PET NAME / 名字"
                value={display.name}
                large
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <PassportPreviewField
                  label="SPECIES / 物种"
                  value={display.species}
                />
                <PassportPreviewField label="BREED / 品种" value={display.breed} />
                <PassportPreviewField
                  label="GENDER / 性别"
                  value={display.gender}
                />
                <PassportPreviewField
                  label="DATE OF BIRTH / 出生日期"
                  value={display.birthdate}
                />
                <PassportPreviewField
                  label="PLACE OF ORIGIN / 出生地"
                  value={display.placeOfOrigin}
                />
                <PassportPreviewField
                  label="COMPANION ID / 伴侣编号"
                  value={display.companionId}
                />
              </div>
            </div>
          </div>

          <div className="relative mt-6">
            <div className="passport-identity-notes p-3 pr-20">
              <p className="passport-identity-notes__label uppercase">
                NOTES / 备注
              </p>
              <p className="passport-identity-notes__body text-base leading-5">
                {display.personality}
              </p>
            </div>
            <div
              className="passport-identity-seal absolute -bottom-4 right-2 flex h-20 w-20 rotate-[-11deg] items-center justify-center rounded-full text-center"
              aria-hidden="true"
            >
              <div className="passport-identity-seal__ring-dots pointer-events-none absolute inset-1 rounded-full" />
              <div className="passport-identity-seal__ring absolute inset-2 rounded-full" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <span className="passport-identity-seal__kicker text-[0.34rem] uppercase">
                  Official
                </span>
                <span className="passport-identity-seal__mark text-xl">PL</span>
                <span className="passport-identity-seal__kicker text-[0.32rem] uppercase">
                  Seal
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
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="passport-identity-field">
      <p className="passport-identity-field__label uppercase">{label}</p>
      <p
        className={
          large
            ? "passport-identity-field__value passport-identity-field__value--large break-words"
            : "passport-identity-field__value break-words text-xs sm:text-[0.84rem]"
        }
      >
        {value}
      </p>
    </div>
  );
}
