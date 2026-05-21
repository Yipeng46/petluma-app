import { createClient } from "@supabase/supabase-js";

type SavePetInput = {
  pet_name: string;
  breed: string;
  photo_url: string | null;
  region_code?: string;
};

export type SavedPet = {
  id: string;
  petluma_id: string;
  companion_id: string;
  passport_number: string;
  pet_name: string;
  breed: string | null;
  photo_url: string | null;
  created_at: string;
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

export async function savePet(input: SavePetInput) {
  const supabase = createSupabaseServerClient();
  const identity = await allocateCompanionIdentity(
    supabase,
    input.region_code ?? "AU",
  );

  const insertPayload = {
    petluma_id: identity.companion_id,
    companion_id: identity.companion_id,
    passport_number: identity.passport_number,
    pet_name: input.pet_name,
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
    .select(
      "id, petluma_id, companion_id, passport_number, pet_name, breed, photo_url, created_at",
    )
    .single<SavedPet>();

  if (error || !data) {
    console.error("[PetLuma] Supabase insert full error", error);

    throw {
      code: error?.code,
      message: error?.message || "Could not save pet.",
      details: error?.details,
      hint: error?.hint,
    } satisfies SupabaseInsertError;
  }

  console.log("[PetLuma] saved pet", data);
  return data;
}
