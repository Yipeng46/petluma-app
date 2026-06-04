import { createClient } from "@supabase/supabase-js";
import { parseCountryCodeFromCompanionId } from "@/lib/companion-id";
import {
  buildPetIdentityKey,
  DUPLICATE_PASSPORT_MESSAGE,
  normalizeDateOfBirth,
  normalizeEmail,
  trimCollapseSpaces,
} from "@/lib/pet-identity";
import { PETLUMA_PASSPORTS_TABLE, type CloudPassportRow } from "@/lib/registry";

type SavePetInput = {
  owner_email: string;
  pet_name: string;
  species: string;
  date_of_birth: string;
  breed: string;
  photo_url: string | null;
  region_code?: string;
};

export type SavedPet = {
  id: string;
  petluma_id: string;
  companion_id: string;
  passport_number: string;
  owner_email: string | null;
  pet_name: string;
  species: string | null;
  date_of_birth: string | null;
  pet_identity_key: string | null;
  breed: string | null;
  photo_url: string | null;
  created_at: string;
};

export type SavePetResult = {
  pet: SavedPet;
  duplicate: boolean;
  message?: string;
};

export type SupabaseInsertError = {
  code?: string;
  message: string;
  details?: string | null;
  hint?: string | null;
};

type AllocatedIdentity = {
  companion_id: string;
  passport_number: string;
  sequence_value: number;
};

const passportSelect =
  "id, passport_no, companion_id, owner_email, pet_name, species, date_of_birth, breed, photo_url, created_at";

function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function createSupabaseServerClient() {
  const rawSupabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawSupabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.",
    );
  }

  return createClient(normalizeSupabaseUrl(rawSupabaseUrl), serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function passportRowToSavedPet(row: CloudPassportRow, petIdentityKey: string | null): SavedPet {
  return {
    id: row.id,
    petluma_id: row.companion_id,
    companion_id: row.companion_id,
    passport_number: row.passport_no,
    owner_email: row.owner_email,
    pet_name: row.pet_name,
    species: row.species,
    date_of_birth: row.date_of_birth,
    pet_identity_key: petIdentityKey,
    breed: row.breed,
    photo_url: row.photo_url,
    created_at: row.created_at,
  };
}

async function allocateCompanionIdentity(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  regionCode = "AU",
): Promise<AllocatedIdentity> {
  const { data, error } = await supabase.rpc("allocate_companion_identity", {
    p_region_code: regionCode,
  });

  if (error) {
    console.error("[PetLuma] allocate_companion_identity error", error);
    throw {
      code: error.code,
      message:
        error.message ||
        "Could not allocate a unique Companion Identity Number.",
      details: error.details,
      hint: error.hint,
    } satisfies SupabaseInsertError;
  }

  const identity = Array.isArray(data) ? data[0] : data;

  if (
    !identity ||
    typeof identity.companion_id !== "string" ||
    typeof identity.passport_number !== "string"
  ) {
    throw {
      message:
        "Companion identity allocation returned an invalid response. Run the Supabase migration first.",
    } satisfies SupabaseInsertError;
  }

  return identity as AllocatedIdentity;
}

async function findExistingPassport(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  input: SavePetInput,
  petIdentityKey: string,
) {
  const ownerEmail = normalizeEmail(input.owner_email);
  const petName = trimCollapseSpaces(input.pet_name);
  const species = trimCollapseSpaces(input.species) || "Companion";
  const dateOfBirth = normalizeDateOfBirth(input.date_of_birth) || "";

  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select(passportSelect)
    .eq("owner_email", ownerEmail);

  if (error) {
    throw {
      code: error.code,
      message: error.message || "Could not check for an existing passport.",
      details: error.details,
      hint: error.hint,
    } satisfies SupabaseInsertError;
  }

  const match = (data ?? []).find((row) => {
    const record = row as CloudPassportRow;
    const key = buildPetIdentityKey({
      ownerEmail: record.owner_email,
      petName: record.pet_name,
      species: record.species ?? "",
      dateOfBirth: record.date_of_birth ?? "",
    });

    return key === petIdentityKey;
  });

  return match ? passportRowToSavedPet(match as CloudPassportRow, petIdentityKey) : null;
}

function duplicateResult(pet: SavedPet): SavePetResult {
  return {
    pet,
    duplicate: true,
    message: DUPLICATE_PASSPORT_MESSAGE,
  };
}

export async function savePet(input: SavePetInput): Promise<SavePetResult> {
  const supabase = createSupabaseServerClient();
  const ownerEmail = normalizeEmail(input.owner_email);
  const dateOfBirth = normalizeDateOfBirth(input.date_of_birth);
  const petIdentityKey = buildPetIdentityKey({
    ownerEmail,
    petName: input.pet_name,
    species: input.species,
    dateOfBirth,
  });

  const existingPet = await findExistingPassport(supabase, input, petIdentityKey);
  if (existingPet) {
    return duplicateResult(existingPet);
  }

  const regionCode = input.region_code ?? "AU";
  const identity = await allocateCompanionIdentity(supabase, regionCode);
  const countryCode =
    parseCountryCodeFromCompanionId(identity.companion_id) || regionCode;
  const now = new Date().toISOString();

  const insertPayload = {
    passport_no: identity.passport_number,
    companion_id: identity.companion_id,
    owner_email: ownerEmail,
    pet_name: trimCollapseSpaces(input.pet_name),
    species: trimCollapseSpaces(input.species) || "Companion",
    date_of_birth: dateOfBirth || null,
    breed: input.breed || null,
    photo_url: input.photo_url || null,
    country_code: countryCode,
    status: "active",
    is_public: false,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .insert(insertPayload)
    .select(passportSelect)
    .single<CloudPassportRow>();

  if (error) {
    if (error.code === "23505") {
      const conflictPet = await findExistingPassport(supabase, input, petIdentityKey);
      if (conflictPet) {
        return duplicateResult(conflictPet);
      }
    }

    console.error("[PetLuma] Supabase insert full error", error);

    throw {
      code: error.code,
      message: error.message || "Could not save pet.",
      details: error.details,
      hint: error.hint,
    } satisfies SupabaseInsertError;
  }

  if (!data) {
    throw {
      message: "Could not save pet.",
    } satisfies SupabaseInsertError;
  }

  return {
    pet: passportRowToSavedPet(data, petIdentityKey),
    duplicate: false,
  };
}
