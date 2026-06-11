import { Resend } from "resend";
import { isRecoverableOwnerEmail, isValidEmail, normalizeEmail } from "@/lib/pet-identity";

export type WelcomeEmailPayload = {
  toEmail: string;
  petName: string;
  companionId: string;
  passportNo: string;
  dateRegistered: string;
  country: string;
  archiveUrl: string;
};

const EMAIL_DIVIDER = "────────────────────";

export function getRegistrySiteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return "https://petluma.co";
}

export function buildCompanionArchiveUrl(companionId: string) {
  return `${getRegistrySiteOrigin()}/companion/${encodeURIComponent(companionId)}`;
}

export function formatRegistryEmailDate(isoDate: string) {
  const parsed = new Date(isoDate);

  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function buildWelcomeEmailSubject(petName: string) {
  return `Welcome to the Kingdom, ${petName}`;
}

export function buildWelcomeEmailText(payload: WelcomeEmailPayload) {
  return [
    "PETLUMA KINGDOM REGISTRY",
    "",
    "A new companion has entered the Kingdom.",
    "",
    "Companion Name",
    payload.petName,
    "",
    "Companion ID",
    payload.companionId,
    "",
    "Passport Number",
    payload.passportNo,
    "",
    "Date Registered",
    payload.dateRegistered,
    "",
    "Country",
    payload.country,
    "",
    EMAIL_DIVIDER,
    "",
    "Every companion deserves to be remembered.",
    "",
    `${payload.petName} has now been preserved within the Kingdom Registry.`,
    "",
    "Not as property.",
    "Not as data.",
    "But as family.",
    "",
    "This record has been archived and assigned a unique Companion ID within the Kingdom.",
    "",
    "Keep this email as a record of entry.",
    "",
    EMAIL_DIVIDER,
    "",
    "View Archive:",
    payload.archiveUrl,
    "",
    "The Kingdom grows one companion at a time.",
    "",
    "PetLuma Kingdom Registry",
    "https://petluma.co",
  ].join("\n");
}

export type WelcomeEmailSendResult =
  | { sent: true }
  | { sent: false; reason: string };

export async function sendWelcomeEmail(
  payload: WelcomeEmailPayload,
): Promise<WelcomeEmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const toEmail = normalizeEmail(payload.toEmail);

  if (!isRecoverableOwnerEmail(toEmail) || !isValidEmail(toEmail)) {
    return { sent: false, reason: "invalid_or_missing_recipient" };
  }

  if (!apiKey || !from) {
    console.warn("[PetLuma] Welcome email skipped: Resend is not configured.");
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: toEmail,
      subject: buildWelcomeEmailSubject(payload.petName),
      text: buildWelcomeEmailText(payload),
    });

    if (error) {
      console.warn("[PetLuma] Welcome email failed:", error);
      return { sent: false, reason: error.message };
    }

    return { sent: true };
  } catch (error) {
    console.warn("[PetLuma] Welcome email failed:", error);
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "send_failed",
    };
  }
}
