import { getCountryByCode } from "@/lib/countries";
import type { CloudPassportRow } from "@/lib/registry";
import type {
  RegistryHallCategory,
  RegistryHallRecord,
} from "@/lib/registry-hall-mock";
import { parseFavoriteThings } from "@/lib/story-archive";

export const REGISTRY_HALL_PLACEHOLDER_PHOTO =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=640&h=800&fit=crop&q=80";

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
