export {
  foundingCompanionToRegistryHallRecord as foundingCompanionToHallRecord,
  getFoundingCompanionById,
  getFoundingRegistryHallRecords as getFoundingHallRecords,
  isFoundingCompanionId,
} from "@/lib/registry-hall";

export { foundingCollection, type FoundingCompanion } from "@data/foundingCollection";

import { foundingCollection, type FoundingCompanion } from "@data/foundingCollection";

export function formatFoundingEraLabel(era?: FoundingCompanion["era"]) {
  switch (era) {
    case "founding":
      return "Founding Collection";
    case "royal":
      return "Royal Collection";
    case "community":
      return "Community Registry";
    default:
      return "Founding Collection";
  }
}

export function getFoundingCollectionIds(): Set<string> {
  return new Set(foundingCollection.map((record) => record.id.toUpperCase()));
}

export function getFoundingCollection() {
  return foundingCollection;
}
