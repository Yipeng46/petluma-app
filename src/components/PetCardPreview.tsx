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
  const displayFavoritePlace = favoritePlace.trim() || "The Pine Trail at Dusk";
  const displaySpecies = "Dog";
  const displayBirthdate = "Not declared";
  const displayGender = "Companion";
  const displayPassportNo = "PLM-2026-0001";
  const displayIssuedIn = "PetLuma Kingdom";

  return (
    <section className="rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/74 p-3 shadow-[0_22px_70px_rgba(17,24,39,0.1)] backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#C8A97E]">
        <span>Passport Preview</span>
        <span>PetLuma Passport</span>
      </div>

      <article className="relative overflow-hidden rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8] p-4 text-[#111827] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] sm:p-6">
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(17,24,39,0.12)_53%,transparent_54%),linear-gradient(90deg,rgba(17,24,39,0.055)_1px,transparent_1px)] [background-size:92px_42px,28px_28px]" />
        <div className="pointer-events-none absolute right-8 top-24 text-8xl font-semibold leading-none tracking-[-0.08em] text-[#111827]/[0.035]">
          PL
        </div>

        <div className="relative min-h-[430px]">
          <div className="flex items-start justify-between gap-4 border-b border-[#E6DED2] pb-5">
            <div>
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.34em] text-[#C8A97E]">
                PETLUMA PASSPORT
              </p>
              <p className="mt-2 text-2xl font-semibold uppercase tracking-[0.14em] text-[#111827]">
                Pet Passport
              </p>
            </div>
            <p className="border border-[#E6DED2] px-3 py-1.5 text-[0.48rem] uppercase tracking-[0.18em] text-[#6E6A64]">
              Official
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[0.76fr_1.24fr]">
            <div>
              <div className="flex aspect-[35/45] items-center justify-center rounded-lg border border-[#E6DED2] bg-[#F8F3E8] p-2">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={`${displayName} passport portrait`}
                    className="block max-h-full max-w-full object-contain object-center saturate-[0.88] sepia-[0.04]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#111827]/[0.045] px-3 text-center">
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#111827]/50">
                      Passport Photo
                    </span>
                    <span className="mt-2 text-[0.46rem] uppercase tracking-[0.2em] text-[#6E6A64]">
                      Will appear here
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-3 border border-[#E6DED2] bg-[#F8F3E8]/70 p-2 text-center font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#111827]">
                Passport No.
                <span className="mt-1 block">{displayPassportNo}</span>
              </p>
            </div>

            <div className="min-w-0 space-y-3">
              <PassportPreviewField label="Name" value={displayName} large />
              <div className="grid gap-3 sm:grid-cols-2">
                <PassportPreviewField label="Species" value={displaySpecies} />
                <PassportPreviewField label="Breed" value={displayBreed} />
                <PassportPreviewField
                  label="Birthdate"
                  value={displayBirthdate}
                />
                <PassportPreviewField label="Gender" value={displayGender} />
                <PassportPreviewField
                  label="Issued In"
                  value={displayIssuedIn}
                />
                <PassportPreviewField
                  label="Place of Origin"
                  value={displayFavoritePlace}
                />
              </div>
            </div>
          </div>

          <div className="relative mt-6 border border-[#E6DED2] bg-[#F8F3E8]/70 p-3 pr-20">
            <p className="text-[0.48rem] font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">
              Notes
            </p>
            <p className="pet-serif mt-2 text-sm leading-5 text-[#1E293B]">
              {displayPersonality}
            </p>
            <div className="absolute -bottom-4 right-3 h-20 w-20 rotate-[-10deg] rounded-full border-2 border-[#C8A97E]/35 text-center text-[#C8A97E]/60 opacity-70">
              <div className="flex h-full flex-col items-center justify-center">
                <span className="text-[0.38rem] uppercase tracking-[0.16em]">
                  Official
                </span>
                <span className="pet-serif text-xl">PL</span>
                <span className="text-[0.36rem] uppercase tracking-[0.14em]">
                  Seal
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#E6DED2] pt-4 font-mono text-[0.56rem] uppercase leading-5 tracking-[0.22em] text-[#111827]/65">
            <p>P&lt;PLM&lt;&lt;{displayName.toUpperCase().replace(/[^A-Z0-9]+/g, "&lt;")}&lt;&lt;&lt;&lt;&lt;&lt;</p>
            <p>PLM20260001PETLUMA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
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
    <div className="border-b border-[#E6DED2] pb-2">
      <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#C8A97E]">
        {label}
      </p>
      <p
        className={
          large
            ? "pet-serif mt-1 break-words text-3xl leading-none tracking-[-0.045em] text-[#111827]"
            : "mt-1 break-words text-xs font-semibold uppercase tracking-[0.1em] text-[#111827]"
        }
      >
        {value}
      </p>
    </div>
  );
}
