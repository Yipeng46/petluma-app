import { NextResponse } from "next/server";
import { isRecoverableOwnerEmail, isValidEmail, normalizeEmail } from "@/lib/pet-identity";
import { buildCompanionUrl } from "@/lib/site-url";
import { formatRegistryEmailDate, sendWelcomeEmail } from "@/lib/welcome-email";

export const runtime = "nodejs";

type WelcomeEmailRequest = {
  toEmail?: unknown;
  petName?: unknown;
  companionId?: unknown;
  passportNo?: unknown;
  dateRegistered?: unknown;
  country?: unknown;
};

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WelcomeEmailRequest;
    const toEmail = readText(body.toEmail, 320);
    const petName = readText(body.petName, 100);
    const companionId = readText(body.companionId, 40);
    const passportNo = readText(body.passportNo, 40);
    const dateRegistered = readText(body.dateRegistered, 40);
    const country = readText(body.country, 120);

    if (!isRecoverableOwnerEmail(toEmail) || !isValidEmail(toEmail)) {
      return NextResponse.json({ sent: false, reason: "invalid_or_missing_recipient" });
    }

    if (!petName || !companionId || !passportNo) {
      return NextResponse.json({ sent: false, reason: "missing_required_fields" }, { status: 400 });
    }

    const result = await sendWelcomeEmail({
      toEmail: normalizeEmail(toEmail),
      petName,
      companionId,
      passportNo,
      dateRegistered: dateRegistered
        ? formatRegistryEmailDate(dateRegistered)
        : formatRegistryEmailDate(new Date().toISOString()),
      country: country || "—",
      archiveUrl: buildCompanionUrl(companionId),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.warn("[PetLuma] Welcome email route failed:", error);
    return NextResponse.json({ sent: false, reason: "request_failed" });
  }
}
