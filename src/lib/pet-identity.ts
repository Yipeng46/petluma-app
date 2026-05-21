export const DUPLICATE_PASSPORT_MESSAGE =
  "This companion already has a PetLuma Passport.";

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
