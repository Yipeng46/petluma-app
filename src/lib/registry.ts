import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import {
  findExistingCompanion,
  normalizeCompanionLookupInput,
  type CompanionLookupInput,
} from "@/lib/companion-lookup";
import {
  generateNextCompanionId,
  normalizeCountryCode,
  parseCountryCodeFromCompanionId,
} from "@/lib/companion-id";
import {
  normalizeStoryField,
  serializeFavoriteThings,
} from "@/lib/story-archive";
import { isValidCountryCode } from "@/lib/countries";
import {
  displayOwnerEmail,
  normalizeEmail,
  resolveOwnerEmailForStorage,
} from "@/lib/pet-identity";

export { generateNextCompanionId as generateCompanionId } from "@/lib/companion-id";
export {
  findExistingCompanion,
  normalizeCompanionLookupInput,
  type CompanionLookupInput,
} from "@/lib/companion-lookup";

export const REGISTRY_STORAGE_KEY = "petluma_registry";

export type RegistryRecordStatus = "active";

export type RegistryRecord = {
  passportNo: string;
  companionId: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeOfOrigin: string;
  countryCode?: string;
  ownerEmail: string;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  status: RegistryRecordStatus;
  story?: string;
  specialMemory?: string;
  favoriteThings?: string;
  isPublic: boolean;
  guardianEmail?: string | null;
  guardianName?: string | null;
};

export type RegistryState = {
  records: RegistryRecord[];
};

export type CreateRegistryInput = {
  ownerEmail: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  countryCode: string;
  placeOfOrigin: string;
  story?: string;
  specialMemory?: string;
  favoriteThings?: string;
  isPublic?: boolean;
  guardianEmail?: string | null;
  guardianName?: string | null;
};

function toCompanionLookupInput(input: CreateRegistryInput): CompanionLookupInput {
  return {
    ownerEmail: resolveOwnerEmailForStorage(input.ownerEmail),
    petName: input.petName,
    species: input.species,
    breed: input.breed,
    gender: input.gender,
    dateOfBirth: input.dateOfBirth,
    countryCode: input.countryCode,
  };
}

export type CreateRegistryCloudInput = CreateRegistryInput & {
  photoUrl?: string | null;
};

export type CreateRegistryResult = {
  record: RegistryRecord;
  isDuplicate: boolean;
  message?: string;
  cloudSynced?: boolean;
  cloudSyncError?: string;
};

export type RecoverPassportsResult = {
  records: RegistryRecord[];
  source: "cloud" | "local";
  cloudError?: string;
};

function emptyRegistry(): RegistryState {
  return { records: [] };
}

function currentYear() {
  return new Date().getFullYear();
}

function parsePassportSequence(passportNo: string, year: number) {
  const match = passportNo.match(new RegExp(`^PLM-${year}-(\\d{6})$`));

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

export function getRegistry(): RegistryState {
  if (typeof window === "undefined") {
    return emptyRegistry();
  }

  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);

    if (!raw) {
      return emptyRegistry();
    }

    const parsed = JSON.parse(raw) as Partial<RegistryState>;

    if (!parsed || !Array.isArray(parsed.records)) {
      return emptyRegistry();
    }

    return { records: parsed.records };
  } catch {
    return emptyRegistry();
  }
}

export function saveRegistry(state: RegistryState) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(state));
}

function normalizePassportNo(passportNo: string) {
  return passportNo.trim().toUpperCase();
}

export function findPassportByNumber(
  passportNo: string,
  registry: RegistryState = getRegistry(),
): RegistryRecord | null {
  const normalized = normalizePassportNo(passportNo);

  if (!normalized) {
    return null;
  }

  return (
    registry.records.find(
      (record) => normalizePassportNo(record.passportNo) === normalized,
    ) ?? null
  );
}

export function findExistingPassport(
  registry: RegistryState,
  input: CreateRegistryInput,
): RegistryRecord | null {
  return findExistingCompanion(registry.records, toCompanionLookupInput(input));
}

