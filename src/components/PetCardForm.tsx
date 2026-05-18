type PetCardFormProps = {
  name: string;
  breed: string;
  personality: string;
  favoritePlace: string;
  fileName: string;
  onNameChange: (value: string) => void;
  onBreedChange: (value: string) => void;
  onPersonalityChange: (value: string) => void;
  onFavoritePlaceChange: (value: string) => void;
  onPhotoChange: (file: File | null) => void;
};

export function PetCardForm({
  name,
  breed,
  personality,
  favoritePlace,
  fileName,
  onNameChange,
  onBreedChange,
  onPersonalityChange,
  onFavoritePlaceChange,
  onPhotoChange,
}: PetCardFormProps) {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/86 p-5 shadow-[0_22px_60px_rgba(17,24,39,0.08)] backdrop-blur sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.14)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.05)_1px,transparent_1px)] [background-size:96px_44px,28px_28px]" />
      <div className="pointer-events-none absolute right-6 top-6 text-8xl font-semibold leading-none tracking-[-0.08em] text-[#111827]/[0.035]">
        PL
      </div>

      <div className="mb-10">
        <p className="relative text-xs font-semibold uppercase tracking-[0.34em] text-[#C8A97E]">
          Create Passport
        </p>
        <h1 className="relative mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-5xl">
          Create your companion passport.
        </h1>
        <p className="relative mt-4 max-w-xl text-sm leading-7 text-[#6E6A64] sm:text-base">
          Add a photo and a few details about your pet. We&apos;ll create a
          beautiful PetLuma passport for you.
        </p>
      </div>

      <div className="relative space-y-6">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Passport Photo
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onPhotoChange(event.target.files?.[0] ?? null)}
            className="w-full cursor-pointer rounded-2xl border border-dashed border-[#C8A97E]/60 bg-[#F8F3E8]/70 px-4 py-4 text-sm text-[#6E6A64] transition file:mr-4 file:rounded-full file:border-0 file:bg-[#111827] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#FFFDF8] hover:border-[#C8A97E] focus:outline-none focus:ring-4 focus:ring-[#C8A97E]/15"
          />
          <span className="mt-2 block text-xs text-[#7a6656]">
            {fileName ||
              "Choose a clear photo of your pet for the passport page."}
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Pet name
          </span>
          <input
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="e.g. Luma"
            className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Breed
          </span>
          <input
            value={breed}
            onChange={(event) => onBreedChange(event.target.value)}
            placeholder="e.g. Golden Retriever"
            className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Personality
          </span>
          <textarea
            value={personality}
            onChange={(event) => onPersonalityChange(event.target.value)}
            placeholder="e.g. Gentle, playful, loyal"
            rows={3}
            className="w-full resize-none rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Place of origin / favorite place
          </span>
          <input
            value={favoritePlace}
            onChange={(event) => onFavoritePlaceChange(event.target.value)}
            placeholder="The pine trail after rain"
            className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          />
        </label>
      </div>
    </section>
  );
}
