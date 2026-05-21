import type { Ref } from "react";
import { PassportCover } from "@/components/PassportCover";
import { getPassportDisplay } from "@/lib/passport-display";
import type { StoredCompanionCard } from "@/lib/cardStorage";

type FinalCompanionCardProps = {
  card: StoredCompanionCard;
  cardRef?: Ref<HTMLElement>;
};

export function FinalCompanionCard({ card, cardRef }: FinalCompanionCardProps) {
  const display = getPassportDisplay(card);

  return (
    <article
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-[1.4rem] border border-[#b8944d]/35 bg-[#081526] p-3 text-[#172030] shadow-[0_38px_120px_rgba(8,21,38,0.38)] sm:p-5 lg:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(219,178,103,0.24),transparent_19rem),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.13),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />

      <div className="relative grid min-h-[560px] gap-3 lg:grid-cols-[0.68fr_1.32fr] lg:gap-0">
        <PassportCover passportNo={display.passportNo} />

        <section className="passport-identity-page relative overflow-hidden rounded-[1.2rem] border border-[#d9b36c]/14 p-6 lg:rounded-l-none sm:p-8">
          <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-[#9f7835]/12" />
          <div className="pointer-events-none absolute inset-y-8 left-5 w-px bg-white/30" />
          <div className="passport-identity-paper pointer-events-none absolute inset-0" />
          <div className="passport-identity-grain pointer-events-none absolute inset-0" />
          <div className="passport-identity-vignette pointer-events-none absolute inset-0" />
          <div className="passport-identity-watermark-ring pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full" />
          <div className="passport-identity-watermark-text pointer-events-none absolute right-10 top-24 text-[9rem] leading-none">
            PL
          </div>

          <div className="relative flex min-h-[496px] flex-col">
            <header className="border-b border-[#9f7835]/10 pb-5">
              <div>
                <p className="passport-identity-header-kicker uppercase">
                  PETLUMA PASSPORT
                </p>
                <h1 className="passport-identity-header-title mt-3 uppercase">
                  Identity Page
                </h1>
              </div>
            </header>

            <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[0.82fr_1.18fr]">
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
                        <div className="flex h-full w-full items-center justify-center px-5 text-center text-[0.52rem] uppercase tracking-[0.32em] text-[#0b1c32]/28">
                          Portrait
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="passport-identity-id-block mt-5 p-4 text-center">
                  <p className="passport-identity-id-label uppercase">
                    Companion ID
                  </p>
                  <p className="passport-identity-id-value mt-2 uppercase">
                    {display.companionId}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div className="grid gap-5">
                  <PassportField label="Pet Name" value={display.name} large />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <PassportField label="Species" value={display.species} />
                    <PassportField label="Breed" value={display.breed} />
                    <PassportField label="Gender" value={display.gender} />
                    <PassportField
                      label="Date of Birth"
                      value={display.birthdate}
                    />
                    <PassportField
                      label="Place of Origin"
                      value={display.placeOfOrigin}
                    />
                    <PassportField
                      label="Passport No."
                      value={display.passportNo}
                    />
                  </div>
                </div>

                <div className="relative mt-9">
                  <div className="passport-identity-notes p-4 pr-28">
                    <p className="passport-identity-notes__label uppercase">
                      Notes
                    </p>
                    <p className="passport-identity-notes__body">
                      {display.personality}
                    </p>
                  </div>

                  <div
                    className="passport-identity-seal absolute -bottom-5 right-0 flex rotate-[-11deg] items-center justify-center rounded-full text-center"
                    aria-hidden="true"
                  >
                    <div className="passport-identity-seal__ring-dots pointer-events-none absolute inset-1 rounded-full" />
                    <div className="passport-identity-seal__ring absolute inset-2.5 rounded-full" />
                    <div className="relative flex h-full flex-col items-center justify-center">
                      <span className="passport-identity-seal__kicker uppercase">
                        Official
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

            <div className="passport-identity-mrz">
              <p className="passport-identity-mrz__line uppercase">{display.mrz.line1}</p>
              <p className="passport-identity-mrz__line uppercase">{display.mrz.line2}</p>
              <p className="passport-identity-mrz__line uppercase">{display.mrz.line3}</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function PassportField({
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
            : "passport-identity-field__value break-words uppercase"
        }
      >
        {value}
      </p>
    </div>
  );
}