export function generateNextPassportNumber(
  registry: RegistryState,
  year = currentYear(),
) {
  const sequences = registry.records
    .map((record) => parsePassportSequence(record.passportNo, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PLM-${year}-${String(next).padStart(6, "0")}`;
}

function generateNextCompanionIdForRegistry(
  registry: RegistryState,
  countryCode: string,
  year = currentYear(),
) {
  const normalizedCountryCode = normalizeCountryCode(countryCode);

  if (!isValidCountryCode(normalizedCountryCode)) {
    throw new Error(`Invalid country code: ${countryCode}`);
  }

  return generateNextCompanionId(
    registry.records.map((record) => record.companionId),
    normalizedCountryCode,
    year,
  );
}

export function createRegistryRecord(
  input: CreateRegistryInput & { photoUrl?: string | null },
): CreateRegistryResult {
  const registry = getRegistry();
  const existing = findExistingPassport(registry, input);
  const normalizedCountryCode = normalizeCountryCode(input.countryCode);
  const storedOwnerEmail = resolveOwnerEmailForStorage(input.ownerEmail);

  const now = new Date().toISOString();

  if (existing) {
    existing.updatedAt = now;
    saveRegistry(registry);

    return {
      record: existing,
      isDuplicate: true,
      message: "This companion already has a PetLuma Passport.",
    };
  }

  const record: RegistryRecord = {
    passportNo: generateNextPassportNumber(registry),
    companionId: generateNextCompanionIdForRegistry(registry, input.countryCode),
    petName: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    dateOfBirth: input.dateOfBirth.trim(),
    placeOfOrigin: input.placeOfOrigin.trim(),
    countryCode: normalizedCountryCode,
    ownerEmail: storedOwnerEmail,
    photoUrl: sanitizeCloudPhotoUrl(input.photoUrl),
    createdAt: now,
    updatedAt: now,
    status: "active",
    story: normalizeStoryField(input.story) || undefined,
    specialMemory: normalizeStoryField(input.specialMemory) || undefined,
    favoriteThings: serializeFavoriteThings(input.favoriteThings ?? "") || undefined,
    isPublic: input.isPublic === true,
    guardianEmail: input.guardianEmail?.trim() || null,
    guardianName: input.guardianName?.trim() || null,
  };

  registry.records.push(record);
  saveRegistry(registry);

  return {
    record,
    isDuplicate: false,
  };
}

export const PETLUMA_PASSPORTS_TABLE = "petluma_passports";

const CLOUD_PHOTO_URL_MAX = 120_000;
const CLOUD_REQUEST_TIMEOUT_MS = 4_000;

async function withCloudTimeout<T>(operation: PromiseLike<T>) {
  return Promise.race([
    Promise.resolve(operation),
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Cloud registry request timed out."));
      }, CLOUD_REQUEST_TIMEOUT_MS);
    }),
  ]);
}

function isNotFoundError(error: { code?: string; message?: string }) {
  return error.code === "PGRST116" || /0 rows/i.test(error.message ?? "");
}

export type CloudPassportRow = {
  id: string;
  passport_no: string;
  companion_id: string;
  owner_email: string;
  pet_name: string;
  species: string | null;
  breed: string | null;
  gender: string | null;
  date_of_birth: string | null;
  place_of_origin: string | null;
  country_code: string | null;
  photo_url: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
  story?: string | null;
  special_memory?: string | null;
  favorite_things?: string | null;
  is_public?: boolean | null;
  guardian_email?: string | null;
  guardian_name?: string | null;
};

function sanitizeCloudPhotoUrl(photoUrl?: string | null) {
  if (!photoUrl || photoUrl.length > CLOUD_PHOTO_URL_MAX) {
    return null;
  }

  return photoUrl;
}

export type CloudRegistryInsertPayload = {
  passport_no: string;
  companion_id: string;
  owner_email: string;
  pet_name: string;
  species: string;
  breed: string;
  gender: string;
  date_of_birth: string;
  place_of_origin: string;
  country_code: string;
  photo_url: string | null;
  status: string;
  story?: string | null;
  special_memory?: string | null;
  favorite_things?: string | null;
  is_public: boolean;
  guardian_email?: string | null;
  guardian_name?: string | null;
  updated_at?: string;
};

function toCloudRegistryPayload(
  input: CreateRegistryCloudInput,
  ids: { passportNo: string; companionId: string },
  updatedAt?: string,
): CloudRegistryInsertPayload {
  const normalized = normalizeCompanionLookupInput(toCompanionLookupInput(input));

  return {
    passport_no: ids.passportNo,
    companion_id: ids.companionId,
    owner_email: normalized.ownerEmail,
    pet_name: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    date_of_birth: normalized.dateOfBirth,
    place_of_origin: input.placeOfOrigin.trim(),
    country_code: normalized.countryCode,
    photo_url: sanitizeCloudPhotoUrl(input.photoUrl),
    status: "active",
    story: normalizeStoryField(input.story) || null,
    special_memory: normalizeStoryField(input.specialMemory) || null,
    favorite_things: serializeFavoriteThings(input.favoriteThings ?? "") || null,
    is_public: input.isPublic === true,
    guardian_email:
      displayOwnerEmail(input.ownerEmail) || input.guardianEmail?.trim() || null,
    guardian_name: input.guardianName?.trim() || null,
    ...(updatedAt ? { updated_at: updatedAt } : {}),
  };
}

function toCloudRegistryPayloadPreview(input: CreateRegistryCloudInput) {
  const normalized = normalizeCompanionLookupInput(toCompanionLookupInput(input));

  return {
    owner_email: normalized.ownerEmail,
    pet_name: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    date_of_birth: normalized.dateOfBirth,
    place_of_origin: input.placeOfOrigin.trim(),
    country_code: normalized.countryCode,
    photo_url: sanitizeCloudPhotoUrl(input.photoUrl),
    status: "active",
  };
}

export function cloudRowToRegistryRecord(row: CloudPassportRow): RegistryRecord {
  return {
    passportNo: row.passport_no,
    companionId: row.companion_id,
    petName: row.pet_name,
    species: row.species ?? "",
    breed: row.breed ?? "",
    gender: row.gender ?? "",
    dateOfBirth: row.date_of_birth ?? "",
    placeOfOrigin: row.place_of_origin ?? "",
    countryCode: row.country_code ?? parseCountryCodeFromCompanionId(row.companion_id),
    ownerEmail: row.owner_email,
    photoUrl: row.photo_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status === "active" ? "active" : "active",
    story: row.story?.trim() || undefined,
    specialMemory: row.special_memory?.trim() || undefined,
    favoriteThings: row.favorite_things?.trim() || undefined,
    isPublic: row.is_public === true,
    guardianEmail: row.guardian_email?.trim() || null,
    guardianName: row.guardian_name?.trim() || null,
  };
}

function upsertLocalRegistryRecord(record: RegistryRecord) {
  const registry = getRegistry();
  const index = registry.records.findIndex(
    (entry) =>
      normalizePassportNo(entry.passportNo) ===
      normalizePassportNo(record.passportNo),
  );

  if (index >= 0) {
    registry.records[index] = record;
  } else {
    registry.records.push(record);
  }

  saveRegistry(registry);
}

export async function generateNextPassportNumberCloud() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const year = currentYear();
  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("passport_no")
    .ilike("passport_no", `PLM-${year}-%`);

  if (error) {
    throw error;
  }

  const sequences = (data ?? [])
    .map((row) => parsePassportSequence(row.passport_no, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PLM-${year}-${String(next).padStart(6, "0")}`;
}

async function generateNextCompanionIdCloud(countryCode: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const normalizedCountryCode = normalizeCountryCode(countryCode);

  if (!isValidCountryCode(normalizedCountryCode)) {
    throw new Error(`Invalid country code: ${countryCode}`);
  }

  const year = currentYear();
  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("companion_id")
    .ilike("companion_id", `PK-${year}-%`);

  if (error) {
    throw error;
  }

  const companionIds = (data ?? []).map((row) => row.companion_id as string);

  return generateNextCompanionId(companionIds, normalizedCountryCode, year);
}

export async function findExistingCompanionCloud(
  input: CreateRegistryInput,
): Promise<RegistryRecord | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const normalized = normalizeCompanionLookupInput(toCompanionLookupInput(input));

  const response = await withCloudTimeout(
    supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select("*")
      .eq("owner_email", normalized.ownerEmail),
  );
  const { data, error } = response;

  if (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }

  const records = (data ?? []).map((row) =>
    cloudRowToRegistryRecord(row as CloudPassportRow),
  );

  return findExistingCompanion(records, toCompanionLookupInput(input));
}

export async function findPassportByNumberCloud(
  passportNo: string,
): Promise<RegistryRecord | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const normalized = normalizePassportNo(passportNo);

  if (!normalized) {
    return null;
  }

  const response = await withCloudTimeout(
    supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select("*")
      .eq("passport_no", normalized)
      .maybeSingle<CloudPassportRow>(),
  );
  const { data, error } = response;

  if (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }

  return data ? cloudRowToRegistryRecord(data) : null;
}

