export type RegistryHallCategory = "canine" | "feline" | "other";

export type RegistryHallRecord = {
  companionId: string;
  passportNo: string;
  name: string;
  species: string;
  breed: string;
  kingdomSince: string;
  registeredAt: string;
  photoUrl: string;
  category: RegistryHallCategory;
  guardian: string;
  isPublic: boolean;
  story?: string;
};

const COUNTRY_BY_CODE: Record<string, string> = {
  AU: "Australia",
  UK: "United Kingdom",
  JP: "Japan",
  US: "United States",
};

export function getCountryFromCompanionId(companionId: string): string {
  const code = companionId.split("-")[2];
  return code ? (COUNTRY_BY_CODE[code] ?? code) : "—";
}

export const registryHallRecords: RegistryHallRecord[] = [
  {
    companionId: "PK-2024-AU-000142",
    passportNo: "PLM-2024-000142",
    name: "Luna",
    species: "Cat",
    breed: "Siberian Forest",
    kingdomSince: "January 2024",
    registeredAt: "2024-01-28T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=640&h=800&fit=crop&q=80",
    category: "feline",
    guardian: "Eleanor Whitmore",
    isPublic: true,
    story:
      "Luna arrived on a quiet winter evening and never left the sunlit corner of the study. Her presence turned an ordinary home into a place worth recording.",
  },
  {
    companionId: "PK-2023-AU-000089",
    passportNo: "PLM-2023-000089",
    name: "Archie",
    species: "Dog",
    breed: "Golden Retriever",
    kingdomSince: "September 2023",
    registeredAt: "2023-09-15T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1558787533-7fb0319a8a8e?w=640&h=800&fit=crop&q=80",
    category: "canine",
    guardian: "James & Clara Nguyen",
    isPublic: true,
    story:
      "Archie walked every coastal path we knew and several we discovered together. The Registry holds what the tide cannot take.",
  },
  {
    companionId: "PK-2024-UK-000201",
    passportNo: "PLM-2024-000201",
    name: "Mochi",
    species: "Cat",
    breed: "British Shorthair",
    kingdomSince: "March 2024",
    registeredAt: "2024-03-12T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=640&h=800&fit=crop&q=80",
    category: "feline",
    guardian: "Thomas Reed",
    isPublic: true,
  },
  {
    companionId: "PK-2022-AU-000044",
    passportNo: "PLM-2022-000044",
    name: "Hazel",
    species: "Dog",
    breed: "Border Collie",
    kingdomSince: "June 2022",
    registeredAt: "2022-06-22T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=640&h=800&fit=crop&q=80",
    category: "canine",
    guardian: "Margaret Olsen",
    isPublic: true,
  },
  {
    companionId: "PK-2024-JP-000118",
    passportNo: "PLM-2024-000118",
    name: "Sora",
    species: "Bird",
    breed: "Budgerigar",
    kingdomSince: "April 2024",
    registeredAt: "2024-04-03T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1452572738146-62f516285a50?w=640&h=800&fit=crop&q=80",
    category: "other",
    guardian: "Yuki Tanaka",
    isPublic: true,
  },
  {
    companionId: "PK-2023-AU-000156",
    passportNo: "PLM-2023-000156",
    name: "Clover",
    species: "Rabbit",
    breed: "Holland Lop",
    kingdomSince: "November 2023",
    registeredAt: "2023-11-09T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=640&h=800&fit=crop&q=80",
    category: "other",
    guardian: "Amelia Hart",
    isPublic: true,
  },
  {
    companionId: "PK-2024-AU-000178",
    passportNo: "PLM-2024-000178",
    name: "Theodore",
    species: "Dog",
    breed: "Cavalier King Charles",
    kingdomSince: "February 2024",
    registeredAt: "2024-02-14T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1530281700549-e82e7eb16046?w=640&h=800&fit=crop&q=80",
    category: "canine",
    guardian: "Catherine Bell",
    isPublic: true,
  },
  {
    companionId: "PK-2021-AU-000031",
    passportNo: "PLM-2021-000031",
    name: "Iris",
    species: "Cat",
    breed: "Ragdoll",
    kingdomSince: "August 2021",
    registeredAt: "2021-08-07T10:00:00.000Z",
    photoUrl:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f5d?w=640&h=800&fit=crop&q=80",
    category: "feline",
    guardian: "Daniel Mercer",
    isPublic: false,
  },
];

export type RegistryHallFilter = "all" | RegistryHallCategory;

export function getPublicRegistryRecords(): RegistryHallRecord[] {
  return registryHallRecords.filter((record) => record.isPublic);
}

export function getRecentlyRegisteredCompanions(limit: number): RegistryHallRecord[] {
  return [...getPublicRegistryRecords()]
    .sort(
      (a, b) =>
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime(),
    )
    .slice(0, limit);
}

export function getRegistryHallRecordByCompanionId(
  companionId: string,
): RegistryHallRecord | undefined {
  const normalized = decodeURIComponent(companionId).trim().toUpperCase();
  const record = registryHallRecords.find(
    (entry) => entry.companionId.toUpperCase() === normalized,
  );

  if (!record?.isPublic) {
    return undefined;
  }

  return record;
}

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
