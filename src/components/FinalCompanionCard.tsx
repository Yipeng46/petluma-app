import type { Ref } from "react";
import type { StoredCompanionCard } from "@/lib/cardStorage";

type FinalCompanionCardProps = {
  card: StoredCompanionCard;
  cardRef?: Ref<HTMLElement>;
};

export function FinalCompanionCard({ card, cardRef }: FinalCompanionCardProps) {
  const displayName = card.name.trim() || "Luma";
  const displayBreed = card.breed.trim() || "Golden Retriever";
  const displayPersonality =
    card.personality.trim() || "Gentle, sun-warmed, and quietly adventurous.";
  const displayFavoritePlace =
    card.favoritePlace.trim() || "The pine trail at dusk";

  return (
    <article
      ref={cardRef}
      className="pet-card-grain relative w-full overflow-hidden rounded-[2rem] border border-[rgba(216,162,94,0.26)] bg-[radial-gradient(circle_at_14%_18%,rgba(247,243,238,0.08),transparent_18rem),radial-gradient(circle_at_78%_22%,rgba(216,162,94,0.1),transparent_22rem),linear-gradient(120deg,#241812_0%,#2b1c14_42%,#1d130f_100%)] p-5 text-[#f7f3ee] shadow-[inset_0_0_0_1px_rgba(247,243,238,0.04),0_34px_100px_rgba(47,33,25,0.24)] sm:rounded-[2.35rem] sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-[linear-gradient(to_right,transparent,rgba(216,162,94,0.42),transparent)]" />
      <div className="pointer-events-none absolute inset-x-10 bottom-8 h-px bg-[linear-gradient(to_right,transparent,rgba(247,243,238,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(108deg,transparent_0%,rgba(247,243,238,0.045)_36%,transparent_37%,transparent_60%,rgba(216,162,94,0.05)_72%,transparent_73%)]" />
      <div className="relative grid min-h-[440px] grid-cols-[0.88fr_1.12fr] gap-5 sm:min-h-[520px] sm:grid-cols-[0.94fr_1.06fr] sm:gap-10 lg:gap-14">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-[rgba(247,243,238,0.08)] bg-[rgba(247,243,238,0.045)] sm:rounded-[1.7rem]">
          {card.photoUrl ? (
            <img
              src={card.photoUrl}
              alt={`${displayName} companion portrait`}
              className="block h-full w-full object-cover object-center brightness-[0.96] contrast-[0.9] saturate-[0.82] sepia-[0.16]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#d9c4a2,#8d927b_58%,#5c4b35)] px-5 text-center text-[0.62rem] uppercase tracking-[0.24em] text-[rgba(255,248,235,0.8)] sm:text-xs sm:tracking-[0.3em]">
              Companion Portrait
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(216,162,94,0.16),transparent_34%),linear-gradient(180deg,transparent_48%,rgba(36,24,18,0.42))]" />
          <span className="absolute bottom-4 left-4 border-l border-[rgba(216,162,94,0.55)] pl-3 text-[0.52rem] uppercase tracking-[0.24em] text-[rgba(247,243,238,0.72)] sm:bottom-6 sm:left-6 sm:text-[0.58rem]">
            Outdoor Luxury
          </span>
        </div>

        <div className="flex min-w-0 flex-col justify-between py-1 sm:py-3">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-[rgba(216,162,94,0.18)] pb-5 sm:pb-7">
              <p className="text-[0.5rem] uppercase tracking-[0.28em] text-[#d8a25e] sm:text-[0.6rem] sm:tracking-[0.42em]">
                PetLuma Companion Card
              </p>
              <p className="hidden text-[0.54rem] uppercase tracking-[0.32em] text-[rgba(247,243,238,0.36)] sm:block">
                PL-2026
              </p>
            </div>

            <h2 className="pet-serif mt-12 break-words text-5xl font-normal leading-[0.86] tracking-[-0.075em] text-[#f7f3ee] sm:mt-16 sm:text-7xl lg:text-8xl">
              {displayName}
            </h2>
            <div className="mt-7 h-px w-16 bg-[rgba(216,162,94,0.58)] sm:mt-9 sm:w-24" />
          </div>

          <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
            <p className="pet-serif max-w-xl text-base leading-7 text-[rgba(247,243,238,0.76)] sm:text-2xl sm:leading-9">
              {displayPersonality}
            </p>

            <div className="grid gap-5 border-y border-[rgba(216,162,94,0.16)] py-5 sm:grid-cols-2 sm:gap-10 sm:py-7">
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.28em] text-[#d8a25e] sm:text-[0.56rem] sm:tracking-[0.36em]">
                  Breed
                </p>
                <p className="mt-3 text-xs leading-5 text-[rgba(247,243,238,0.64)] sm:text-sm sm:leading-6">
                  {displayBreed}
                </p>
              </div>
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.28em] text-[#d8a25e] sm:text-[0.56rem] sm:tracking-[0.36em]">
                  Favorite Place
                </p>
                <p className="mt-3 text-xs leading-5 text-[rgba(247,243,238,0.64)] sm:text-sm sm:leading-6">
                  {displayFavoritePlace}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.24em] text-[rgba(247,243,238,0.36)] sm:text-[0.56rem] sm:tracking-[0.34em]">
                  PetLuma
                </p>
                <p className="mt-1 hidden text-[0.52rem] uppercase tracking-[0.28em] text-[rgba(247,243,238,0.34)] sm:block">
                  Making pet life brighter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
