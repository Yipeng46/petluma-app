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
    <section className="rounded-[2rem] border border-[#c7a15f]/20 bg-[#fffaf1]/75 p-5 shadow-[0_24px_60px_rgba(71,49,33,0.1)] backdrop-blur sm:p-7">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#9b7b45]">
          Create Card
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#2f2119] sm:text-5xl">
          Compose a quieter companion portrait.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f5b4b] sm:text-base">
          Add a photograph and a few personal details. The editorial card on
          the right updates immediately.
        </p>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#2f2119]">
            Pet photo
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onPhotoChange(event.target.files?.[0] ?? null)}
            className="w-full cursor-pointer rounded-2xl border border-dashed border-[#c7a15f]/70 bg-[#fffdf7] px-4 py-4 text-sm text-[#6f5b4b] file:mr-4 file:rounded-full file:border-0 file:bg-[#2f2119] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#fff8eb] hover:border-[#c7a15f]"
          />
          <span className="mt-2 block text-xs text-[#7a6656]">
            {fileName || "Choose a warm outdoor portrait if you have one."}
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#2f2119]">
            Name
          </span>
          <input
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Luma"
            className="w-full rounded-2xl border border-[#d8c3a3] bg-[#fffdf7] px-4 py-3 text-[#2f2119] outline-none transition placeholder:text-[#9b8978] focus:border-[#c7a15f] focus:ring-4 focus:ring-[#c7a15f]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#2f2119]">
            Breed
          </span>
          <input
            value={breed}
            onChange={(event) => onBreedChange(event.target.value)}
            placeholder="Golden Retriever"
            className="w-full rounded-2xl border border-[#d8c3a3] bg-[#fffdf7] px-4 py-3 text-[#2f2119] outline-none transition placeholder:text-[#9b8978] focus:border-[#c7a15f] focus:ring-4 focus:ring-[#c7a15f]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#2f2119]">
            Personality
          </span>
          <textarea
            value={personality}
            onChange={(event) => onPersonalityChange(event.target.value)}
            placeholder="Gentle, curious, and happiest beside a trail."
            rows={3}
            className="w-full resize-none rounded-2xl border border-[#d8c3a3] bg-[#fffdf7] px-4 py-3 text-[#2f2119] outline-none transition placeholder:text-[#9b8978] focus:border-[#c7a15f] focus:ring-4 focus:ring-[#c7a15f]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#2f2119]">
            Favorite place
          </span>
          <input
            value={favoritePlace}
            onChange={(event) => onFavoritePlaceChange(event.target.value)}
            placeholder="The pine trail after rain"
            className="w-full rounded-2xl border border-[#d8c3a3] bg-[#fffdf7] px-4 py-3 text-[#2f2119] outline-none transition placeholder:text-[#9b8978] focus:border-[#c7a15f] focus:ring-4 focus:ring-[#c7a15f]/15"
          />
        </label>
      </div>
    </section>
  );
}
