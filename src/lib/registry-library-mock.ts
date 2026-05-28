export type RegistryLibraryRecord = {
  companionId: string;
  name: string;
  species: string;
  breed: string;
  kingdomSince: string;
  photoUrl: string;
  guardianNote: string;
};

export const registryLibraryRecords: RegistryLibraryRecord[] = [
  {
    companionId: "PK-2024-AU-000142",
    name: "Luna",
    species: "Cat",
    breed: "Siberian Forest",
    kingdomSince: "January 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Luna arrived quietly and stayed like a season that never ended. Her registry entry holds the calm she brought to every room.",
  },
  {
    companionId: "PK-2023-AU-000089",
    name: "Archie",
    species: "Dog",
    breed: "Golden Retriever",
    kingdomSince: "September 2023",
    photoUrl:
      "https://images.unsplash.com/photo-1558787533-7fb0319a8a8e?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Archie greeted the world with patience and gold-light warmth. This volume preserves his steady companionship.",
  },
  {
    companionId: "PK-2024-UK-000201",
    name: "Mochi",
    species: "Cat",
    breed: "British Shorthair",
    kingdomSince: "March 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Mochi moved through the home like soft punctuation — brief, perfect, unforgettable.",
  },
  {
    companionId: "PK-2022-AU-000044",
    name: "Hazel",
    species: "Dog",
    breed: "Border Collie",
    kingdomSince: "June 2022",
    photoUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Hazel watched everything with intelligence and grace. Her archive page is a record of devotion without demand.",
  },
  {
    companionId: "PK-2024-JP-000118",
    name: "Sora",
    species: "Bird",
    breed: "Budgerigar",
    kingdomSince: "April 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1452572738146-62f516285a50?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Sora filled the mornings with colour and song. A small presence, permanently kept.",
  },
  {
    companionId: "PK-2023-AU-000156",
    name: "Clover",
    species: "Rabbit",
    breed: "Holland Lop",
    kingdomSince: "November 2023",
    photoUrl:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Clover was gentle by nature and precise in affection. This entry honours a quiet, perfect friend.",
  },
  {
    companionId: "PK-2024-AU-000178",
    name: "Theodore",
    species: "Dog",
    breed: "Cavalier King Charles",
    kingdomSince: "February 2024",
    photoUrl:
      "https://images.unsplash.com/photo-1530281700549-e82e7eb16046?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Theodore carried dignity in a small frame. His registry record is kept with ceremonial care.",
  },
  {
    companionId: "PK-2021-AU-000031",
    name: "Iris",
    species: "Cat",
    breed: "Ragdoll",
    kingdomSince: "August 2021",
    photoUrl:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f5d?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Iris softened every boundary she crossed. Her archive preserves a life of unhurried tenderness.",
  },
  {
    companionId: "PK-2020-AU-000012",
    name: "Oliver",
    species: "Dog",
    breed: "Labrador Retriever",
    kingdomSince: "May 2020",
    photoUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc087?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Oliver was loyalty made visible. This public record shares only what his guardian wished to preserve.",
  },
  {
    companionId: "PK-2023-UK-000094",
    name: "Maple",
    species: "Cat",
    breed: "Maine Coon",
    kingdomSince: "October 2023",
    photoUrl:
      "https://images.unsplash.com/photo-1511048937911-53a944663e1e?w=800&h=1000&fit=crop&q=80",
    guardianNote:
      "Maple occupied space like a hearth — large, warm, and impossible to forget.",
  },
];

export function splitLibraryShelves(records: RegistryLibraryRecord[]) {
  const midpoint = Math.ceil(records.length / 2);
  return {
    upperShelf: records.slice(0, midpoint),
    lowerShelf: records.slice(midpoint),
  };
}
