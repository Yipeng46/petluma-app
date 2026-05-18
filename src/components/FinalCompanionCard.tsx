import type { Ref } from "react";
import type { StoredCompanionCard } from "@/lib/cardStorage";

type FinalCompanionCardProps = {
  card: StoredCompanionCard;
  cardRef?: Ref<HTMLElement>;
};

export function FinalCompanionCard({ card, cardRef }: FinalCompanionCardProps) {
  const displayName = card.name.trim() || "Luma";
  const displayBreed = card.breed.trim() || "Golden Retriever";
  const displayFavoritePlace =
    card.favoritePlace.trim() || "The Pine Trail at Dusk";
  const displayGender = "COMPANION";
  const displayDateOfBirth = "NOT DECLARED";
  const displayKingdom = "PetLuma Kingdom";
  const displayKingdomId = "PLM-2026-0001";
  const mrzName = displayName
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<")
    .replace(/^<|<$/g, "") || "PETNAME";
  const mrzBreed =
    displayBreed
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "<")
      .slice(0, 18) || "COMPANION";

  return (
    <article
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-[1.4rem] border border-[#b8944d]/35 bg-[#081526] p-3 text-[#172030] shadow-[0_38px_120px_rgba(8,21,38,0.38)] sm:p-5 lg:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(219,178,103,0.24),transparent_19rem),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.13),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />

      <div className="relative grid min-h-[560px] gap-3 lg:grid-cols-[0.72fr_1.28fr] lg:gap-0">
        <section className="relative overflow-hidden rounded-[1.2rem] border border-[#d9b36c]/26 bg-[linear-gradient(145deg,#04101f_0%,#0a1a31_42%,#06111f_100%)] p-8 text-[#f6ecd8] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.045),inset_-18px_0_34px_rgba(0,0,0,0.22)] lg:rounded-r-none lg:border-r-0">
          <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.18)_44%,transparent_45%),radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.42)_1px,transparent_0),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:220px_220px,5px_5px,18px_18px]" />
          <div className="pointer-events-none absolute inset-y-7 right-6 w-px bg-[#d9b36c]/20" />
          <div className="relative flex h-full min-h-[496px] flex-col items-center justify-between text-center">
            <div>
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.46em] text-[#d9b36c]/82">
                Official Companion Document
              </p>
              <h2 className="mt-8 text-4xl font-semibold uppercase leading-[0.98] tracking-[0.08em] text-[#f1c873] sm:text-5xl">
                PetLuma
                <span className="mt-3 block text-2xl tracking-[0.16em] sm:text-3xl">
                  Passport
                </span>
              </h2>
            </div>

            <div className="relative flex h-40 w-32 flex-col items-center justify-center rounded-b-[2.4rem] rounded-t-[1.1rem] border-2 border-[#d9b36c]/64 bg-[#d9b36c]/6 text-[#d9b36c] shadow-[inset_0_0_24px_rgba(217,179,108,0.08)]">
              <div className="absolute -top-8 flex items-end gap-1.5">
                <span className="h-5 w-4 rounded-t-full border border-[#d9b36c]/62" />
                <span className="h-8 w-5 rounded-t-full border border-[#d9b36c]/80" />
                <span className="h-5 w-4 rounded-t-full border border-[#d9b36c]/62" />
              </div>
              <div className="relative mb-3 h-14 w-16">
                <span className="absolute left-6 top-0 h-5 w-5 rounded-full bg-[#d9b36c]/78" />
                <span className="absolute left-3 top-7 h-4 w-4 rounded-full bg-[#d9b36c]/70" />
                <span className="absolute right-3 top-7 h-4 w-4 rounded-full bg-[#d9b36c]/70" />
                <span className="absolute bottom-0 left-1/2 h-7 w-9 -translate-x-1/2 rounded-t-full bg-[#d9b36c]/78" />
              </div>
              <div className="h-px w-16 bg-[#d9b36c]/50" />
              <p className="mt-4 text-[0.52rem] uppercase tracking-[0.28em]">
                Crest
              </p>
            </div>

            <div className="w-full border-t border-[#d9b36c]/24 pt-6">
              <p className="text-[0.6rem] uppercase leading-5 tracking-[0.32em] text-[#f6ecd8]/50">
                {displayKingdom}
              </p>
              <p className="mt-4 text-[0.56rem] uppercase tracking-[0.28em] text-[#d9b36c]/74">
                {displayKingdomId}
              </p>
              <div className="mx-auto mt-6 grid h-10 w-12 grid-cols-3 gap-1 rounded-md border border-[#d9b36c]/55 p-1.5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={index} className="border border-[#d9b36c]/45" />
                ))}
              </div>
            </div>
          </div>
        </section>

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
                  {card.photoUrl ? (
                    <img
                      src={card.photoUrl}
                      alt={`${displayName} passport portrait`}
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
                    KINGDOM ID / 王国编号
                  </p>
                  <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-[#0b1c32]">
                    {displayKingdomId}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div className="grid gap-4">
                  <PassportField
                    label="PET NAME"
                    labelZh="名字"
                    value={displayName}
                    large
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PassportField
                      label="BREED"
                      labelZh="品种"
                      value={displayBreed}
                    />
                    <PassportField
                      label="GENDER"
                      labelZh="性别"
                      value={displayGender}
                    />
                    <PassportField
                      label="DATE OF BIRTH"
                      labelZh="出生日期"
                      value={displayDateOfBirth}
                    />
                    <PassportField
                      label="PLACE OF ORIGIN"
                      labelZh="出生地"
                      value={displayFavoritePlace}
                    />
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="border border-[#9f7835]/22 bg-[#0b1c32]/[0.035] p-4 pr-28">
                    <p className="text-[0.52rem] uppercase tracking-[0.25em] text-[#7d632e]">
                      NOTES / 备注
                    </p>
                    <p className="pet-serif mt-2 text-lg leading-6 text-[#26344a]">
                      {card.personality.trim() ||
                        "A cherished companion under PetLuma care."}
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
              <p>{`P<PLM<<${mrzName}<<<<<<<<<<<<<<<<`}</p>
              <p>{`PLM20260001PETLUMA<<<<<<<<<<<<`}</p>
              <p>{`${mrzBreed}<<<<<<<<<<<<<<<<<<<<<`}</p>
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
