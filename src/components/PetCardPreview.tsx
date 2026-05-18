type PetCardPreviewProps = {
  name: string;
  breed: string;
  personality: string;
  favoritePlace: string;
  photoUrl: string | null;
};

export function PetCardPreview({
  name,
  breed,
  personality,
  favoritePlace,
  photoUrl,
}: PetCardPreviewProps) {
  const displayName = name.trim() || "Luma";
  const displayBreed = breed.trim() || "Golden Retriever";
  const displayPersonality =
    personality.trim() || "Gentle, sun-warmed, and quietly adventurous.";
  const displayFavoritePlace = favoritePlace.trim() || "The pine trail at dusk";

  return (
    <section className="rounded-[2.2rem] border border-[#c7a15f]/20 bg-[#fff8ed]/50 p-3 shadow-[0_28px_80px_rgba(69,46,30,0.16)] backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between px-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#6f5b4b]">
        <span>Live Companion Card</span>
        <span>PetLuma</span>
      </div>

      <article className="pet-card-grain relative overflow-hidden rounded-[1.8rem] border border-[rgba(216,162,94,0.26)] bg-[radial-gradient(circle_at_14%_18%,rgba(247,243,238,0.08),transparent_16rem),radial-gradient(circle_at_78%_22%,rgba(216,162,94,0.1),transparent_20rem),linear-gradient(120deg,#241812_0%,#2b1c14_42%,#1d130f_100%)] p-4 text-[#f7f3ee] shadow-[inset_0_0_0_1px_rgba(247,243,238,0.04),0_30px_70px_rgba(47,33,25,0.22)] sm:p-6">
        <div className="pointer-events-none absolute left-6 right-6 top-6 h-px bg-[linear-gradient(to_right,transparent,rgba(216,162,94,0.42),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(108deg,transparent_0%,rgba(247,243,238,0.045)_36%,transparent_37%,transparent_60%,rgba(216,162,94,0.05)_72%,transparent_73%)]" />

        <div className="relative grid min-h-[360px] grid-cols-[0.86fr_1.14fr] gap-3 sm:min-h-[390px] sm:grid-cols-[0.92fr_1.08fr] sm:gap-7">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-[rgba(247,243,238,0.08)] bg-[rgba(247,243,238,0.045)]">
            {photoUrl ? (
              // Plain img keeps local object URLs simple and dependency-free.
              <img
                src={photoUrl}
                alt={`${displayName} companion portrait`}
                className="h-full w-full object-cover brightness-[0.96] contrast-[0.9] saturate-[0.82] sepia-[0.16]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#d9c4a2,#8d927b_58%,#5c4b35)] px-5 text-center text-[0.62rem] uppercase tracking-[0.24em] text-[rgba(255,248,235,0.8)] sm:px-8 sm:text-xs sm:tracking-[0.3em]">
                Add a portrait
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(216,162,94,0.16),transparent_34%),linear-gradient(180deg,transparent_52%,rgba(36,24,18,0.42))]" />
            <span className="absolute bottom-3 left-3 border-l border-[rgba(216,162,94,0.55)] pl-2.5 text-[0.5rem] uppercase tracking-[0.2em] text-[rgba(247,243,238,0.72)] sm:bottom-4 sm:left-4 sm:text-[0.56rem] sm:tracking-[0.24em]">
              Outdoor Study
            </span>
          </div>

          <div className="flex min-w-0 flex-col justify-between px-1 py-1 sm:px-2">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(216,162,94,0.18)] pb-4 sm:pb-5">
                <p className="text-[0.5rem] uppercase tracking-[0.24em] text-[#d8a25e] sm:text-[0.56rem] sm:tracking-[0.36em]">
                  Companion Card
                </p>
                <p className="hidden text-[0.54rem] uppercase tracking-[0.28em] text-[rgba(247,243,238,0.36)] sm:block">
                  PL-2026
                </p>
              </div>

              <h2 className="pet-serif mt-8 break-words text-4xl font-normal leading-[0.9] tracking-[-0.075em] text-[#f7f3ee] sm:mt-10 sm:text-6xl lg:text-7xl">
                {displayName}
              </h2>

              <div className="mt-5 h-px w-14 bg-[rgba(216,162,94,0.58)] sm:mt-7 sm:w-20" />
            </div>

            <div className="mt-8 space-y-6 sm:mt-11 sm:space-y-8">
              <p className="pet-serif max-w-md text-sm leading-6 text-[rgba(247,243,238,0.76)] sm:text-xl sm:leading-8">
                {displayPersonality}
              </p>

              <div className="grid gap-3 border-y border-[rgba(216,162,94,0.16)] py-4 sm:grid-cols-2 sm:gap-5 sm:py-5">
                <div>
                  <p className="text-[0.5rem] uppercase tracking-[0.22em] text-[#d8a25e] sm:text-[0.54rem] sm:tracking-[0.32em]">
                    Breed
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[rgba(247,243,238,0.64)] sm:text-sm sm:leading-6">
                    {displayBreed}
                  </p>
                </div>
                <div>
                  <p className="text-[0.5rem] uppercase tracking-[0.22em] text-[#d8a25e] sm:text-[0.54rem] sm:tracking-[0.32em]">
                    Favorite Place
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[rgba(247,243,238,0.64)] sm:text-sm sm:leading-6">
                    {displayFavoritePlace}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.5rem] uppercase tracking-[0.2em] text-[rgba(247,243,238,0.36)] sm:text-[0.56rem] sm:tracking-[0.28em]">
                    PetLuma
                  </p>
                  <p className="mt-1 hidden text-[0.52rem] uppercase tracking-[0.28em] text-[rgba(247,243,238,0.34)] sm:block">
                    Making pet life brighter
                  </p>
                </div>
                <span className="h-8 w-8 rounded-full border border-[rgba(216,162,94,0.36)] bg-transparent text-center text-[0.52rem] leading-8 tracking-[0.14em] text-[#d8a25e] sm:h-10 sm:w-10 sm:text-[0.62rem] sm:leading-10 sm:tracking-[0.18em]">
                  PL
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
