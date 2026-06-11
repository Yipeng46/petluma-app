import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRecoverableOwnerEmail, isValidEmail, normalizeEmail } from "@/lib/pet-identity";
import { formatRegistryEmailDate } from "@/lib/welcome-email";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const FROM_EMAIL = "PetLuma Kingdom Registry <registry@petluma.co>";
const EMAIL_DIVIDER = "────────────────────";

type SendWelcomeEmailRequest = {
  email?: unknown;
  petName?: unknown;
  companionId?: unknown;
  passportNo?: unknown;
  date?: unknown;
  country?: unknown;
  archiveUrl?: unknown;
};

type WelcomeEmailContent = {
  petName: string;
  companionId: string;
  passportNo: string;
  date: string;
  country: string;
  archiveUrl: string;
};

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isAllLowercaseLetters(value: string) {
  const letters = value.replace(/[^a-zA-Z]/g, "");

  return letters.length > 0 && letters === letters.toLowerCase();
}

function toTitleCaseWords(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatPetNameForEmail(petName: string) {
  const trimmed = petName.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (isAllLowercaseLetters(trimmed)) {
    return toTitleCaseWords(trimmed);
  }

  const first = trimmed.charAt(0);

  if (first === first.toLowerCase() && first !== first.toUpperCase()) {
    return first.toUpperCase() + trimmed.slice(1);
  }

  return trimmed;
}

function buildCleanArchiveUrl(companionId: string) {
  const id = companionId.trim();

  return `${getSiteUrl()}/companion/${id}`;
}

function buildEmailSubject(petName: string) {
  return `Welcome to the Kingdom, ${formatPetNameForEmail(petName)}`;
}

function buildEmailText(content: WelcomeEmailContent) {
  const petName = formatPetNameForEmail(content.petName);

  return [
    "PETLUMA KINGDOM REGISTRY",
    "",
    "Dear Guardian,",
    "",
    "A new companion has entered the Kingdom.",
    "",
    "Companion Name:",
    petName,
    "",
    "Companion ID:",
    content.companionId,
    "",
    "Passport Number:",
    content.passportNo,
    "",
    "Date Registered:",
    content.date,
    "",
    "Country:",
    content.country,
    "",
    EMAIL_DIVIDER,
    "",
    `${petName} has now been preserved within the Kingdom Registry.`,
    "",
    "This archive marks their place in the Kingdom —",
    "",
    "not as property,",
    "",
    "not as data,",
    "",
    "but as family.",
    "",
    "May this record stand as a lasting testament to their place in your life.",
    "",
    "Every companion deserves to be remembered.",
    "",
    EMAIL_DIVIDER,
    "",
    "View Archive:",
    content.archiveUrl,
    "",
    "Keep this email as a record of entry.",
    "",
    "PetLuma Kingdom Registry",
    "",
    getSiteUrl(),
  ].join("\n");
}

function resolveWelcomeEmailContent(body: SendWelcomeEmailRequest): WelcomeEmailContent | null {
  const petName = readText(body.petName, 100);
  const companionId = readText(body.companionId, 40);

  if (!petName || !companionId) {
    return null;
  }

  const passportNo = readText(body.passportNo, 40) || "—";
  const rawDate = readText(body.date, 40);
  const country = readText(body.country, 120) || "—";
  const archiveUrl = buildCleanArchiveUrl(companionId);

  return {
    petName,
    companionId,
    passportNo,
    date: rawDate ? formatRegistryEmailDate(rawDate) : "—",
    country,
    archiveUrl,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendWelcomeEmailRequest;
    const email = readText(body.email, 320);
    const content = resolveWelcomeEmailContent(body);

    if (!isRecoverableOwnerEmail(email) || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, reason: "invalid_or_missing_email" },
        { status: 400 },
      );
    }

    if (!content) {
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
      subject: buildEmailSubject(content.petName),
      text: buildEmailText(content),
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
