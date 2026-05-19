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

      <div className="relative grid min-h-[560px] gap-3 lg:grid-cols-[minmax(220px,0.36fr)_1.64fr] lg:items-stretch lg:gap-0">
        <PassportCover passportNo={display.passportNo} />

        <section className="relative overflow-hidden rounded-[1.2rem] border border-[#d9b36c]/30 bg-[linear-gradient(135deg,#fff8e8_0%,#f3e6ca_50%,#fffaf0_100%)] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75),inset_18px_0_34px_rgba(112,82,38,0.08)] lg:rounded-l-none sm:p-8">
          <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-[#9f7835]/35" />
          <div className="pointer-events-none absolute inset-y-8 left-5 w-px bg-white/55" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.16)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.045)_1px,transparent_1px)] [background-size:92px_42px,28px_28px,28px_28px]" />
          <div className="pointer-events-none absolute -right-10 top-20 h-72 w-72 rounded-full border-[28px] border-[#b9914c]/10" />
          <div className="pointer-events-none absolute right-12 top-28 text-[9rem] font-semibold leading-none tracking-[-0.08em] text-[#0b1c32]/[0.035]">
            PL
          </div>

          <div className="relative flex min-h-[496px] flex-col">
            <header className="flex items-start justify-between gap-6 border-b border-[#9f7835]/30 pb-5">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.44em] text-[#7d632e]">
                  PETLUMA PASSPORT
                </p>
                <h1 className="mt-3 text-3xl font-semibold uppercase leading-none tracking-[0.16em] text-[#0b1c32] sm:text-4xl">
                  Identity Page
                </h1>
              </div>
              <div className="border border-[#9f7835]/40 px-4 py-2 text-[0.52rem] uppercase leading-4 tracking-[0.22em] text-[#7d632e]">
                Official
                <br />
                Document
              </div>
            </header>

            <div className="mt-7 grid flex-1 gap-7 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <div className="relative flex aspect-[35/45] items-center justify-center overflow-hidden rounded-md border border-[#9f7835]/42 bg-[#fdf4df] p-2 shadow-[0_10px_24px_rgba(8,21,38,0.08)]">
                  {display.photo ? (
                    <img
                      src={display.photo}
                      alt={`${display.name} passport portrait`}
                      className="block max-h-full max-w-full object-contain object-center saturate-[0.88] sepia-[0.06]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#0b1c32]/10 px-5 text-center text-[0.56rem] uppercase tracking-[0.28em] text-[#0b1c32]/42">
                      Portrait
                    </div>
                  )}
                </div>

                <div className="mt-5 border border-[#9f7835]/30 bg-white/20 p-4 text-center">
                  <p className="text-[0.5rem] uppercase tracking-[0.24em] text-[#7d632e]">
                    COMPANION ID / 伴侣编号
                  </p>
                  <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-[#0b1c32]">
                    {display.companionId}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div className="grid gap-4">
                  <PassportField
                    label="PET NAME"
                    labelZh="名字"
                    value={display.name}
                    large
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PassportField
                      label="SPECIES"
                      labelZh="物种"
                      value={display.species}
                    />
                    <PassportField
                      label="BREED"
                      labelZh="品种"
                      value={display.breed}
                    />
                    <PassportField
                      label="GENDER"
                      labelZh="性别"
                      value={display.gender}
                    />
                    <PassportField
                      label="DATE OF BIRTH"
                      labelZh="出生日期"
                      value={display.birthdate}
                    />
                    <PassportField
                      label="PLACE OF ORIGIN"
                      labelZh="出生地"
                      value={display.placeOfOrigin}
                    />
                    <PassportField
                      label="PASSPORT NO."
                      labelZh="护照编号"
                      value={display.passportNo}
                    />
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="border border-[#9f7835]/22 bg-[#0b1c32]/[0.035] p-4 pr-28">
                    <p className="text-[0.52rem] uppercase tracking-[0.25em] text-[#7d632e]">
                      NOTES / 备注
                    </p>
                    <p className="pet-serif mt-2 text-lg leading-6 text-[#26344a]">
                      {display.personality}
                    </p>
                  </div>

                  <div className="absolute -bottom-4 right-0 h-28 w-28 rotate-[-10deg] rounded-full border-2 border-[#9f7835]/38 text-center text-[#8c6a2e]/65 opacity-65">
                    <div className="absolute inset-2 rounded-full border border-[#9f7835]/28" />
                    <div className="flex h-full flex-col items-center justify-center">
                      <span className="text-[0.44rem] uppercase tracking-[0.18em]">
                        Official
                      </span>
                      <span className="pet-serif text-2xl">Seal</span>
                      <span className="text-[0.44rem] uppercase tracking-[0.18em]">
                        PetLuma
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#9f7835]/32 pt-4 font-mono text-[0.58rem] uppercase leading-5 tracking-[0.24em] text-[#0b1c32]/72 sm:text-[0.68rem]">
              <p>{display.mrz.line1}</p>
              <p>{display.mrz.line2}</p>
              <p>{display.mrz.line3}</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function PassportField({
  label,
  labelZh,
  value,
  large = false,
}: {
  label: string;
  labelZh: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="border-b border-[#9f7835]/25 pb-3">
      <p className="text-[0.48rem] uppercase tracking-[0.22em] text-[#7d632e]">
        {label} / {labelZh}
      </p>
      <p
        className={
          large
            ? "pet-serif mt-2 break-words text-4xl font-normal leading-none tracking-[-0.045em] text-[#0b1c32] sm:text-5xl"
            : "mt-2 break-words text-sm font-semibold uppercase tracking-[0.11em] text-[#0b1c32] sm:text-[0.95rem]"
        }
      >
        {value}
      </p>
    </div>
  );
}
