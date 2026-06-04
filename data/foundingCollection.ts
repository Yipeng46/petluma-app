export type FoundingCompanion = {
  id: string;
  archiveNo: string;
  name: string;
  species: string;
  breed?: string;
  country: string;
  status: string;
  registryDate: string;
  imageUrl?: string;
  guardianNote: string;
  favoriteThings: string[];
  specialMemory: string;
};

export const foundingCollection: FoundingCompanion[] = [
  {
    id: "PK-2026-AU-000001",
    archiveNo: "Companion Archive No.000001",
    name: "Lao Er",
    species: "Cat",
    breed: "",
    country: "Australia",
    status: "Preserved in the Kingdom",
    registryDate: "June 2026",
    imageUrl: "",
    guardianNote: "",
    favoriteThings: [],
    specialMemory: "",
  },
];
