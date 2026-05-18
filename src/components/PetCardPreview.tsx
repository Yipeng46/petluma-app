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

  return (
    <section className="rounded-[1.4rem] border border-[#b8944d]/28 bg-[#fff8e8]/62 p-3 shadow-[0_28px_90px_rgba(8,21,38,0.15)] backdrop-blur sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#7d632e]">
        <span>Live Passport Preview</span>
        <span>PetLuma</span>
      </div>

      <article className="relative overflow-hidden rounded-[1.25rem] border border-[#b8944d]/35 bg-[#081526] p-3 text-[#172030] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(8,21,38,0.22)] sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(219,178,103,0.22),transparent_14rem),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.25))]" />

        <div className="relative grid min-h-[390px] gap-3 md:grid-cols-[0.62fr_1.38fr]">
          <div className="relative overflow-hidden rounded-[1rem] border border-[#d9b36c]/28 bg-[linear-gradient(145deg,#04101f_0%,#0a1a31_48%,#06111f_100%)] p-5 text-center text-[#f6ecd8]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.45)_1px,transparent_0),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.18)_44%,transparent_45%)] [background-size:5px_5px,180px_180px]" />
            <div className="relative flex h-full min-h-[340px] flex-col items-center justify-between">
              <div>
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.34em] text-[#d9b36c]/80">
                  Official Companion Document
                </p>
                <p className="mt-5 text-2xl font-semibold uppercase leading-tight tracking-[0.12em] text-[#f1c873]">
                  PetLuma
                  <span className="mt-1 block text-lg tracking-[0.18em]">
                    Passport
                  </span>
                </p>
              </div>
              <div className="relative flex h-24 w-20 items-center justify-center rounded-b-[1.8rem] rounded-t-xl border border-[#d9b36c]/60 bg-[#d9b36c]/8">
                <span className="pet-serif text-3xl text-[#d9b36c]">PL</span>
              </div>
              <p className="border-t border-[#d9b36c]/24 pt-4 text-[0.5rem] uppercase leading-4 tracking-[0.26em] text-[#f6ecd8]/55">
                PetLuma Kingdom
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1rem] border border-[#d9b36c]/32 bg-[linear-gradient(135deg,#fff8e8_0%,#f3e6ca_52%,#fffaf0_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.15)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.06)_1px,transparent_1px)] [background-size:88px_40px,28px_28px]" />
            <div className="pointer-events-none absolute right-6 top-16 text-7xl font-semibold leading-none tracking-[-0.08em] text-[#081526]/[0.035]">
              PL
            </div>

            <div className="relative flex h-full min-h-[340px] flex-col">
              <div className="flex items-start justify-between gap-4 border-b border-[#9f7835]/28 pb-4">
                <div>
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.32em] text-[#7d632e]">
                    PETLUMA PASSPORT
                  </p>
                  <p className="mt-2 text-xl font-semibold uppercase tracking-[0.14em] text-[#081526]">
                    Identity Page
                  </p>
                </div>
                <p className="border border-[#9f7835]/35 px-3 py-1.5 text-[0.48rem] uppercase tracking-[0.18em] text-[#7d632e]">
                  Official
                </p>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex aspect-[35/45] items-center justify-center rounded-md border border-[#9f7835]/40 bg-[#fdf4df] p-2">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={`${displayName} passport portrait`}
                        className="block max-h-full max-w-full object-contain object-center saturate-[0.88] sepia-[0.06]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#081526]/10 px-3 text-center text-[0.5rem] uppercase tracking-[0.22em] text-[#081526]/42">
                        Passport Photo
                      </div>
                    )}
                  </div>
                  <p className="mt-3 border border-[#9f7835]/28 bg-white/20 p-2 text-center font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#081526]">
                    KINGDOM ID
                    <span className="mt-1 block">PLM-2026-0001</span>
                  </p>
                </div>

                <div className="min-w-0 space-y-3">
                  <PassportPreviewField label="Pet Name" value={displayName} large />
                  <PassportPreviewField label="Breed" value={displayBreed} />
                  <PassportPreviewField label="Gender" value="COMPANION" />
                  <PassportPreviewField
                    label="Place of Origin"
                    value={displayFavoritePlace}
                  />
                </div>
              </div>

              <p className="pet-serif mt-5 border border-[#9f7835]/20 bg-[#081526]/[0.035] p-3 text-sm leading-5 text-[#26344a]">
                {displayPersonality}
              </p>
            </div>
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
    <div className="border-b border-[#9f7835]/24 pb-2">
      <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#7d632e]">
        {label}
      </p>
      <p
        className={
          large
            ? "pet-serif mt-1 break-words text-3xl leading-none tracking-[-0.045em] text-[#081526]"
            : "mt-1 break-words text-xs font-semibold uppercase tracking-[0.1em] text-[#081526]"
        }
      >
        {value}
      </p>
    </div>
  );
}
