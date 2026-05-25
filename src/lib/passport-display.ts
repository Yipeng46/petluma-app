import type { PassportData } from "@/lib/passport-data";
import {
  PENDING_COMPANION_ID,
  PENDING_PASSPORT_NO,
} from "@/lib/passport-data";

export type PassportMrz = {
  line1: string;
  line2: string;
  line3: string;
};

export type PassportDisplay = {
  photo: string | null;
  name: string;
  breed: string;
  gender: string;
  birthdate: string;
  species: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
  registry: string;
  classification: string;
  issuedBy: string;
  registered: string;
  mrz: PassportMrz;
};

function displayValue(value: string, fallback = "—") {
  const trimmed = value.trim();

  if (
    !trimmed ||
    trimmed.toLowerCase() === "n/a" ||
    trimmed.toLowerCase() === "undefined" ||
    trimmed.toLowerCase() === "null" ||
    trimmed === PENDING_COMPANION_ID ||
    trimmed === PENDING_PASSPORT_NO
  ) {
    return fallback;
  }

  return trimmed;
}

function toMrzToken(value: string, fallback: string) {
  const token = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<")
    .replace(/^<|<$/g, "");

  return token || fallback;
}

function passportNoToMrz(passportNo: string) {
  const token = passportNo.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  return token || "PLM00000000";
}

export function generateMRZ(data: PassportData): PassportMrz {
  const nameToken = toMrzToken(data.name, "PETNAME");
  const breedToken = toMrzToken(data.breed, "COMPANION");
  const passportNoToken = passportNoToMrz(data.passportNo);

  return {
    line1: `P<PLM<<${nameToken}<<<<<<<<<<<<<<<<<<<<`,
    line2: `${passportNoToken}PETLUMA<<<<<<<<<<`,
    line3: `${breedToken}<<<<<<<<<<<<<<<<<<<<`,
  };
}

function classificationFromSpecies(species: string) {
  const normalized = species.trim().toLowerCase();

  if (normalized.includes("cat")) {
    return "Feline Registry Class";
  }

  if (normalized.includes("dog")) {
    return "Canine Registry Class";
  }

  return "Companion Registry Class";
}

export function getPassportDisplay(data: PassportData): PassportDisplay {
  const name = displayValue(data.name);
  const breed = displayValue(data.breed);
  const gender = displayValue(data.gender);
  const birthdate = displayValue(data.birthdate);
  const species = displayValue(data.species, "Companion");
  const placeOfOrigin = displayValue(data.placeOfOrigin);
  const companionId = displayValue(data.companionId);
  const passportNo = displayValue(data.passportNo);
  const isPending = !data.companionId.trim() || !data.passportNo.trim();

  return {
    photo: data.photo,
    name,
    breed,
    gender,
    birthdate,
    species,
    placeOfOrigin,
    passportNo,
    companionId,
    registry: "PetLuma Companion Registry",
    classification: classificationFromSpecies(species),
    issuedBy: "PetLuma Registry Office",
    registered: isPending ? "Pending" : "Active",
    mrz: generateMRZ(data),
  };
}
