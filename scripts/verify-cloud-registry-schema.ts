import { createClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function loadEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_*).",
    );
  }

  return {
    url: normalizeSupabaseUrl(url),
    key,
  };
}

async function main() {
  const { url, key } = loadEnv();
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const table = "petluma_passports";
  const year = new Date().getFullYear();
  const suffix = String(Date.now()).slice(-6);
  const passportNo = `PLM-${year}-${suffix}`;
  const companionId = `PK-${year}-AU-${suffix}`;

  const payload = {
    passport_no: passportNo,
    companion_id: companionId,
    owner_email: "schema-verify@petluma.test",
    pet_name: "Schema Verify",
    species: "Dog",
    breed: "Test Breed",
    gender: "Unknown",
    date_of_birth: "2020-01-01",
    place_of_origin: "Australia",
    country_code: "AU",
    photo_url: null,
    status: "active",
    updated_at: new Date().toISOString(),
  };

  console.log("[verify] inserting test passport:", passportNo);

  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error("[verify] insert failed:", error);
    process.exit(1);
  }

  console.log("[verify] insert ok:", {
    passport_no: data.passport_no,
    country_code: data.country_code,
    owner_email: data.owner_email,
  });

  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq("passport_no", passportNo);

  if (deleteError) {
    console.warn("[verify] cleanup delete failed:", deleteError.message);
    process.exit(1);
  }

  console.log("[verify] cloud registry schema OK");
}

main().catch((error) => {
  console.error("[verify] unexpected error:", error);
  process.exit(1);
});
