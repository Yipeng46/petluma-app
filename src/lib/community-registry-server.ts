import { createClient } from "@supabase/supabase-js";
import {
  cloudPassportRowToRegistryHallRecord,
  excludeFoundingFromCommunityRecords,
  isFoundingCompanionId,
} from "@/lib/registry-hall";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";
import { PETLUMA_PASSPORTS_TABLE, type CloudPassportRow } from "@/lib/registry";

const communityPassportSelect =
  "id, passport_no, companion_id, owner_email, pet_name, species, breed, gender, date_of_birth, place_of_origin, country_code, photo_url, story, special_memory, favorite_things, is_public, guardian_email, guardian_name, status, created_at, updated_at";

function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function createCommunityRegistryClient() {
  const rawSupabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const apiKey = serviceRoleKey ?? anonKey;

  if (!rawSupabaseUrl || !apiKey) {
    return null;
  }

  return createClient(normalizeSupabaseUrl(rawSupabaseUrl), apiKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function fetchCommunityRegistryHallRecords(): Promise<RegistryHallRecord[]> {
  const rawSupabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const tableName = PETLUMA_PASSPORTS_TABLE;

  console.log("[PetLuma][Hall] fetchCommunityRegistryHallRecords", {
    SUPABASE_URL: rawSupabaseUrl ?? "(undefined)",
    table: tableName,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });

  const supabase = createCommunityRegistryClient();

  if (!supabase) {
    console.warn("[PetLuma][Hall] Supabase client not created — missing URL or API key");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(communityPassportSelect)
      .eq("status", "active")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    console.log("[PetLuma][Hall] Supabase query result", {
      error: error
        ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          }
        : null,
      dataLength: data?.length ?? 0,
      firstRecord: data?.[0]
        ? {
            companion_id: (data[0] as CloudPassportRow).companion_id,
            status: (data[0] as CloudPassportRow).status,
            is_public: (data[0] as CloudPassportRow).is_public,
            pet_name: (data[0] as CloudPassportRow).pet_name,
          }
        : null,
    });

    if (error) {
      console.warn("[PetLuma] Community registry fetch failed:", error.message);
      return [];
    }

    const records = (data ?? []).map((row) =>
      cloudPassportRowToRegistryHallRecord(row as CloudPassportRow),
    );

    const filtered = excludeFoundingFromCommunityRecords(records);

    console.log("[PetLuma][Hall] after excludeFoundingFromCommunityRecords", {
      recordsLength: filtered.length,
    });

    return filtered;
  } catch (error) {
    console.warn("[PetLuma] Community registry fetch failed:", error);
    return [];
  }
}

export async function fetchCommunityRegistryHallRecordByCompanionId(
  companionId: string,
): Promise<RegistryHallRecord | undefined> {
  const normalized = decodeURIComponent(companionId).trim();

  if (!normalized || isFoundingCompanionId(normalized)) {
    return undefined;
  }

  const supabase = createCommunityRegistryClient();

  if (!supabase) {
    return undefined;
  }

  try {
    const { data, error } = await supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select(communityPassportSelect)
      .eq("companion_id", normalized)
      .maybeSingle<CloudPassportRow>();

    if (error || !data) {
      return undefined;
    }

    return cloudPassportRowToRegistryHallRecord(data);
  } catch (error) {
    console.warn("[PetLuma] Community registry lookup failed:", error);
    return undefined;
  }
}
