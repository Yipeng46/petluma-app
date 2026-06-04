export type FoundingCompanion = {
  id: string;
  archiveNo: string;
  name: string;
  species: string;
  breed?: string;
  country: string;
  status: string;
  registryDate: string;
  era?: "founding" | "royal" | "community";
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
    species: "Dog",
    breed: "Chinese Rural Dog × Border Collie Mix",
    country: "China",
    status: "Preserved in the Kingdom",
    registryDate: "June 2026",
    era: "founding",
    imageUrl: "",
    guardianNote: `Lao Er was found at a night market.

Among all her brothers and sisters, she was the one who immediately stood out — lively, curious, and impossible to ignore. From the first moment, she felt chosen.

She was believed to be a mix of Chinese Rural Dog and Border Collie, and she carried the intelligence and spirit of both. She was bright, responsive, and full of life. One of her favorite things was turning over and offering her belly, waiting to be gently rubbed.

There was a night when she became seriously ill with parvovirus. I thought I might lose her. I stayed by her side through the night, watching and hoping. Somehow, she survived. It felt like a small miracle.

But later, at around two years old, Lao Er passed away from meningitis.

Her life was not long, but it was real. She was loved, remembered, and remains part of the beginning of this Kingdom.`,
    favoriteThings: [
      "Belly rubs",
      "Being close to family",
      "Running around with curiosity",
      "Ordinary days at home",
    ],
    specialMemory:
      "One night, Lao Er became seriously ill with parvovirus. I stayed beside her, thinking I might lose her. Somehow, she survived the night. That moment became one of the first memories behind this archive — a reminder that companionship is measured not by time, but by love.",
  },
];