export async function createRegistryRecordCloud(
  input: CreateRegistryCloudInput,
): Promise<CreateRegistryResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const existing = await findExistingCompanionCloud(input);

  if (existing) {
    const now = new Date().toISOString();

    await supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .update({ updated_at: now })
      .eq("passport_no", existing.passportNo);

    existing.updatedAt = now;
    upsertLocalRegistryRecord(existing);

    return {
      record: existing,
      isDuplicate: true,
      message: "This companion already has a PetLuma Passport.",
      cloudSynced: true,
    };
  }

  const passportNo = await generateNextPassportNumberCloud();
  const companionId = await generateNextCompanionIdCloud(input.countryCode);
  const now = new Date().toISOString();

  const insertPayload = toCloudRegistryPayload(
    input,
    { passportNo, companionId },
    now,
  );

  console.log("Creating cloud registry record:", insertPayload);

  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .insert(insertPayload)
    .select()
    .single<CloudPassportRow>();

  console.log("Supabase insert data:", data);
  console.error("Supabase insert error:", error);

  if (error) {
    if (error.code === "23505") {
      const conflict = await findExistingCompanionCloud(input);

      if (conflict) {
        upsertLocalRegistryRecord(conflict);
        return {
          record: conflict,
          isDuplicate: true,
          message: "This companion already has a PetLuma Passport.",
          cloudSynced: true,
        };
      }
    }

    throw error;
  }

  if (!data) {
    throw new Error("Cloud registry insert returned no record.");
  }

  const record = cloudRowToRegistryRecord(data);
  upsertLocalRegistryRecord(record);

  return {
    record,
    isDuplicate: false,
    cloudSynced: true,
  };
}

