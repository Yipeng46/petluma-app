import { resolvePublicListPhotoUrl } from "@/lib/companion-photo-url";
import { normalizeEmail } from "@/lib/pet-identity";
import { createSupabaseAdminClient } from "@/lib/supabase/auth-admin";
import { getSupabaseAuthUrl } from "@/lib/supabase/auth-env";
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

type AuthServerClient = NonNullable<Awaited<ReturnType<typeof createAuthServerClient>>>;

type GuardianProfileRow = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

const KINGDOM_COMPANION_SELECT =
  "companion_id, pet_name, passport_no, photo_url, species, breed, created_at, guardian_id, status";

type KingdomCompanionRow = {
  companion_id: string;
  pet_name: string;
  passport_no: string;
  photo_url: string | null;
  species: string | null;
  breed: string | null;
  created_at: string;
  guardian_id: string | null;
  status: string | null;
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

function buildFallbackProfile(userId: string, email: string): GuardianProfile {
  const normalizedEmail = normalizeEmail(email) || email;

  return {
    id: userId,
    email: normalizedEmail,
    displayName: null,
    createdAt: new Date().toISOString(),
  };
}

function mapCompanionRows(rows: KingdomCompanionRow[]): KingdomCompanion[] {
  return rows.map((row) => {
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
}

async function fetchKingdomCompanions(
  supabase: AuthServerClient,
  userId: string,
): Promise<KingdomCompanionRow[]> {
  const { data, error } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select(KINGDOM_COMPANION_SELECT)
    .eq("guardian_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[PetLuma] Kingdom companions fetch failed:", error.message);
    return [];
  }

  return (data ?? []) as KingdomCompanionRow[];
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

async function ensureGuardianProfileForLegacyClaim(
  userId: string,
  email: string,
  supabase: AuthServerClient,
) {
  const { data: profileRow } = await supabase
    .from("guardian_profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle<{ id: string }>();

  if (profileRow) {
    return;
  }

  if (!email.trim()) {
    return;
  }

  try {
    await syncGuardianProfileForAuthenticatedUser(userId, email);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Profile sync failed.";
    console.warn("[PetLuma] Guardian profile sync failed:", message);
  }
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
  console.log("[PetLuma] legacy claim start");
  console.log("[PetLuma] legacy claim user.id", userId);
  console.log("[PetLuma] legacy claim user.email", email);

  const normalizedEmail = normalizeEmail(email);
  const admin = createSupabaseAdminClient();

  if (!admin || !normalizedEmail) {
    console.log("[PetLuma] legacy claim update skipped", {
      reason: !admin ? "admin client unavailable" : "normalized email empty",
      hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasSupabaseAuthUrl: Boolean(getSupabaseAuthUrl()),
    });
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
    console.error("[PetLuma] legacy claim lookup error", fetchError);
    return 0;
  }

  const companionIds = (candidateRows ?? [])
    .filter((row) => emailMatchesGuardian(row, normalizedEmail))
    .map((row) => row.companion_id);

  if (companionIds.length === 0) {
    console.log("[PetLuma] legacy claim update skipped", {
      reason: "no matching legacy passports after email filter",
      candidateCount: candidateRows?.length ?? 0,
    });
    return 0;
  }

  for (const companionId of companionIds) {
    console.log("[PetLuma] legacy claim passport.companion_id", companionId);
  }

  const { data: updateData, error: updateError, count: updateCount } = await admin
    .from(PETLUMA_PASSPORTS_TABLE)
    .update({ guardian_id: userId })
    .in("companion_id", companionIds)
    .is("guardian_id", null)
    .eq("status", "active")
    .select("companion_id, guardian_id");

  console.log("[PetLuma] legacy claim update result", {
    updateData,
    updateCount,
    companionIds,
  });

  if (updateError) {
    console.error("[PetLuma] legacy claim update error", updateError);
    return 0;
  }

  return companionIds.length;
}

export async function fetchGuardianKingdomData(
  userId: string,
  email: string,
  supabase: AuthServerClient,
): Promise<GuardianKingdomData> {
  let companionRows = await fetchKingdomCompanions(supabase, userId);

  if (companionRows.length === 0) {
    console.log("[PetLuma] legacy claim path triggered", {
      userId,
      email,
    });
    await ensureGuardianProfileForLegacyClaim(userId, email, supabase);
    await linkLegacyCompanionsForGuardian(userId, email);
    companionRows = await fetchKingdomCompanions(supabase, userId);
  }

  return {
    profile: buildFallbackProfile(userId, email),
    companions: mapCompanionRows(companionRows),
  };
}

export function formatGuardianDisplayName(profile: GuardianProfile) {
  return profile.displayName?.trim() || profile.email;
}

export function formatCompanionCount(count: number) {
  return count === 1 ? "1 Companion" : `${count} Companions`;
}
