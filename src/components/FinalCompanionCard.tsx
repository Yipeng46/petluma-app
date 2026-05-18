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
  const displayGender = "Companion";
  const displayDateOfBirth = "Not declared";
  const displayKingdomId = "PLM-2026-0001";
  const mrzName = displayName
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<")
    .replace(/^<|<$/g, "");

  return (
    <article
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-[2rem] border border-[#c7a15f]/30 bg-[#081526] p-4 text-[#172030] shadow-[0_36px_110px_rgba(8,21,38,0.34)] sm:rounded-[2.5rem] sm:p-6 lg:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(219,178,103,0.22),transparent_18rem),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.16),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] [background-size:5px_5px]" />

      <div className="relative grid min-h-[520px] gap-4 lg:grid-cols-[0.74fr_1.26fr] lg:gap-0">
        <section className="relative overflow-hidden rounded-[1.7rem] border border-[#d9b36c]/24 bg-[linear-gradient(145deg,#06101f_0%,#0b1c32_48%,#06101f_100%)] p-8 text-[#f6ecd8] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] lg:rounded-r-none lg:border-r-0">
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.2)_44%,transparent_45%),radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.45)_1px,transparent_0)] [background-size:220px_220px,6px_6px]" />
          <div className="relative flex h-full min-h-[440px] flex-col items-center justify-between text-center">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.48em] text-[#d9b36c]/78">
                Official Companion Document
              </p>
              <h2 className="pet-serif mt-8 text-5xl font-normal leading-[0.9] tracking-[-0.055em] text-[#fff7e8] sm:text-6xl">
                PetLuma
                <span className="mt-2 block text-4xl tracking-[-0.04em] sm:text-5xl">
                  Passport
                </span>
              </h2>
            </div>

            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#d9b36c]/55 bg-[#d9b36c]/8">
              <div className="absolute inset-3 rounded-full border border-[#d9b36c]/32" />
              <span className="pet-serif text-4xl text-[#d9b36c]">PL</span>
            </div>

            <div className="w-full border-t border-[#d9b36c]/22 pt-6">
              <p className="text-[0.62rem] uppercase leading-5 tracking-[0.32em] text-[#f6ecd8]/52">
                Kingdom of beloved companions
              </p>
              <p className="mt-4 text-[0.58rem] uppercase tracking-[0.28em] text-[#d9b36c]/72">
                {displayKingdomId}
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[1.7rem] border border-[#d9b36c]/28 bg-[linear-gradient(135deg,#fff8e9_0%,#f2e4c9_52%,#fffaf0_100%)] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)] lg:rounded-l-none sm:p-8">
          <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-[#b9914c]/35" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(8,21,38,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative flex min-h-[456px] flex-col">
            <header className="flex items-start justify-between gap-6 border-b border-[#b9914c]/35 pb-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8c6a2e]">
                  PetLuma Passport
                </p>
                <h1 className="pet-serif mt-3 text-4xl font-normal leading-none tracking-[-0.055em] text-[#0b1c32] sm:text-5xl">
                  Identity Page
                </h1>
              </div>
              <div className="rounded-full border border-[#b9914c]/45 px-4 py-2 text-[0.56rem] uppercase tracking-[0.24em] text-[#8c6a2e]">
                Official
              </div>
            </header>

            <div className="mt-7 grid flex-1 gap-7 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.1rem] border border-[#b9914c]/35 bg-[#0b1c32]/8 p-3">
                  {card.photoUrl ? (
                    <img
                      src={card.photoUrl}
                      alt={`${displayName} passport portrait`}
                      className="block max-h-full max-w-full object-contain object-center saturate-[0.86] sepia-[0.08]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-[0.85rem] bg-[#0b1c32]/12 px-5 text-center text-[0.58rem] uppercase tracking-[0.28em] text-[#0b1c32]/42">
                      Portrait
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-[1rem] border border-[#b9914c]/35 p-4 text-center">
                  <p className="text-[0.54rem] uppercase tracking-[0.28em] text-[#8c6a2e]">
                    Kingdom ID
                  </p>
                  <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-[#0b1c32]">
                    {displayKingdomId}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div className="grid gap-4">
                  <PassportField label="Pet Name" value={displayName} large />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PassportField label="Breed" value={displayBreed} />
                    <PassportField label="Gender" value={displayGender} />
                    <PassportField
                      label="Date of Birth"
                      value={displayDateOfBirth}
                    />
                    <PassportField
                      label="Place of Origin"
                      value={displayFavoritePlace}
                    />
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="rounded-[1rem] border border-[#b9914c]/25 bg-[#0b1c32]/5 p-4">
                    <p className="text-[0.54rem] uppercase tracking-[0.28em] text-[#8c6a2e]">
                      Notes
                    </p>
                    <p className="pet-serif mt-2 text-lg leading-6 text-[#26344a]">
                      {card.personality.trim() ||
                        "A cherished companion under PetLuma care."}
                    </p>
                  </div>

                  <div className="relative h-28 w-28 rounded-full border-2 border-[#b9914c]/55 text-center text-[#8c6a2e]">
                    <div className="absolute inset-2 rounded-full border border-[#b9914c]/35" />
                    <div className="flex h-full flex-col items-center justify-center">
                      <span className="text-[0.48rem] uppercase tracking-[0.2em]">
                        PetLuma
                      </span>
                      <span className="pet-serif text-2xl">Seal</span>
                      <span className="text-[0.44rem] uppercase tracking-[0.18em]">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#b9914c]/35 pt-4 font-mono text-[0.62rem] uppercase leading-5 tracking-[0.18em] text-[#0b1c32]/70 sm:text-xs">
              <p>{`P<PTL${mrzName}<<PETLUMA<PASSPORT<<<<<<<<<<<`}</p>
              <p>{`PLM20260001PETLUMA${displayBreed
                .toUpperCase()
                .replace(/[^A-Z0-9]+/g, "<")
                .slice(0, 18)}<<<<<<`}</p>
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
    <div className="border-b border-[#b9914c]/28 pb-3">
      <p className="text-[0.52rem] uppercase tracking-[0.24em] text-[#8c6a2e]">
        {label}
      </p>
      <p
        className={
          large
            ? "pet-serif mt-2 break-words text-4xl font-normal leading-none tracking-[-0.045em] text-[#0b1c32] sm:text-5xl"
            : "mt-2 break-words text-sm font-semibold uppercase tracking-[0.12em] text-[#0b1c32] sm:text-base"
        }
      >
        {value}
      </p>
    </div>
  );
}
