export const REGISTRY_STORAGE_KEY = "petluma_registry";

export type RegistryRecordStatus = "active";

export type RegistryRecord = {
  passportNo: string;
  companionId: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeOfOrigin: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
  status: RegistryRecordStatus;
};

export type RegistryState = {
  records: RegistryRecord[];
};

export type PassportLookupInput = {
  ownerEmail: string;
  petName: string;
  dateOfBirth: string;
};

export type CreateRegistryInput = {
  ownerEmail: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeOfOrigin: string;
};

export type CreateRegistryResult = {
  record: RegistryRecord;
  isDuplicate: boolean;
  message?: string;
};

function emptyRegistry(): RegistryState {
  return { records: [] };
}

function currentYear() {
  return new Date().getFullYear();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePetName(name: string) {
  return name.trim().toLowerCase();
}

function normalizeDate(date: string) {
  return date.trim();
}

function parsePassportSequence(passportNo: string, year: number) {
  const match = passportNo.match(new RegExp(`^PLM-${year}-(\\d{6})$`));

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function parseCompanionSequence(companionId: string, year: number) {
  const match = companionId.match(new RegExp(`^PK-${year}-AU-(\\d{6})$`));

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

export function getRegistry(): RegistryState {
  if (typeof window === "undefined") {
    return emptyRegistry();
  }

  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);

    if (!raw) {
      return emptyRegistry();
    }

    const parsed = JSON.parse(raw) as Partial<RegistryState>;

    if (!parsed || !Array.isArray(parsed.records)) {
      return emptyRegistry();
    }

    return { records: parsed.records };
  } catch {
    return emptyRegistry();
  }
}

export function saveRegistry(state: RegistryState) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(state));
}

function normalizePassportNo(passportNo: string) {
  return passportNo.trim().toUpperCase();
}

export function findPassportByNumber(
  passportNo: string,
  registry: RegistryState = getRegistry(),
): RegistryRecord | null {
  const normalized = normalizePassportNo(passportNo);

  if (!normalized) {
    return null;
  }

  return (
    registry.records.find(
      (record) => normalizePassportNo(record.passportNo) === normalized,
    ) ?? null
  );
}

export function findExistingPassport(
  registry: RegistryState,
  input: PassportLookupInput,
): RegistryRecord | null {
  const email = normalizeEmail(input.ownerEmail);
  const name = normalizePetName(input.petName);
  const dateOfBirth = normalizeDate(input.dateOfBirth);

  return (
    registry.records.find(
      (record) =>
        normalizeEmail(record.ownerEmail) === email &&
        normalizePetName(record.petName) === name &&
        normalizeDate(record.dateOfBirth) === dateOfBirth,
    ) ?? null
  );
}

export function generateNextPassportNumber(
  registry: RegistryState,
  year = currentYear(),
) {
  const sequences = registry.records
    .map((record) => parsePassportSequence(record.passportNo, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PLM-${year}-${String(next).padStart(6, "0")}`;
}

function generateNextCompanionId(registry: RegistryState, year = currentYear()) {
  const sequences = registry.records
    .map((record) => parseCompanionSequence(record.companionId, year))
    .filter((value): value is number => value !== null);

  const next = (sequences.length ? Math.max(...sequences) : 0) + 1;

  return `PK-${year}-AU-${String(next).padStart(6, "0")}`;
}

export function createRegistryRecord(
  input: CreateRegistryInput,
): CreateRegistryResult {
  const registry = getRegistry();
  const existing = findExistingPassport(registry, {
    ownerEmail: input.ownerEmail,
    petName: input.petName,
    dateOfBirth: input.dateOfBirth,
  });

  const now = new Date().toISOString();

  if (existing) {
    existing.updatedAt = now;
    saveRegistry(registry);

    return {
      record: existing,
      isDuplicate: true,
      message: "This companion already has a PetLuma Passport.",
    };
  }

  const record: RegistryRecord = {
    passportNo: generateNextPassportNumber(registry),
    companionId: generateNextCompanionId(registry),
    petName: input.petName.trim(),
    species: input.species.trim(),
    breed: input.breed.trim(),
    gender: input.gender.trim(),
    dateOfBirth: input.dateOfBirth.trim(),
    placeOfOrigin: input.placeOfOrigin.trim(),
    ownerEmail: input.ownerEmail.trim(),
    createdAt: now,
    updatedAt: now,
    status: "active",
  };

  registry.records.push(record);
  saveRegistry(registry);

  return {
    record,
    isDuplicate: false,
  };
}
