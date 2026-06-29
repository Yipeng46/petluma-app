export const PASSPORT_OFFICE_PATH = "/passport";
export const PASSPORT_ACCESS_PATH = "/passport/access";

export function buildPassportSignInUrl(mode?: "sign-up") {
  const next = encodeURIComponent(PASSPORT_OFFICE_PATH);
  if (mode === "sign-up") {
    return `/sign-in?mode=sign-up&next=${next}`;
  }
  return `/sign-in?next=${next}`;
}
