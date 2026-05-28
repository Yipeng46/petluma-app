export type RegistryHallCategory = "canine" | "feline" | "other";

export type RegistryHallRecord = {
  companionId: string;
  passportNo: string;
  name: string;
  species: string;
  breed: string;
  kingdomSince: string;
  photoUrl: string;
  category: RegistryHallCategory;
};

export const registryHallRecords: RegistryHallRecord[] = [
  {
    companionId: "PK-2024-AU-000142",
    passportNo: "PLM-2024-000142",
    name: "Luna",
    species: "Cat",
    breed: "Siberian Forest",
    kingdomSince: "January 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=720&fit=crop&q=80",
    category: "feline",
  },
  {
    companionId: "PK-2023-AU-000089",
    passportNo: "PLM-2023-000089",
    name: "Archie",
    species: "Dog",
    breed: "Golden Retriever",
    kingdomSince: "September 2023",
    photoUrl:
      "https://images.unsplash.com/photo-1558787533-7fb0319a8a8e?w=600&h=720&fit=crop&q=80",
    category: "canine",
  },
  {
    companionId: "PK-2024-UK-000201",
    passportNo: "PLM-2024-000201",
    name: "Mochi",
    species: "Cat",
    breed: "British Shorthair",
    kingdomSince: "March 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=720&fit=crop&q=80",
    category: "feline",
  },
  {
    companionId: "PK-2022-AU-000044",
    passportNo: "PLM-2022-000044",
    name: "Hazel",
    species: "Dog",
    breed: "Border Collie",
    kingdomSince: "June 2022",
    photoUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=720&fit=crop&q=80",
    category: "canine",
  },
  {
    companionId: "PK-2024-JP-000118",
    passportNo: "PLM-2024-000118",
    name: "Sora",
    species: "Bird",
    breed: "Budgerigar",
    kingdomSince: "April 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1452572738146-62f516285a50?w=600&h=720&fit=crop&q=80",
    category: "other",
  },
  {
    companionId: "PK-2023-AU-000156",
    passportNo: "PLM-2023-000156",
    name: "Clover",
    species: "Rabbit",
    breed: "Holland Lop",
    kingdomSince: "November 2023",
    photoUrl:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=720&fit=crop&q=80",
    category: "other",
  },
  {
    companionId: "PK-2024-AU-000178",
    passportNo: "PLM-2024-000178",
    name: "Theodore",
    species: "Dog",
    breed: "Cavalier King Charles",
    kingdomSince: "February 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1530281700549-e82e7eb16046?w=600&h=720&fit=crop&q=80",
    category: "canine",
  },
  {
    companionId: "PK-2021-AU-000031",
    passportNo: "PLM-2021-000031",
    name: "Iris",
    species: "Cat",
    breed: "Ragdoll",
    kingdomSince: "August 2021",
    photoUrl:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f5d?w=600&h=720&fit=crop&q=80",
    category: "feline",
  },
];

export type RegistryHallFilter = "all" | RegistryHallCategory;

export function filterRegistryHallRecords(
  records: RegistryHallRecord[],
  query: string,
  category: RegistryHallFilter,
): RegistryHallRecord[] {
  const normalizedQuery = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchesCategory = category === "all" || record.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      record.name.toLowerCase().includes(normalizedQuery) ||
      record.companionId.toLowerCase().includes(normalizedQuery) ||
      record.passportNo.toLowerCase().includes(normalizedQuery)
    );
  });
}
