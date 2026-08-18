import { NextResponse } from "next/server";
import { updateCompanionStoryForGuardian } from "@/lib/companion-story-server";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export const runtime = "nodejs";

type StoryRouteContext = {
  params: Promise<{ companionId: string }>;
};

type StoryPayload = {
  story?: unknown;
};

function readStory(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value;
}

export async function PATCH(request: Request, context: StoryRouteContext) {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Auth service is unavailable." }, { status: 503 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { companionId } = await context.params;
  const normalizedCompanionId = decodeURIComponent(companionId).trim();

  if (!normalizedCompanionId) {
    return NextResponse.json({ error: "Companion ID is required." }, { status: 400 });
  }

  let body: StoryPayload;

  try {
    body = (await request.json()) as StoryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const result = await updateCompanionStoryForGuardian(
      normalizedCompanionId,
      user.id,
      readStory(body.story),
    );

    return NextResponse.json({
      companionId: normalizedCompanionId,
      story: result.story,
      updatedAt: result.updatedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save story.";

    if (message.includes("permission")) {
      return NextResponse.json({ error: message }, { status: 403 });
    }

    if (message.includes("characters or fewer")) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
