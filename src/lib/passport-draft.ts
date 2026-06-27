import type { PassportData } from "@/lib/passport-data";

export const PASSPORT_DRAFT_STORAGE_KEY = "petluma-passport-draft";

export type PassportDraft = {
  passportData: PassportData;
  termsAccepted: boolean;
};

export function savePassportDraft(draft: PassportDraft) {
  sessionStorage.setItem(PASSPORT_DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export function loadPassportDraft(): PassportDraft | null {
  const raw = sessionStorage.getItem(PASSPORT_DRAFT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PassportDraft;
  } catch {
    return null;
  }
}

export function clearPassportDraft() {
  sessionStorage.removeItem(PASSPORT_DRAFT_STORAGE_KEY);
}

export function buildPassportResumeSignInUrl() {
  const next = encodeURIComponent("/passport?resume=1");
  return `/sign-in?mode=sign-up&next=${next}`;
}
