import type { PassportData } from "@/lib/passport-data";
import {
  PASSPORT_FIELD_LIMITS,
  PASSPORT_GENDER_OPTIONS,
  PASSPORT_PHOTO_ACCEPT,
  PASSPORT_SPECIES_OPTIONS,
} from "@/lib/passport-form";

type PetCardFormProps = {
  passportData: PassportData;
  photoInputKey: number;
  onFieldChange: <K extends keyof PassportData>(
    field: K,
    value: PassportData[K],
  ) => void;
  onPhotoChange: (file: File | null) => void;
};

export function PetCardForm({
  passportData,
  photoInputKey,
  onFieldChange,
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
            Pet Photo
          </span>
          <input
            key={photoInputKey}
            type="file"
            accept={PASSPORT_PHOTO_ACCEPT}
            data-testid="pet-photo-input"
            onChange={(event) => onPhotoChange(event.target.files?.[0] ?? null)}
            className="w-full cursor-pointer rounded-2xl border border-dashed border-[#C8A97E]/60 bg-[#F8F3E8]/70 px-4 py-4 text-sm text-[#6E6A64] transition file:mr-4 file:rounded-full file:border-0 file:bg-[#111827] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#FFFDF8] hover:border-[#C8A97E] focus:outline-none focus:ring-4 focus:ring-[#C8A97E]/15"
          />
          <span className="mt-2 block text-xs text-[#7a6656]">
            JPG, PNG, or WEBP up to 5 MB.
          </span>
        </label>

        <TextInput
          label="Owner email"
          value={passportData.ownerEmail}
          placeholder="you@example.com"
          type="email"
          onChange={(value) => onFieldChange("ownerEmail", value)}
        />

        <TextInput
          label="Pet Name"
          value={passportData.name}
          placeholder="e.g. Luma"
          maxLength={PASSPORT_FIELD_LIMITS.name}
          onChange={(value) => onFieldChange("name", value)}
        />

        <SelectInput
          label="Species"
          value={passportData.species}
          options={PASSPORT_SPECIES_OPTIONS}
          placeholder="Select species"
          onChange={(value) => onFieldChange("species", value)}
        />

        <TextInput
          label="Breed"
          value={passportData.breed}
          placeholder="e.g. Golden Retriever"
          maxLength={PASSPORT_FIELD_LIMITS.breed}
          onChange={(value) => onFieldChange("breed", value)}
        />

        <SelectInput
          label="Gender"
          value={passportData.gender}
          options={PASSPORT_GENDER_OPTIONS}
          placeholder="Select gender"
          onChange={(value) => onFieldChange("gender", value)}
        />

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Date of Birth
          </span>
          <input
            type="date"
            value={passportData.birthdate}
            onChange={(event) => onFieldChange("birthdate", event.target.value)}
            className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          />
        </label>

        <TextInput
          label="Place of Origin"
          value={passportData.placeOfOrigin}
          placeholder="The pine trail after rain"
          maxLength={PASSPORT_FIELD_LIMITS.placeOfOrigin}
          onChange={(value) => onFieldChange("placeOfOrigin", value)}
        />
      </div>
    </section>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  type = "text",
  maxLength,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
