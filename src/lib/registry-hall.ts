import { getCountryByCode } from "@/lib/countries";
import type { CloudPassportRow } from "@/lib/registry";
import type {
  RegistryHallCategory,
  RegistryHallRecord,
} from "@/lib/registry-hall-mock";
import { parseFavoriteThings } from "@/lib/story-archive";
import {
  REGISTRY_HALL_PLACEHOLDER_PHOTO,
  resolvePublicListPhotoUrl,
} from "@/lib/companion-photo-url";

export { REGISTRY_HALL_PLACEHOLDER_PHOTO };

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

export function sanitizePublicListPhotoUrl(
  companionId: string,
  photoUrl?: string | null,
) {
  return resolvePublicListPhotoUrl(companionId, photoUrl);
}

function formatDateOfBirth(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  const parsed = new Date(trimmed);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return trimmed;
}

function resolveRegisteredStatus(status: string | null | undefined) {
  const normalized = status?.trim().toLowerCase();

  if (!normalized || normalized === "active") {
    return "Registered";
  }

  return status?.trim() || "Registered";
}

function resolveCountryLabel(
  countryCode: string | null | undefined,
  placeOfOrigin: string | null | undefined,
) {
  const origin = placeOfOrigin?.trim();
  if (origin) {
    return origin;
  }

  const code = countryCode?.trim();
  return code ? (getCountryByCode(code)?.name ?? code) : "—";
}

export function cloudPassportRowToRegistryHallRecord(
  row: CloudPassportRow,
  options?: { useListPhotoUrls?: boolean },
): RegistryHallRecord {
  const rawPhoto = row.photo_url?.trim();
  const photo = options?.useListPhotoUrls
    ? resolvePublicListPhotoUrl(row.companion_id, rawPhoto)
    : {
        photoUrl: rawPhoto ? rawPhoto : resolvePhotoUrl(null),
        hasPhoto: Boolean(rawPhoto),
      };
  const favoriteThings = parseFavoriteThings(row.favorite_things);

  return {
    companionId: row.companion_id,
    passportNo: row.passport_no,
    name: row.pet_name,
    species: row.species?.trim() || "Companion",
    breed: row.breed?.trim() || "—",
    kingdomSince: formatKingdomSinceFromIso(row.created_at),
    registeredAt: row.created_at,
    photoUrl: photo.photoUrl,
    hasPhoto: photo.hasPhoto,
    category: speciesToRegistryHallCategory(row.species ?? ""),
    guardian: "Public Archive",
    country: resolveCountryLabel(row.country_code, row.place_of_origin),
    isPublic: row.is_public === true,
    story: row.story?.trim() || undefined,
    specialMemory: row.special_memory?.trim() || undefined,
    favoriteThings: favoriteThings.length ? favoriteThings : undefined,
    gender: row.gender?.trim() || undefined,
    dateOfBirth: formatDateOfBirth(row.date_of_birth),
    registeredStatus: resolveRegisteredStatus(row.status),
  };
}

export type RecentlyRegisteredPassportRow = Pick<
  CloudPassportRow,
  | "passport_no"
  | "companion_id"
  | "pet_name"
  | "species"
  | "breed"
  | "country_code"
  | "place_of_origin"
  | "photo_url"
  | "is_public"
  | "status"
  | "created_at"
>;

export function cloudPassportRowToRecentlyRegisteredRecord(
  row: RecentlyRegisteredPassportRow,
): RegistryHallRecord {
  const photo = sanitizePublicListPhotoUrl(row.companion_id, row.photo_url);

  return {
    companionId: row.companion_id,
    passportNo: row.passport_no,
    name: row.pet_name,
    species: row.species?.trim() || "Companion",
    breed: row.breed?.trim() || "—",
    kingdomSince: formatKingdomSinceFromIso(row.created_at),
    registeredAt: row.created_at,
    photoUrl: photo.photoUrl,
    hasPhoto: photo.hasPhoto,
    category: speciesToRegistryHallCategory(row.species ?? ""),
    guardian: "Public Archive",
    country: resolveCountryLabel(row.country_code, row.place_of_origin),
    isPublic: row.is_public === true,
  };
}
