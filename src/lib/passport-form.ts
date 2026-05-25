import { isValidCountryCode } from "@/lib/countries";

export const PASSPORT_SPECIES_OPTIONS = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Other",
] as const;
export const PASSPORT_GENDER_OPTIONS = [
  "Female",
  "Male",
  "Unknown",
] as const;

export const PASSPORT_FIELD_LIMITS = {
  name: 24,
  breed: 40,
  placeOfOrigin: 20,
} as const;

export const PASSPORT_PHOTO_ACCEPT =
  "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

export const PASSPORT_PHOTO_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isAllowedPassportPhotoType(type: string) {
  return ALLOWED_PHOTO_TYPES.has(type);
}

export function isValidPassportBirthdate(value: string) {
  const trimmed = value.trim();

  if (!DATE_PATTERN.test(trimmed)) {
    return false;
  }

  const [year, month, day] = trimmed.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validatePassportUserInput(input: {
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthdate: string;
  countryCode: string;
}) {
  const name = input.name.trim();
  const breed = input.breed.trim();
  const birthdate = input.birthdate.trim();

  if (!name) {
    return "Pet name is required.";
  }

  if (name.length > PASSPORT_FIELD_LIMITS.name) {
    return `Pet name must be ${PASSPORT_FIELD_LIMITS.name} characters or fewer.`;
  }

  if (
    !input.species.trim() ||
    !PASSPORT_SPECIES_OPTIONS.includes(
      input.species as (typeof PASSPORT_SPECIES_OPTIONS)[number],
    )
  ) {
    return "Please select a species.";
  }

  if (breed.length > PASSPORT_FIELD_LIMITS.breed) {
    return `Breed must be ${PASSPORT_FIELD_LIMITS.breed} characters or fewer.`;
  }

  if (!PASSPORT_GENDER_OPTIONS.includes(input.gender as (typeof PASSPORT_GENDER_OPTIONS)[number])) {
    return "Please choose a valid gender.";
  }

  if (birthdate && !isValidPassportBirthdate(birthdate)) {
    return "Please enter a valid date of birth.";
  }

  if (!isValidCountryCode(input.countryCode)) {
    return "Please select a country.";
  }

  return null;
}
