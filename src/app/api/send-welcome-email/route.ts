import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRecoverableOwnerEmail, isValidEmail, normalizeEmail } from "@/lib/pet-identity";

export const runtime = "nodejs";

const FROM_EMAIL = "PetLuma Kingdom Registry <registry@petluma.co>";

type SendWelcomeEmailRequest = {
  email?: unknown;
  petName?: unknown;
  companionId?: unknown;
};

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function buildEmailSubject(petName: string) {
  return `Welcome to the Kingdom, ${petName}`;
}

function buildEmailText(petName: string, companionId: string) {
  return [
    `${petName} has been entered into the Registry.`,
    "",
    "Companion ID:",
    companionId,
    "",
    "The archive has been preserved within the Kingdom.",
    "",
    "Every companion deserves to be remembered.",
    "",
    "PetLuma Kingdom Registry",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendWelcomeEmailRequest;
    const email = readText(body.email, 320);
    const petName = readText(body.petName, 100);
    const companionId = readText(body.companionId, 40);

    if (!isRecoverableOwnerEmail(email) || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, reason: "invalid_or_missing_email" },
        { status: 400 },
      );
    }

    if (!petName || !companionId) {
      return NextResponse.json(
        { success: false, reason: "missing_required_fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();

    if (!apiKey) {
      console.warn("[PetLuma] send-welcome-email skipped: RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { success: false, reason: "not_configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: normalizeEmail(email),
      subject: buildEmailSubject(petName),
      text: buildEmailText(petName, companionId),
    });

    if (error) {
      console.warn("[PetLuma] send-welcome-email failed:", error);
      return NextResponse.json({ success: false, reason: error.message }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.warn("[PetLuma] send-welcome-email route failed:", error);
    return NextResponse.json({ success: false, reason: "request_failed" }, { status: 500 });
  }
}
