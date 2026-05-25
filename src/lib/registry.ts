import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

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
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
  status: RegistryRecordStatus;
};

export type RegistryState = {
  records: RegistryRecord[];
};

export type PassportLookupInput = {
  ownerEmail: string;
  petName: string;
  dateOfBirth: string;
};

export type CreateRegistryInput = {
  ownerEmail: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeOfOrigin: string;
};

export type CreateRegistryCloudInput = CreateRegistryInput & {
  photoUrl?: string | null;
};

export type CreateRegistryResult = {
  record: RegistryRecord;
  isDuplicate: boolean;
  message?: string;
};

function emptyRegistry(): RegistryState {
  return { records: [] };
}

function currentYear() {
  return new Date().getFullYear();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePetName(name: string) {
  return name.trim().toLowerCase();
}

function normalizeDate(date: string) {
  return date.trim();
}

function parsePassportSequence(passportNo: string, year: number) {
  const match = passportNo.match(new RegExp(`^PLM-${year}-(\\d{6})$`));

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function parseCompanionSequence(companionId: string, year: number) {
  const match = companionId.match(new RegExp(`^PK-${year}-AU-(\\d{6})$`));

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
  input: PassportLookupInput,
): RegistryRecord | null {
  const email = normalizeEmail(input.ownerEmail);
  const name = normalizePetName(input.petName);
  const dateOfBirth = normalizeDate(input.dateOfBirth);

  return (
    registry.records.find(
      (record) =>
        normalizeEmail(record.ownerEmail) === email &&
        normalizePetName(record.petName) === name &&
        normalizeDate(record.dateOfBirth) === dateOfBirth,
    ) ?? null
  );
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

function generateNextCompanionId(registry: RegistryState, year = currentYear()) {
  const sequences = registry.records
    .map((record) => parseCompanionSequence(record.companionId, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PK-${year}-AU-${String(next).padStart(6, "0")}`;
}

export function createRegistryRecord(
  input: CreateRegistryInput,
): CreateRegistryResult {
  const registry = getRegistry();
  const existing = findExistingPassport(registry, {
    ownerEmail: input.ownerEmail,
    petName: input.petName,
    dateOfBirth: input.dateOfBirth,
  });

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
    companionId: generateNextCompanionId(registry),
    petName: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    dateOfBirth: input.dateOfBirth.trim(),
    placeOfOrigin: input.placeOfOrigin.trim(),
    ownerEmail: input.ownerEmail.trim(),
    createdAt: now,
    updatedAt: now,
    status: "active",
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
  photo_url: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
};

function sanitizeCloudPhotoUrl(photoUrl?: string | null) {
  if (!photoUrl || photoUrl.length > CLOUD_PHOTO_URL_MAX) {
    return null;
  }

  return photoUrl;
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
    ownerEmail: row.owner_email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status === "active" ? "active" : "active",
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

async function generateNextCompanionIdCloud() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const year = currentYear();
  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("companion_id")
    .ilike("companion_id", `PK-${year}-AU-%`);

  if (error) {
    throw error;
  }

  const sequences = (data ?? [])
    .map((row) => parseCompanionSequence(row.companion_id, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PK-${year}-AU-${String(next).padStart(6, "0")}`;
}

export async function findExistingPassportCloud(
  ownerEmail: string,
  petName: string,
  dateOfBirth: string,
): Promise<RegistryRecord | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const response = await withCloudTimeout(
    supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select("*")
      .eq("owner_email", normalizeEmail(ownerEmail))
      .eq("pet_name", petName.trim())
      .eq("date_of_birth", dateOfBirth.trim())
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

  const existing = await findExistingPassportCloud(
    input.ownerEmail,
    input.petName,
    input.dateOfBirth,
  );

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
    };
  }

  const passportNo = await generateNextPassportNumberCloud();
  const companionId = await generateNextCompanionIdCloud();
  const now = new Date().toISOString();

  const insertPayload = {
    passport_no: passportNo,
    companion_id: companionId,
    owner_email: input.ownerEmail.trim(),
    pet_name: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    date_of_birth: input.dateOfBirth.trim(),
    place_of_origin: input.placeOfOrigin.trim(),
    photo_url: sanitizeCloudPhotoUrl(input.photoUrl),
    status: "active",
    updated_at: now,
  };

  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .insert(insertPayload)
    .select("*")
    .single<CloudPassportRow>();

  if (error) {
    if (error.code === "23505") {
      const conflict = await findExistingPassportCloud(
        input.ownerEmail,
        input.petName,
        input.dateOfBirth,
      );

      if (conflict) {
        upsertLocalRegistryRecord(conflict);
        return {
          record: conflict,
          isDuplicate: true,
          message: "This companion already has a PetLuma Passport.",
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

export async function createRegistryRecordWithFallback(
  input: CreateRegistryCloudInput,
): Promise<CreateRegistryResult> {
  if (isSupabaseConfigured()) {
    try {
      return await createRegistryRecordCloud(input);
    } catch (error) {
      console.warn("[PetLuma] Cloud registry create failed, using local fallback.", error);
    }
  }

  return createRegistryRecord(input);
}
