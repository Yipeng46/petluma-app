import { parseCountryCodeFromCompanionId } from "@/lib/companion-id";
import { getCountryByCode } from "@/lib/countries";

export type PassportData = {
  ownerEmail: string;
  photo: string | null;
  name: string;
  breed: string;
  gender: string;
  birthdate: string;
  species: string;
  countryCode: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
};

export function createInitialPassportData(): PassportData {
  return {
    ownerEmail: "",
    photo: null,
    name: "",
    breed: "",
    gender: "",
    birthdate: "",
    species: "",
    countryCode: "",
    placeOfOrigin: "",
    passportNo: "",
    companionId: "",
  };
}

export function updatePassportField<K extends keyof PassportData>(
  current: PassportData,
  field: K,
  value: PassportData[K],
): PassportData {
  return {
    ...current,
    [field]: value,
  };
}

export function normalizePassportData(raw: unknown): PassportData {
  const initial = createInitialPassportData();

  if (!raw || typeof raw !== "object") {
    return initial;
  }

  const record = raw as Record<string, unknown>;
  const companionId =
    readString(record.companionId ?? record.kingdomId) || initial.companionId;
  const countryCode =
    readString(record.countryCode ?? record.country_code) ||
    parseCountryCodeFromCompanionId(companionId);
  const placeOfOrigin =
    readString(record.placeOfOrigin ?? record.favoritePlace) ||
    getCountryByCode(countryCode)?.name ||
    "";

  return {
    ownerEmail: readString(record.ownerEmail ?? record.owner_email),
    photo:
      typeof record.photo === "string"
        ? record.photo
        : typeof record.photoUrl === "string"
          ? record.photoUrl
          : null,
    name: readString(record.name),
    breed: readString(record.breed),
    gender: readString(record.gender),
    birthdate: readString(record.birthdate ?? record.birthday),
    species: readString(record.species),
    countryCode,
    placeOfOrigin,
    passportNo: readString(record.passportNo) || initial.passportNo,
    companionId,
  };
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}
