export type PassportData = {
  ownerEmail: string;
  photo: string | null;
  name: string;
  breed: string;
  gender: string;
  birthdate: string;
  species: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
};

export const PENDING_COMPANION_ID = "Assigned on registration";
export const PENDING_PASSPORT_NO = "Assigned on registration";

export function createInitialPassportData(): PassportData {
  return {
    ownerEmail: "",
    photo: null,
    name: "",
    breed: "",
    gender: "",
    birthdate: "",
    species: "Companion",
    placeOfOrigin: "",
    passportNo: "",
    companionId: "",
  };
}

export function updatePassportField<K extends keyof PassportData>(
  current: PassportData,
  field: K,
  value: PassportData[K],
): PassportData {
  return {
    ...current,
    [field]: value,
  };
}

export function normalizePassportData(raw: unknown): PassportData {
  const initial = createInitialPassportData();

  if (!raw || typeof raw !== "object") {
    return initial;
  }

  const record = raw as Record<string, unknown>;

  return {
    ownerEmail: readString(record.ownerEmail ?? record.owner_email),
    photo:
      typeof record.photo === "string"
        ? record.photo
        : typeof record.photoUrl === "string"
          ? record.photoUrl
          : null,
    name: readString(record.name),
    breed: readString(record.breed),
    gender: readString(record.gender),
    birthdate: readString(record.birthdate ?? record.birthday),
    species: readString(record.species) || "Companion",
    placeOfOrigin: readString(record.placeOfOrigin ?? record.favoritePlace),
    passportNo: readString(record.passportNo) || initial.passportNo,
    companionId:
      readString(record.companionId ?? record.kingdomId) || initial.companionId,
  };
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}
