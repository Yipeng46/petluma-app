import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  } catch {
    // ignore
  }
}

loadEnv();

const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("MISSING_ENV");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const table = await supabase.from("petluma_passports").select("id").limit(1);
  console.log("petluma_passports_exists", !table.error);
  if (table.error) {
    console.log("table_error", table.error.message);
    process.exit(0);
  }

  const v15 = await supabase
    .from("petluma_passports")
    .select("story,special_memory,favorite_things,is_public,guardian_email,guardian_name")
    .limit(1);

  console.log("v15_columns_ok", !v15.error);
  if (v15.error) {
    console.log("v15_error", v15.error.message);
  }

  const { count, error: countError } = await supabase
    .from("petluma_passports")
    .select("*", { count: "exact", head: true });

  console.log("petluma_passports_count", countError ? "error" : count);

  const pets = await supabase.from("pets").select("companion_id", { count: "exact", head: true });
  console.log("pets_count", pets.error ? "error" : pets.count);
}

main();
