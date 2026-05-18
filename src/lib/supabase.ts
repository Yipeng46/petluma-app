import { createClient } from "@supabase/supabase-js";

type SavePetInput = {
  pet_name: string;
  breed: string;
  photo_url: string | null;
};

export type SavedPet = {
  id: string;
  petluma_id: string;
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

const petLumaAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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

function generatePetLumaId() {
  const code = Array.from({ length: 6 }, () => {
    const index = Math.floor(Math.random() * petLumaAlphabet.length);
    return petLumaAlphabet[index];
  }).join("");

  return `PLM-${code}`;
}

export async function savePet(input: SavePetInput) {
  const supabase = createSupabaseServerClient();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const petlumaId = generatePetLumaId();
    const insertPayload = {
      petluma_id: petlumaId,
      pet_name: input.pet_name,
      breed: input.breed || null,
      photo_url: input.photo_url || null,
    };

    console.log("[PetLuma] savePet insert attempt", {
      attempt: attempt + 1,
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
      .select("id, petluma_id, pet_name, breed, photo_url, created_at")
      .single<SavedPet>();

    if (!error && data) {
      console.log("[PetLuma] saved pet", data);
      return data;
    }

    console.error("[PetLuma] Supabase insert full error", error);

    if (error?.code !== "23505" || attempt === 2) {
      const insertError: SupabaseInsertError = {
        code: error?.code,
        message: error?.message || "Could not save pet.",
        details: error?.details,
        hint: error?.hint,
      };

      throw insertError;
    }
  }

  const fallbackError: SupabaseInsertError = {
    message: "Could not save pet.",
  };

  throw fallbackError;
}