export async function findPassportByNumberWithFallback(
  passportNo: string,
): Promise<RegistryRecord | null> {
  if (isSupabaseConfigured()) {
    try {
      const cloudRecord = await findPassportByNumberCloud(passportNo);

      if (cloudRecord) {
        upsertLocalRegistryRecord(cloudRecord);
        return cloudRecord;
      }
    } catch (error) {
      console.warn("[PetLuma] Cloud passport lookup failed, using local fallback.", error);
    }
  }

  return findPassportByNumber(passportNo);
}

export function findPassportsByOwnerEmailLocal(ownerEmail: string): RegistryRecord[] {
  const email = normalizeEmail(ownerEmail);

  return getRegistry().records.filter(
    (record) => normalizeEmail(record.ownerEmail) === email,
  );
}

export async function findPassportsByOwnerEmailCloud(
  ownerEmail: string,
): Promise<RegistryRecord[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const response = await withCloudTimeout(
    supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select("*")
      .eq("owner_email", normalizeEmail(ownerEmail))
      .order("created_at", { ascending: false }),
  );
  const { data, error } = response;

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => cloudRowToRegistryRecord(row as CloudPassportRow));
}

export async function findPassportsByOwnerEmailWithFallback(
  ownerEmail: string,
): Promise<RecoverPassportsResult> {
  if (isSupabaseConfigured()) {
    try {
      const records = await findPassportsByOwnerEmailCloud(ownerEmail);

      for (const record of records) {
        upsertLocalRegistryRecord(record);
      }

      return { records, source: "cloud" };
    } catch (error) {
      console.warn(
        "[PetLuma] Cloud recover lookup failed, using local fallback.",
        error,
      );

      return {
        records: findPassportsByOwnerEmailLocal(ownerEmail),
        source: "local",
        cloudError: getCloudSyncErrorMessage(error),
      };
    }
  }

  return {
    records: findPassportsByOwnerEmailLocal(ownerEmail),
    source: "local",
  };
}

function getCloudSyncErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return String(error);
}

export async function createRegistryRecordWithFallback(
  input: CreateRegistryCloudInput,
): Promise<CreateRegistryResult> {
  console.log("Supabase env:", {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const payload = toCloudRegistryPayloadPreview(input);
  console.log("Creating cloud registry record:", payload);

  if (isSupabaseConfigured()) {
    try {
      return await createRegistryRecordCloud(input);
    } catch (error) {
      const cloudSyncError = getCloudSyncErrorMessage(error);
      console.error("Supabase insert error:", error);
      console.warn(
        "[PetLuma] Cloud registry create failed, using local fallback.",
        cloudSyncError,
      );

      return {
        ...createRegistryRecord(input),
        cloudSynced: false,
        cloudSyncError,
      };
    }
  }

  const cloudSyncError = "Supabase environment variables are not configured.";
  console.warn("[PetLuma] Supabase not configured, using local registry only.");

  return {
    ...createRegistryRecord(input),
    cloudSynced: false,
    cloudSyncError,
  };
}

export { createRegistryRecord as createCompanion };
