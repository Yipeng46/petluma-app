import { NextResponse } from "next/server";
import { ensureGuardianProfileForEmail } from "@/lib/guardian-server";
import { isRecoverableOwnerEmail, isValidEmail } from "@/lib/pet-identity";

export const runtime = "nodejs";

type EnsureGuardianRequest = {
  email?: unknown;
};

export async function POST(request: Request) {
  let body: EnsureGuardianRequest;

  try {
    body = (await request.json()) as EnsureGuardianRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !isValidEmail(email) || !isRecoverableOwnerEmail(email)) {
    return NextResponse.json({ error: "A valid Guardian email is required." }, { status: 400 });
  }

  try {
    const result = await ensureGuardianProfileForEmail(email);

    if (!result) {
      return NextResponse.json(
        { error: "Guardian account service is unavailable." },
        { status: 503 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Guardian account setup failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
