import { createClient } from "@supabase/supabase-js";
import { cloudPassportRowToRegistryHallRecord } from "@/lib/registry-hall";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";
import { PETLUMA_PASSPORTS_TABLE, type CloudPassportRow } from "@/lib/registry";

const PUBLIC_PASSPORT_SELECT =
  "id, passport_no, companion_id, owner_email, pet_name, species, breed, gender, date_of_birth, place_of_origin, country_code, photo_url, story, special_memory, favorite_things, is_public, guardian_email, guardian_name, status, created_at, updated_at";

const PUBLIC_POOL_SIZE = 36;

function normalizeSupabaseUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function createRegistryClient() {
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

function normalizeCompanionId(companionId: string) {
  return decodeURIComponent(companionId).trim();
}

function shuffleRecords<T>(records: T[]): T[] {
  const copy = [...records];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

async function fetchPublicCompanionPool(
  excludeCompanionId?: string,
): Promise<RegistryHallRecord[]> {
  const supabase = createRegistryClient();

  if (!supabase) {
    return [];
  }

  const exclude = excludeCompanionId ? normalizeCompanionId(excludeCompanionId) : "";

  try {
    let query = supabase
      .from(PETLUMA_PASSPORTS_TABLE)
      .select(PUBLIC_PASSPORT_SELECT)
      .eq("status", "active")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(PUBLIC_POOL_SIZE);

    if (exclude) {
      query = query.neq("companion_id", exclude);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("[PetLuma] Public companion pool fetch failed:", error.message);
      return [];
    }

    return (data ?? []).map((row) =>
      cloudPassportRowToRegistryHallRecord(row as CloudPassportRow),
    );
  } catch (error) {
    console.warn("[PetLuma] Public companion pool fetch failed:", error);
    return [];
  }
}

export async function getRelatedCompanions(
  excludeCompanionId: string,
  limit = 3,
): Promise<RegistryHallRecord[]> {
  const normalized = normalizeCompanionId(excludeCompanionId);

  if (!normalized || limit < 1) {
    return [];
  }

  const pool = await fetchPublicCompanionPool(normalized);
  return shuffleRecords(pool).slice(0, limit);
}

export async function getRandomPublicCompanion(
  excludeCompanionId?: string,
): Promise<RegistryHallRecord | null> {
  const pool = await fetchPublicCompanionPool(excludeCompanionId);

  if (pool.length === 0) {
    return null;
  }

  return shuffleRecords(pool)[0] ?? null;
}

export function buildRandomCompanionDiscoveryUrl(excludeCompanionId?: string) {
  const params = new URLSearchParams();

  if (excludeCompanionId?.trim()) {
    params.set("exclude", excludeCompanionId.trim());
  }

  const query = params.toString();
  return query ? `/api/random-companion?${query}` : "/api/random-companion";
}
