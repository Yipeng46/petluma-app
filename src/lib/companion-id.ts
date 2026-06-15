import { isValidCountryCode } from "@/lib/countries";

export const COMPANION_ID_PREFIX = "PK";

/** Companion IDs issue from PK-YYYY-CC-000001 upward. */
export const COMPANION_SEQUENCE_MIN = 1;

const COMPANION_ID_PATTERN = /^PK-(\d{4})-([A-Z]{2})-(\d{6})$/;

export function normalizeCountryCode(countryCode: string) {
  return countryCode.trim().toUpperCase();
}

export function buildCompanionId(
  year: number,
  countryCode: string,
  sequence: number,
): string {
  const normalizedCode = normalizeCountryCode(countryCode);

  if (!isValidCountryCode(normalizedCode)) {
    throw new Error(`Invalid country code: ${countryCode}`);
  }

  return `${COMPANION_ID_PREFIX}-${year}-${normalizedCode}-${String(sequence).padStart(6, "0")}`;
}

export function parseCompanionId(companionId: string) {
  const match = companionId.trim().toUpperCase().match(COMPANION_ID_PATTERN);

  if (!match) {
    return null;
  }

  return {
    year: Number.parseInt(match[1], 10),
    countryCode: match[2],
    sequence: Number.parseInt(match[3], 10),
  };
}

export function parseCompanionSequence(companionId: string, year: number) {
  const parsed = parseCompanionId(companionId);

  if (!parsed || parsed.year !== year) {
    return null;
  }

  return parsed.sequence;
}

export function parseCountryCodeFromCompanionId(companionId: string) {
  return parseCompanionId(companionId)?.countryCode ?? "";
}

export function getKingdomRecordFromCompanionId(companionId: string) {
  const parsed = parseCompanionId(companionId);

  if (parsed) {
    return String(parsed.sequence).padStart(6, "0");
  }

  const lastSegment = companionId.trim().split("-").pop() ?? "";

  if (/^\d{1,6}$/.test(lastSegment)) {
    return lastSegment.padStart(6, "0");
  }

  const digits = companionId.replace(/\D/g, "");

  if (digits.length >= 6) {
    return digits.slice(-6);
  }

  return lastSegment || "—";
}

export function getNextCompanionSequence(
  companionIds: string[],
  year: number,
): number {
  const sequences = companionIds
    .map((companionId) => parseCompanionSequence(companionId, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;
  return Math.max(next, COMPANION_SEQUENCE_MIN);
}

export function generateNextCompanionId(
  companionIds: string[],
  countryCode: string,
  year: number,
): string {
  const nextSequence = getNextCompanionSequence(companionIds, year);
  return buildCompanionId(year, countryCode, nextSequence);
}
