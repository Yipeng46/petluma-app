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
  const supabase = createCommunityRegistryClient();

  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select(communityPassportSelect)
      .eq("status", "active")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[PetLuma] Community registry fetch failed:", error.message);
      return [];
    }

    const records = (data ?? []).map((row) =>
      cloudPassportRowToRegistryHallRecord(row as CloudPassportRow),
    );

    return excludeFoundingFromCommunityRecords(records);
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
