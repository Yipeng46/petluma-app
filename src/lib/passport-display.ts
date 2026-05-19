import type { PassportData } from "@/lib/passport-data";

export type PassportDisplay = {
  photo: string | null;
  name: string;
  breed: string;
  gender: string;
  birthdate: string;
  species: string;
  personality: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
  mrzName: string;
  mrzBreed: string;
};

function displayValue(value: string, fallback = "—") {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function toMrzToken(value: string, fallback: string) {
  const token = value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<")
    .replace(/^<|<$/g, "");

  return token || fallback;
}

export function getPassportDisplay(data: PassportData): PassportDisplay {
  const name = displayValue(data.name);
  const breed = displayValue(data.breed);
  const gender = displayValue(data.gender);
  const birthdate = displayValue(data.birthdate, "Not declared");
  const species = displayValue(data.species, "Companion");
  const personality = displayValue(
    data.personality,
    "A cherished companion under PetLuma care.",
  );
  const placeOfOrigin = displayValue(data.placeOfOrigin);

  return {
    photo: data.photo,
    name,
    breed,
    gender,
    birthdate,
    species,
    personality,
    placeOfOrigin,
    passportNo: data.passportNo,
    companionId: data.companionId,
    mrzName: toMrzToken(data.name, "PETNAME"),
    mrzBreed: toMrzToken(data.breed, "COMPANION"),
  };
}
