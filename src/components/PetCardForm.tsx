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
    <section className="relative overflow-hidden rounded-[1.4rem] border border-[#b8944d]/30 bg-[#fff8e8]/78 p-5 shadow-[0_28px_80px_rgba(8,21,38,0.12)] backdrop-blur sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.14)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.05)_1px,transparent_1px)] [background-size:96px_44px,28px_28px]" />
      <div className="pointer-events-none absolute right-6 top-6 text-8xl font-semibold leading-none tracking-[-0.08em] text-[#081526]/[0.035]">
        PL
      </div>

      <div className="mb-8">
        <p className="relative text-xs font-semibold uppercase tracking-[0.32em] text-[#7d632e]">
          Create Passport
        </p>
        <h1 className="relative mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#081526] sm:text-5xl">
          Create your pet&apos;s official PetLuma Passport.
        </h1>
        <p className="relative mt-4 max-w-xl text-sm leading-7 text-[#3d4858]/78 sm:text-base">
          Upload a portrait and add a few details. Your PetLuma Passport preview
          updates instantly.
        </p>
      </div>

      <div className="relative space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#081526]">
            Pet passport photo
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onPhotoChange(event.target.files?.[0] ?? null)}
            className="w-full cursor-pointer rounded-xl border border-dashed border-[#b8944d]/70 bg-[#fffaf0]/82 px-4 py-4 text-sm text-[#3d4858] file:mr-4 file:rounded-full file:border-0 file:bg-[#081526] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#fff8eb] hover:border-[#7d632e]"
          />
          <span className="mt-2 block text-xs text-[#7a6656]">
            {fileName ||
              "Choose a clear front-facing portrait for the best passport result."}
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#081526]">
            Pet name
          </span>
          <input
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Luma"
            className="w-full rounded-xl border border-[#b8944d]/35 bg-[#fffaf0]/88 px-4 py-3 text-[#081526] outline-none transition placeholder:text-[#8d7d69] focus:border-[#b8944d] focus:ring-4 focus:ring-[#b8944d]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#081526]">
            Breed
          </span>
          <input
            value={breed}
            onChange={(event) => onBreedChange(event.target.value)}
            placeholder="Golden Retriever"
            className="w-full rounded-xl border border-[#b8944d]/35 bg-[#fffaf0]/88 px-4 py-3 text-[#081526] outline-none transition placeholder:text-[#8d7d69] focus:border-[#b8944d] focus:ring-4 focus:ring-[#b8944d]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#081526]">
            Personality
          </span>
          <textarea
            value={personality}
            onChange={(event) => onPersonalityChange(event.target.value)}
            placeholder="Gentle, curious, and happiest beside a trail."
            rows={3}
            className="w-full resize-none rounded-xl border border-[#b8944d]/35 bg-[#fffaf0]/88 px-4 py-3 text-[#081526] outline-none transition placeholder:text-[#8d7d69] focus:border-[#b8944d] focus:ring-4 focus:ring-[#b8944d]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#081526]">
            Place of origin / favorite place
          </span>
          <input
            value={favoritePlace}
            onChange={(event) => onFavoritePlaceChange(event.target.value)}
            placeholder="The pine trail after rain"
            className="w-full rounded-xl border border-[#b8944d]/35 bg-[#fffaf0]/88 px-4 py-3 text-[#081526] outline-none transition placeholder:text-[#8d7d69] focus:border-[#b8944d] focus:ring-4 focus:ring-[#b8944d]/15"
          />
        </label>
      </div>
    </section>
  );
}
