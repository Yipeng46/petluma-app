export const DUPLICATE_PASSPORT_MESSAGE =
  "This companion already has a PetLuma Passport.";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePetName(name: string) {
  return name.trim().toLowerCase();
}

export function normalizeSpecies(species: string) {
  const normalized = species.trim().toLowerCase();
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
