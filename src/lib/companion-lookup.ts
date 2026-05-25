import { normalizeCountryCode, parseCountryCodeFromCompanionId } from "@/lib/companion-id";
import {
  normalizeDateOfBirth,
  normalizeEmail,
  normalizeSpecies,
} from "@/lib/pet-identity";

export type CompanionLookupInput = {
  ownerEmail: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  countryCode: string;
};

export type NormalizedCompanionLookup = {
  ownerEmail: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  countryCode: string;
};

export type CompanionIdentityRecord = {
  ownerEmail: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  countryCode?: string;
  companionId: string;
};

function collapseWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function normalizeBreed(breed: string) {
  return collapseWhitespace(breed);
}

export function normalizeGender(gender: string) {
  return collapseWhitespace(gender);
}

export function normalizeCompanionLookupInput(
  input: CompanionLookupInput,
): NormalizedCompanionLookup {
  return {
    ownerEmail: normalizeEmail(input.ownerEmail),
    species: normalizeSpecies(input.species),
    breed: normalizeBreed(input.breed),
    gender: normalizeGender(input.gender),
    dateOfBirth: normalizeDateOfBirth(input.dateOfBirth),
    countryCode: normalizeCountryCode(input.countryCode),
  };
}

export function getRecordCountryCode(record: CompanionIdentityRecord) {
  if (record.countryCode) {
    return normalizeCountryCode(record.countryCode);
  }

  const fromCompanionId = parseCountryCodeFromCompanionId(record.companionId);
  return fromCompanionId ? normalizeCountryCode(fromCompanionId) : "";
}

export function matchesCompanionIdentity(
  record: CompanionIdentityRecord,
  normalized: NormalizedCompanionLookup,
) {
  return (
    normalizeEmail(record.ownerEmail) === normalized.ownerEmail &&
    normalizeSpecies(record.species) === normalized.species &&
    normalizeBreed(record.breed) === normalized.breed &&
    normalizeGender(record.gender) === normalized.gender &&
    normalizeDateOfBirth(record.dateOfBirth) === normalized.dateOfBirth &&
    getRecordCountryCode(record) === normalized.countryCode
  );
}

export function findExistingCompanion<T extends CompanionIdentityRecord>(
  records: T[],
  input: CompanionLookupInput,
): T | null {
  const normalized = normalizeCompanionLookupInput(input);

  return records.find((record) => matchesCompanionIdentity(record, normalized)) ?? null;
}
