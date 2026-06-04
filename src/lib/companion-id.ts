import { isValidCountryCode } from "@/lib/countries";

export const COMPANION_ID_PREFIX = "PK";

/** Founding Collection reserves PK-YYYY-RR-000001 through 000100. */
export const FOUNDING_COMPANION_SEQUENCE_MAX = 100;

/** Community Registry issues from PK-YYYY-RR-001001 upward. */
export const COMMUNITY_COMPANION_SEQUENCE_MIN = 1001;

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

export function getNextCompanionSequence(
  companionIds: string[],
  year: number,
): number {
  const sequences = companionIds
    .map((companionId) => parseCompanionSequence(companionId, year))
    .filter((value): value is number => value !== null);

  return (sequences.length ? Math.max(...sequences) : 0) + 1;
}

export function getNextCommunityCompanionSequence(
  companionIds: string[],
  year: number,
): number {
  const nextSequence = getNextCompanionSequence(companionIds, year);
  return Math.max(nextSequence, COMMUNITY_COMPANION_SEQUENCE_MIN);
}

export function generateNextCompanionId(
  companionIds: string[],
  countryCode: string,
  year: number,
): string {
  const nextSequence = getNextCommunityCompanionSequence(companionIds, year);
  return buildCompanionId(year, countryCode, nextSequence);
}

export function isFoundingCompanionSequence(sequence: number) {
  return sequence >= 1 && sequence <= FOUNDING_COMPANION_SEQUENCE_MAX;
}

export function isCommunityCompanionSequence(sequence: number) {
  return sequence >= COMMUNITY_COMPANION_SEQUENCE_MIN;
}
