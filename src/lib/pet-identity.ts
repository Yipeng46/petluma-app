export const DUPLICATE_PASSPORT_MESSAGE =
  "This companion already has a PetLuma Passport.";

/** Stored in owner_email when the guardian leaves recovery email blank. */
export const UNLINKED_OWNER_EMAIL = "unlinked@petluma.local";

function collapseWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function trimCollapseSpaces(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeEmail(email: string) {
  return collapseWhitespace(email);
}

export function normalizePetName(name: string) {
  return collapseWhitespace(name);
}

export function normalizeSpecies(species: string) {
  const normalized = collapseWhitespace(species);
  return normalized || "companion";
}

export function normalizeDateOfBirth(dateOfBirth: string) {
  return dateOfBirth.trim();
}

export function buildPetIdentityKey(input: {
  ownerEmail: string;
  petName: string;
  species: string;
  dateOfBirth: string;
}) {
  return [
    normalizeEmail(input.ownerEmail),
    normalizePetName(input.petName),
    normalizeSpecies(input.species),
    normalizeDateOfBirth(input.dateOfBirth),
  ].join("|");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

export function resolveOwnerEmailForStorage(email: string) {
  const trimmed = email.trim();

  if (!trimmed) {
    return UNLINKED_OWNER_EMAIL;
  }

  return normalizeEmail(trimmed);
}

export function displayOwnerEmail(email: string) {
  const normalized = normalizeEmail(email);

  if (!normalized || normalized === normalizeEmail(UNLINKED_OWNER_EMAIL)) {
    return "";
  }

  return normalized;
}

export function isRecoverableOwnerEmail(email: string) {
  const normalized = normalizeEmail(email);

  return Boolean(normalized) && normalized !== normalizeEmail(UNLINKED_OWNER_EMAIL);
}
