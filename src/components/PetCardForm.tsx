import type { PassportData } from "@/lib/passport-data";
import { COUNTRIES, formatCountryOption } from "@/lib/countries";
import {
  PASSPORT_FIELD_LIMITS,
  PASSPORT_GENDER_OPTIONS,
  PASSPORT_PHOTO_ACCEPT,
  PASSPORT_SPECIES_OPTIONS,
} from "@/lib/passport-form";

const REGISTRY_VISIBILITY_NOTE =
  "Only companions shared by their guardians will appear within the public Registry Hall.";

type PetCardFormProps = {
  passportData: PassportData;
  photoInputKey: number;
  onFieldChange: <K extends keyof PassportData>(
    field: K,
    value: PassportData[K],
  ) => void;
  onPhotoChange: (file: File | null) => void;
  onCountryChange: (countryCode: string) => void;
};

export function PetCardForm({
  passportData,
  photoInputKey,
  onFieldChange,
  onPhotoChange,
  onCountryChange,
}: PetCardFormProps) {
  return (
    <section className="passport-form-card relative overflow-hidden rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/86 shadow-[0_22px_60px_rgba(17,24,39,0.08)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.14)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.05)_1px,transparent_1px)] [background-size:96px_44px,28px_28px]" />
      <div className="pointer-events-none absolute right-6 top-6 text-8xl font-semibold leading-none tracking-[-0.08em] text-[#111827]/[0.035]">
        PL
      </div>

      <div className="mb-10">
        <p className="passport-form-eyebrow relative text-[#C8A97E]">
          Kingdom Registry
        </p>
        <h1 className="relative">
          Register your companion within the Kingdom.
        </h1>
        <p className="passport-form-lead relative max-w-xl text-[#6E6A64]">
          Add a portrait and a few details. The Registry will prepare their official
          companion identity record.
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

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#111827]">
            Country
          </span>
          <select
            value={passportData.countryCode}
            onChange={(event) => onCountryChange(event.target.value)}
            className="w-full rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {formatCountryOption(country)}
              </option>
            ))}
          </select>
        </label>

        <div className="border-t border-[#E6DED2]/80 pt-6">
          <p className="text-sm font-semibold text-[#111827]">Story Archive</p>
          <p className="mt-1 text-xs text-[#7a6656]">
            Optional. Share as much or as little as you wish — every field may remain
            empty.
          </p>
        </div>

        <TextareaInput
          label="Story"
          value={passportData.story}
          placeholder="Tell your companion's story within the Kingdom…"
          maxLength={PASSPORT_FIELD_LIMITS.story}
          onChange={(value) => onFieldChange("story", value)}
        />

        <TextareaInput
          label="Special Memory"
          value={passportData.specialMemory}
          placeholder="A moment you wish to preserve…"
          maxLength={PASSPORT_FIELD_LIMITS.specialMemory}
          onChange={(value) => onFieldChange("specialMemory", value)}
        />

        <TextareaInput
          label="Favorite Things"
          value={passportData.favoriteThings}
          placeholder="One per line, or separated with commas"
          maxLength={PASSPORT_FIELD_LIMITS.favoriteThings}
          onChange={(value) => onFieldChange("favoriteThings", value)}
        />

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/50 px-4 py-4 transition hover:border-[#C8A97E]/70">
          <input
            type="checkbox"
            checked={passportData.isPublic}
            onChange={(event) => onFieldChange("isPublic", event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-[#C8A97E]/60 text-[#111827] focus:ring-[#C8A97E]/25"
          />
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[#111827]">
              Share this companion with the Kingdom Registry
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-[#6E6A64]">
              {REGISTRY_VISIBILITY_NOTE}
            </span>
          </span>
        </label>
      </div>
    </section>
  );
}

function TextareaInput({
  label,
  value,
  placeholder,
  maxLength,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#111827]">{label}</span>
      <textarea
        value={value}
        maxLength={maxLength}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-2xl border border-[#E6DED2] bg-[#F8F3E8]/70 px-4 py-3 text-[#111827] outline-none transition placeholder:text-[#9A948C] hover:border-[#C8A97E]/70 focus:border-[#C8A97E] focus:ring-4 focus:ring-[#C8A97E]/15"
      />
    </label>
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
