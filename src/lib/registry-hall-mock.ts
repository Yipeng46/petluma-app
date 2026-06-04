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
