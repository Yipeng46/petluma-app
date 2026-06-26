import { NextResponse } from "next/server";
import { syncGuardianProfileForAuthenticatedUser } from "@/lib/guardian-server";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Auth service is unavailable." }, { status: 503 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const profile = await syncGuardianProfileForAuthenticatedUser(user.id, user.email);

    if (!profile) {
      return NextResponse.json(
        { error: "Guardian profile service is unavailable." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      guardianId: profile.id,
      email: profile.email,
      displayName: profile.display_name,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Profile sync failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
