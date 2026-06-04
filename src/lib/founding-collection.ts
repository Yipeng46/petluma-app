export {
  foundingCompanionToRegistryHallRecord as foundingCompanionToHallRecord,
  getFoundingCompanionById,
  getFoundingRegistryHallRecords as getFoundingHallRecords,
  isFoundingCompanionId,
} from "@/lib/registry-hall";

export { foundingCollection, type FoundingCompanion } from "@data/foundingCollection";

import { foundingCollection } from "@data/foundingCollection";

export function getFoundingCollectionIds(): Set<string> {
  return new Set(foundingCollection.map((record) => record.id.toUpperCase()));
}

export function getFoundingCollection() {
  return foundingCollection;
}
