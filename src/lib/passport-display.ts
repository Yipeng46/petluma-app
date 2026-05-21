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
  personality: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
  registry: string;
  classification: string;
  issuedBy: string;
  registered: string;
  kingdomId: string;
  mrz: PassportMrz;
};

function displayValue(value: string, fallback = "—") {
  const trimmed = value.trim();
  return trimmed || fallback;
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

function kingdomIdFromCompanion(companionId: string) {
  const token = companionId.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  if (!token || token === "ASSIGNEDONREGISTRATION") {
    return "PK-PENDING";
  }

  return `PK-${token.slice(-6).padStart(6, "0")}`;
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
  const birthdate = displayValue(data.birthdate, "Not declared");
  const species = displayValue(data.species, "Companion");
  const personality = displayValue(
    data.personality,
    "A cherished companion under PetLuma care.",
  );
  const placeOfOrigin = displayValue(data.placeOfOrigin);
  const companionId = displayValue(data.companionId, PENDING_COMPANION_ID);
  const passportNo = displayValue(data.passportNo, PENDING_PASSPORT_NO);
  const isPending =
    companionId === PENDING_COMPANION_ID || passportNo === PENDING_PASSPORT_NO;

  return {
    photo: data.photo,
    name,
    breed,
    gender,
    birthdate,
    species,
    personality,
    placeOfOrigin,
    passportNo,
    companionId,
    registry: "PetLuma Companion Registry",
    classification: classificationFromSpecies(species),
    issuedBy: "Kingdom Registry Office",
    registered: isPending ? "Pending" : "Active",
    kingdomId: kingdomIdFromCompanion(companionId),
    mrz: generateMRZ(data),
  };
}
