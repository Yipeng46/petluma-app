import assert from "node:assert/strict";
import {
  findExistingCompanion,
  normalizeCompanionLookupInput,
} from "../src/lib/companion-lookup";
import type { RegistryRecord } from "../src/lib/registry";

function sampleRecord(overrides: Partial<RegistryRecord> = {}): RegistryRecord {
  return {
    passportNo: "PLM-2026-000001",
    companionId: "PK-2026-AU-000001",
    petName: "Luma",
    species: "Dog",
    breed: "Golden Retriever",
    gender: "Female",
    dateOfBirth: "2020-06-15",
    placeOfOrigin: "Australia",
    countryCode: "AU",
    ownerEmail: "owner@example.com",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    status: "active",
    isPublic: false,
    ...overrides,
  };
}

const lookup = {
  ownerEmail: "Owner@Example.com",
  petName: "Luma",
  species: "dog",
  breed: " golden retriever ",
  gender: "female",
  dateOfBirth: "2020-06-15",
  countryCode: "au",
};

const records = [sampleRecord()];

assert.equal(findExistingCompanion(records, lookup)?.passportNo, "PLM-2026-000001");

assert.equal(
  findExistingCompanion(records, { ...lookup, breed: "Labrador" }),
  null,
);

assert.equal(
  findExistingCompanion(records, { ...lookup, countryCode: "US" }),
  null,
);

const normalized = normalizeCompanionLookupInput(lookup);
assert.equal(normalized.ownerEmail, "owner@example.com");
assert.equal(normalized.breed, "golden retriever");
assert.equal(normalized.countryCode, "AU");

console.log("[companion-lookup] all checks passed");
