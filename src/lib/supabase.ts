import { createClient } from "@supabase/supabase-js";
import {
  buildPetIdentityKey,
  DUPLICATE_PASSPORT_MESSAGE,
  normalizeDateOfBirth,
  normalizeEmail,
  normalizeSpecies,
} from "@/lib/pet-identity";

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

const savedPetSelect =
  "id, petluma_id, companion_id, passport_number, owner_email, pet_name, species, date_of_birth, pet_identity_key, breed, photo_url, created_at";

function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function createSupabaseServerClient() {
  const rawSupabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("[PetLuma] Supabase server env", {
    cwd: process.cwd(),
    hasSupabaseUrl: Boolean(rawSupabaseUrl),
    hasServiceRoleKey: Boolean(serviceRoleKey),
    supabaseUrlHasRestSuffix: Boolean(rawSupabaseUrl?.includes("/rest/v1")),
  });

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

async function findExistingPet(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  petIdentityKey: string,
) {
  const { data, error } = await supabase
    .from("pets")
    .select(savedPetSelect)
    .eq("pet_identity_key", petIdentityKey)
    .maybeSingle<SavedPet>();

  if (error) {
    console.error("[PetLuma] findExistingPet error", error);
    throw {
      code: error.code,
      message: error.message || "Could not check for an existing passport.",
      details: error.details,
      hint: error.hint,
    } satisfies SupabaseInsertError;
  }

  return data;
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

  const existingPet = await findExistingPet(supabase, petIdentityKey);
  if (existingPet) {
    console.log("[PetLuma] existing passport returned", {
      pet_identity_key: petIdentityKey,
      companion_id: existingPet.companion_id,
    });
    return duplicateResult(existingPet);
  }

  const identity = await allocateCompanionIdentity(
    supabase,
    input.region_code ?? "AU",
  );

  const insertPayload = {
    petluma_id: identity.companion_id,
    companion_id: identity.companion_id,
    passport_number: identity.passport_number,
    owner_email: ownerEmail,
    pet_name: input.pet_name.trim(),
    species: input.species.trim() || "Companion",
    date_of_birth: dateOfBirth || null,
    pet_identity_key: petIdentityKey,
    breed: input.breed || null,
    photo_url: input.photo_url || null,
  };

  console.log("[PetLuma] savePet insert", {
    payload: {
      ...insertPayload,
      photo_url: insertPayload.photo_url
        ? {
            length: insertPayload.photo_url.length,
            prefix: insertPayload.photo_url.slice(0, 80),
          }
        : null,
    },
  });

  const { data, error } = await supabase
    .from("pets")
    .insert(insertPayload)
    .select(savedPetSelect)
    .single<SavedPet>();

  if (error) {
    if (error.code === "23505") {
      const conflictPet = await findExistingPet(supabase, petIdentityKey);
      if (conflictPet) {
        console.log("[PetLuma] duplicate caught by unique constraint", {
          pet_identity_key: petIdentityKey,
          companion_id: conflictPet.companion_id,
        });
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

  console.log("[PetLuma] saved pet", data);
  return {
    pet: data,
    duplicate: false,
  };
}
