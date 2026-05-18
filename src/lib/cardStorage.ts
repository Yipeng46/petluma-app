export type StoredCompanionCard = {
  name: string;
  breed: string;
  personality: string;
  favoritePlace: string;
  photoUrl: string | null;
};

export const companionCardStorageKey = "petluma-companion-card";
