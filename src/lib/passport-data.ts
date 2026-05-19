export type PassportData = {
  photo: string | null;
  name: string;
  breed: string;
  gender: string;
  birthdate: string;
  species: string;
  personality: string;
  placeOfOrigin: string;
  passportNo: string;
  companionId: string;
};

const companionAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCompanionId() {
  const suffix = Array.from({ length: 5 }, () => {
    const index = Math.floor(Math.random() * companionAlphabet.length);
    return companionAlphabet[index];
  }).join("");

  return `PLK-AU-${suffix}`;
}

export function generatePassportNo() {
  const year = new Date().getFullYear();
  const number = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
  return `PLM-${year}-${number}`;
}

export function createInitialPassportData(): PassportData {
  return {
    photo: null,
    name: "",
    breed: "",
    gender: "",
    birthdate: "",
    species: "Companion",
    personality: "",
    placeOfOrigin: "",
    passportNo: generatePassportNo(),
    companionId: generateCompanionId(),
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
    personality: readString(record.personality),
    placeOfOrigin: readString(record.placeOfOrigin ?? record.favoritePlace),
    passportNo: readString(record.passportNo) || initial.passportNo,
    companionId: readString(record.companionId) || initial.companionId,
  };
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}
