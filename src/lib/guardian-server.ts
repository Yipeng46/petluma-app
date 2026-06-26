import { randomBytes } from "node:crypto";
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
  photoUrl: string;
  hasPhoto: boolean;
};

export type GuardianKingdomData = {
  profile: GuardianProfile;
  companions: KingdomCompanion[];
};

function isDuplicateKeyError(message: string) {
  return /duplicate key|already registered|already exists/i.test(message);
}

async function resolveAuthUserIdByEmail(email: string) {
  const admin = createSupabaseAdminClient();

  if (!admin) {
    return null;
  }

  const { data, error } = await admin.rpc("get_auth_user_id_by_email", {
    p_email: email,
  });

  if (error) {
    console.warn("[PetLuma] Auth user lookup failed:", error.message);
    return null;
  }

  return typeof data === "string" ? data : null;
}

export async function ensureGuardianProfileForEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const admin = createSupabaseAdminClient();

  if (!admin || !normalizedEmail) {
    return null;
  }

  const { data: existingProfile, error: lookupError } = await admin
    .from("guardian_profiles")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle<{ id: string }>();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (existingProfile) {
    return {
      guardianId: existingProfile.id,
      isNew: false,
    };
  }

  let userId = await resolveAuthUserIdByEmail(normalizedEmail);

  if (!userId) {
    const { data: createdUser, error: createUserError } =
      await admin.auth.admin.createUser({
        email: normalizedEmail,
        password: randomBytes(32).toString("base64url"),
        email_confirm: true,
        user_metadata: {
          source: "companion_registration",
        },
      });

    if (createUserError) {
      if (isDuplicateKeyError(createUserError.message)) {
        userId = await resolveAuthUserIdByEmail(normalizedEmail);
      } else {
        throw new Error(createUserError.message);
      }
    } else {
      userId = createdUser.user.id;
    }
  }

  if (!userId) {
    throw new Error("Unable to resolve Guardian account.");
  }

  const { error: insertError } = await admin.from("guardian_profiles").insert({
    id: userId,
    email: normalizedEmail,
  });

  if (insertError && !isDuplicateKeyError(insertError.message)) {
    throw new Error(insertError.message);
  }

  return {
    guardianId: userId,
    isNew: true,
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
    .maybeSingle<{
      id: string;
      email: string;
      display_name: string | null;
      created_at: string;
    }>();

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
    .single<{
      id: string;
      email: string;
      display_name: string | null;
      created_at: string;
    }>();

  if (insertError) {
    if (isDuplicateKeyError(insertError.message)) {
      const { data: profile } = await admin
        .from("guardian_profiles")
        .select("id, email, display_name, created_at")
        .eq("id", userId)
        .maybeSingle();

      return profile;
    }

    throw new Error(insertError.message);
  }

  return insertedProfile;
}

export async function fetchGuardianKingdomData(
  userId: string,
): Promise<GuardianKingdomData | null> {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    return null;
  }

  const { data: profileRow, error: profileError } = await supabase
    .from("guardian_profiles")
    .select("id, email, display_name, created_at")
    .eq("id", userId)
    .maybeSingle<{
      id: string;
      email: string;
      display_name: string | null;
      created_at: string;
    }>();

  if (profileError || !profileRow) {
    return null;
  }

  const { data: companionRows, error: companionsError } = await supabase
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("companion_id, pet_name, passport_no, photo_url, created_at")
    .eq("guardian_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (companionsError) {
    console.warn("[PetLuma] Kingdom companions fetch failed:", companionsError.message);
    return {
      profile: {
        id: profileRow.id,
        email: profileRow.email,
        displayName: profileRow.display_name,
        createdAt: profileRow.created_at,
      },
      companions: [],
    };
  }

  const companions: KingdomCompanion[] = (companionRows ?? []).map((row) => {
    const photo = resolvePublicListPhotoUrl(row.companion_id, row.photo_url);

    return {
      companionId: row.companion_id,
      petName: row.pet_name,
      passportNo: row.passport_no,
      photoUrl: photo.photoUrl,
      hasPhoto: photo.hasPhoto,
    };
  });

  return {
    profile: {
      id: profileRow.id,
      email: profileRow.email,
      displayName: profileRow.display_name,
      createdAt: profileRow.created_at,
    },
    companions,
  };
}

export function formatGuardianDisplayName(profile: GuardianProfile) {
  return profile.displayName?.trim() || profile.email;
}

export function formatCompanionCount(count: number) {
  return count === 1 ? "1 Companion" : `${count} Companions`;
}
