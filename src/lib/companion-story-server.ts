import { createSupabaseAdminClient } from "@/lib/supabase/auth-admin";
import { PETLUMA_PASSPORTS_TABLE } from "@/lib/registry";
import { normalizeStoryField } from "@/lib/story-archive";
import { PASSPORT_FIELD_LIMITS } from "@/lib/passport-form";

export async function guardianOwnsCompanion(
  companionId: string,
  guardianId: string,
): Promise<boolean> {
  const admin = createSupabaseAdminClient();

  if (!admin) {
    return false;
  }

  const normalizedCompanionId = decodeURIComponent(companionId).trim();

  const { data, error } = await admin
    .from(PETLUMA_PASSPORTS_TABLE)
    .select("guardian_id")
    .eq("companion_id", normalizedCompanionId)
    .eq("status", "active")
    .maybeSingle<{ guardian_id: string | null }>();

  if (error || !data) {
    return false;
  }

  return data.guardian_id === guardianId;
}

export async function updateCompanionStoryForGuardian(
  companionId: string,
  guardianId: string,
  story: string,
) {
  const admin = createSupabaseAdminClient();

  if (!admin) {
    throw new Error("Registry service is unavailable.");
  }

  const normalizedCompanionId = decodeURIComponent(companionId).trim();
  const normalizedStory = normalizeStoryField(story);

  if (normalizedStory.length > PASSPORT_FIELD_LIMITS.story) {
    throw new Error(
      `Story must be ${PASSPORT_FIELD_LIMITS.story} characters or fewer.`,
    );
  }

  const ownsCompanion = await guardianOwnsCompanion(
    normalizedCompanionId,
    guardianId,
  );

  if (!ownsCompanion) {
    throw new Error("You do not have permission to edit this companion.");
  }

  const now = new Date().toISOString();

  const { error } = await admin
    .from(PETLUMA_PASSPORTS_TABLE)
    .update({
      story: normalizedStory || null,
      updated_at: now,
    })
    .eq("companion_id", normalizedCompanionId)
    .eq("guardian_id", guardianId)
    .eq("status", "active");

  if (error) {
    throw new Error(error.message);
  }

  return {
    story: normalizedStory,
    updatedAt: now,
  };
}
