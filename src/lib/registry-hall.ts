import { foundingCollection, type FoundingCompanion } from "@data/foundingCollection";
import { getCountryByCode } from "@/lib/countries";
import type { CloudPassportRow } from "@/lib/registry";
import type {
  RegistryHallCategory,
  RegistryHallRecord,
} from "@/lib/registry-hall-mock";
import { parseFavoriteThings } from "@/lib/story-archive";

export const REGISTRY_HALL_PLACEHOLDER_PHOTO =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=640&h=800&fit=crop&q=80";

const FOUNDING_COMPANION_IDS = new Set(
  foundingCollection.map((entry) => entry.id.trim().toUpperCase()),
);

export function isFoundingCompanionId(companionId: string) {
  return FOUNDING_COMPANION_IDS.has(companionId.trim().toUpperCase());
}

export function speciesToRegistryHallCategory(species: string): RegistryHallCategory {
  const normalized = species.trim().toLowerCase();

  if (
    normalized.includes("dog") ||
    normalized.includes("canine") ||
    normalized.includes("puppy")
  ) {
    return "canine";
  }

  if (
    normalized.includes("cat") ||
    normalized.includes("feline") ||
    normalized.includes("kitten")
  ) {
    return "feline";
  }

  return "other";
}

function formatKingdomSinceFromIso(isoDate: string) {
  const parsed = new Date(isoDate);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function resolvePhotoUrl(photoUrl?: string | null) {
  const trimmed = photoUrl?.trim();
  return trimmed ? trimmed : REGISTRY_HALL_PLACEHOLDER_PHOTO;
}

function resolveCountryLabel(countryCode: string | null | undefined, placeOfOrigin: string | null | undefined) {
  const origin = placeOfOrigin?.trim();
  if (origin) {
    return origin;
  }

  const code = countryCode?.trim();
  return code ? (getCountryByCode(code)?.name ?? code) : "—";
}

export function foundingCompanionToRegistryHallRecord(
  companion: FoundingCompanion,
): RegistryHallRecord {
  const guardianNote = companion.guardianNote.trim();
  const photo = companion.imageUrl?.trim();

  return {
    companionId: companion.id,
    passportNo: companion.archiveNo,
    name: companion.name,
    species: companion.species,
    breed: companion.breed?.trim() || "—",
    kingdomSince: companion.registryDate,
    registeredAt: "2026-06-01T00:00:00.000Z",
    photoUrl: photo ? photo : resolvePhotoUrl(null),
    hasPhoto: Boolean(photo),
    category: speciesToRegistryHallCategory(companion.species),
    guardian: companion.country,
    country: companion.country,
    isPublic: true,
    story: guardianNote || undefined,
    specialMemory: companion.specialMemory.trim() || undefined,
    favoriteThings: companion.favoriteThings.length ? companion.favoriteThings : undefined,
  };
}

export function getFoundingRegistryHallRecords(): RegistryHallRecord[] {
  return foundingCollection.map(foundingCompanionToRegistryHallRecord);
}

export function getFoundingCompanionById(
  companionId: string,
): FoundingCompanion | undefined {
  const normalized = decodeURIComponent(companionId).trim().toUpperCase();

  return foundingCollection.find((entry) => entry.id.toUpperCase() === normalized);
}

export function cloudPassportRowToRegistryHallRecord(
  row: CloudPassportRow,
): RegistryHallRecord {
  const photo = row.photo_url?.trim();
  const favoriteThings = parseFavoriteThings(row.favorite_things);

  return {
    companionId: row.companion_id,
    passportNo: row.passport_no,
    name: row.pet_name,
    species: row.species?.trim() || "Companion",
    breed: row.breed?.trim() || "—",
    kingdomSince: formatKingdomSinceFromIso(row.created_at),
    registeredAt: row.created_at,
    photoUrl: photo ? photo : resolvePhotoUrl(null),
    hasPhoto: Boolean(photo),
    category: speciesToRegistryHallCategory(row.species ?? ""),
    guardian: "Community Registry",
    country: resolveCountryLabel(row.country_code, row.place_of_origin),
    isPublic: row.is_public === true,
    story: row.story?.trim() || undefined,
    specialMemory: row.special_memory?.trim() || undefined,
    favoriteThings: favoriteThings.length ? favoriteThings : undefined,
  };
}

export function excludeFoundingFromCommunityRecords(
  records: RegistryHallRecord[],
): RegistryHallRecord[] {
  return records.filter((record) => !isFoundingCompanionId(record.companionId));
}
