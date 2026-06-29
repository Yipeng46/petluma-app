import { resolvePublicListPhotoUrl } from "@/lib/companion-photo-url";
import { normalizeEmail } from "@/lib/pet-identity";
import { createSupabaseAdminClient } from "@/lib/supabase/auth-admin";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import { PETLUMA_PASSPORTS_TABLE } from "@/lib/registry";

export type GuardianProfile = {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
};

export type KingdomCompanion = {
  companionId: string;
  petName: string;
  passportNo: string;
  species: string;
  breed: string;
  kingdomSince: string;
  photoUrl: string;
  hasPhoto: boolean;
};

export type GuardianKingdomData = {
  profile: GuardianProfile;
  companions: KingdomCompanion[];
};

type GuardianProfileRow = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

function isDuplicateKeyError(message: string) {
  return /duplicate key|already registered|already exists/i.test(message);
}

export function formatKingdomSince(isoDate: string) {
  const parsed = new Date(isoDate);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function profileRowToGuardianProfile(row: GuardianProfileRow): GuardianProfile {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    createdAt: row.created_at,
  };
}

function buildFallbackProfile(userId: string, email: string): GuardianProfile {
  const normalizedEmail = normalizeEmail(email) || email;

  return {
    id: userId,
    email: normalizedEmail,
    displayName: null,
    createdAt: new Date().toISOString(),
  };
}

export async function syncGuardianProfileForAuthenticatedUser(
  userId: string,
  email: string,
) {
  const normalizedEmail = normalizeEmail(email);
  const admin = createSupabaseAdminClient();

  if (!admin || !normalizedEmail) {
    return null;
  }

  const { data: existingProfile } = await admin
    .from("guardian_profiles")
    .select("id, email, display_name, created_at")
    .eq("id", userId)
    .maybeSingle<GuardianProfileRow>();

  if (existingProfile) {
    return existingProfile;
  }

  const { data: insertedProfile, error: insertError } = await admin
    .from("guardian_profiles")
    .insert({
      id: userId,
      email: normalizedEmail,
    })
    .select("id, email, display_name, created_at")
    .single<GuardianProfileRow>();

  if (insertError) {
    if (isDuplicateKeyError(insertError.message)) {
      const { data: profile } = await admin
        .from("guardian_profiles")
        .select("id, email, display_name, created_at")
        .eq("id", userId)
        .maybeSingle<GuardianProfileRow>();

      return profile;
    }

    throw new Error(insertError.message);
  }

  return insertedProfile;
}

async function resolveGuardianProfile(
  userId: string,
  email: string,
): Promise<GuardianProfile> {
  const supabase = await createAuthServerClient();

  if (supabase) {
    const { data: profileRow } = await supabase
      .from("guardian_profiles")
      .select("id, email, display_name, created_at")
      .eq("id", userId)
      .maybeSingle<GuardianProfileRow>();

    if (profileRow) {
      return profileRowToGuardianProfile(profileRow);
    }
  }

  if (email.trim()) {
    try {
      const syncedProfile = await syncGuardianProfileForAuthenticatedUser(userId, email);

      if (syncedProfile) {
        return profileRowToGuardianProfile(syncedProfile);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Profile sync failed.";
      console.warn("[PetLuma] Guardian profile sync failed:", message);
    }
  }

  return buildFallbackProfile(userId, email);
}

type LegacyPassportRow = {
  companion_id: string;
  owner_email: string | null;
  guardian_email: string | null;
};

function emailMatchesGuardian(
  row: LegacyPassportRow,
  normalizedEmail: string,
) {
  const ownerMatch = row.owner_email
    ? normalizeEmail(row.owner_email) === normalizedEmail
    : false;
  const guardianMatch = row.guardian_email
    ? normalizeEmail(row.guardian_email) === normalizedEmail
    : false;

  return ownerMatch || guardianMatch;
}

export async function linkLegacyCompanionsForGuardian(
  userId: string,
  email: string,
): Promise<number> {
  const normalizedEmail = normalizeEmail(email);
  const admin = createSupabaseAdminClient();

  if (!admin || !normalizedEmail) {
    return 0;
  }

  const { data: candidateRows, error: fetchError } = await admin
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("companion_id, owner_email, guardian_email")
    .is("guardian_id", null)
    .eq("status", "active")
    .or(
      `owner_email.ilike.${normalizedEmail},guardian_email.ilike.${normalizedEmail}`,
    );

  if (fetchError) {
    console.warn("[PetLuma] Legacy companion lookup failed:", fetchError.message);
    return 0;
  }

  const companionIds = (candidateRows ?? [])
    .filter((row) => emailMatchesGuardian(row, normalizedEmail))
    .map((row) => row.companion_id);

  if (companionIds.length === 0) {
    return 0;
  }

  const { error: updateError } = await admin
    .from(PETLUMA_PASSPORTS_TABLE)
    .update({ guardian_id: userId })
    .in("companion_id", companionIds)
    .is("guardian_id", null)
    .eq("status", "active");

  if (updateError) {
    console.warn("[PetLuma] Legacy companion claim failed:", updateError.message);
    return 0;
  }

  return companionIds.length;
}

export async function fetchGuardianKingdomData(
  userId: string,
  email: string,
): Promise<GuardianKingdomData> {
  const profile = await resolveGuardianProfile(userId, email);

  await linkLegacyCompanionsForGuardian(userId, email);

  const supabase = await createAuthServerClient();

  if (!supabase) {
    return { profile, companions: [] };
  }

  const { data: companionRows, error: companionsError } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("companion_id, pet_name, passport_no, photo_url, species, breed, created_at")
    .eq("guardian_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (companionsError) {
    console.warn("[PetLuma] Kingdom companions fetch failed:", companionsError.message);
    return { profile, companions: [] };
  }

  const companions: KingdomCompanion[] = (companionRows ?? []).map((row) => {
    const photo = resolvePublicListPhotoUrl(row.companion_id, row.photo_url);

    return {
      companionId: row.companion_id,
      petName: row.pet_name,
      passportNo: row.passport_no,
      species: row.species?.trim() || "Companion",
      breed: row.breed?.trim() || "—",
      kingdomSince: formatKingdomSince(row.created_at),
      photoUrl: photo.photoUrl,
      hasPhoto: photo.hasPhoto,
    };
  });

  return { profile, companions };
}

export function formatGuardianDisplayName(profile: GuardianProfile) {
  return profile.displayName?.trim() || profile.email;
}

export function formatCompanionCount(count: number) {
  return count === 1 ? "1 Companion" : `${count} Companions`;
}
