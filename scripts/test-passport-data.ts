import {
  createInitialPassportData,
  type PassportData,
} from "../src/lib/passport-data";
import { PASSPORT_FIELD_LIMITS } from "../src/lib/passport-form";

/** 1×1 PNG for QA — no external assets required. */
export const QA_TEST_PHOTO =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export const QA_STORAGE_KEY = "petluma-companion-card";
export const QA_REGISTRY_KEY = "petluma_registry";

export const QA_SAMPLE_REGISTRY_RECORD = {
  passportNo: "PLM-2026-000021",
  companionId: "PK-2026-AU-000021",
  petName: "Luma",
  species: "Dog",
  breed: "Golden Retriever",
  gender: "Female",
  dateOfBirth: "2020-06-15",
  placeOfOrigin: "Pine Trail",
  ownerEmail: "qa@petluma.test",
  photoUrl: QA_TEST_PHOTO,
  createdAt: "2026-01-15T10:00:00.000Z",
  updatedAt: "2026-01-15T10:00:00.000Z",
  status: "active" as const,
};

export const QA_VALID_PASSPORT_NO = QA_SAMPLE_REGISTRY_RECORD.passportNo;
export const QA_INVALID_PASSPORT_NO = "PLM-2099-999999";

export function toCloudPassportRow(
  record: typeof QA_SAMPLE_REGISTRY_RECORD,
  id = "00000000-0000-0000-0000-000000000001",
) {
  return {
    id,
    passport_no: record.passportNo,
    companion_id: record.companionId,
    owner_email: record.ownerEmail,
    pet_name: record.petName,
    species: record.species,
    breed: record.breed,
    gender: record.gender,
    date_of_birth: record.dateOfBirth,
    place_of_origin: record.placeOfOrigin,
    photo_url: record.photoUrl ?? null,
    status: record.status,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
  };
}

export type QaViewportProfile = "desktop" | "tablet" | "mobile";

export type QaInjectionMethod = "form" | "storage";

export type QaTestCase = {
  id: string;
  label: string;
  screenshot: string;
  viewport: QaViewportProfile;
  width: number;
  height: number;
  route: "/create" | "/result";
  method: QaInjectionMethod;
  /** Raw JSON for storage injection (supports null / undefined). */
  payload: Record<string, unknown>;
  expectPhoto: boolean;
  testExport: boolean;
};

function basePassport(overrides: Partial<PassportData> = {}): PassportData {
  return {
    ...createInitialPassportData(),
    ownerEmail: "qa@petluma.test",
    photo: QA_TEST_PHOTO,
    name: "Luma",
    species: "Dog",
    breed: "Golden Retriever",
    gender: "Female",
    birthdate: "2020-06-15",
    placeOfOrigin: "Pine Trail",
    passportNo: "PLM-2026-000021",
    companionId: "PK-2026-AU-000021",
    ...overrides,
  };
}

export function createNormalData(): PassportData {
  return basePassport();
}

export function createLongTextData(): PassportData {
  return basePassport({
    name: "A".repeat(PASSPORT_FIELD_LIMITS.name),
    breed: "B".repeat(PASSPORT_FIELD_LIMITS.breed),
    placeOfOrigin: "P".repeat(PASSPORT_FIELD_LIMITS.placeOfOrigin),
  });
}

export function createEmptyFieldsData(): PassportData {
  return createInitialPassportData();
}

export function createEmojiData(): PassportData {
  return basePassport({
    name: "Luma 🐾✨",
    breed: "Golden 🦮 Retriever",
    placeOfOrigin: "Rainbow 🌈 Trail",
  });
}

export function createChineseData(): PassportData {
  return basePassport({
    name: "露露",
    breed: "中华田园犬",
    placeOfOrigin: "北京",
  });
}

export function createSpecialCharsData(): PassportData {
  return basePassport({
    name: "Lu'ma & Co.",
    breed: "Mix (50%/50%)",
    placeOfOrigin: "St. Mary's",
  });
}

export function createLongBreedData(): PassportData {
  return basePassport({
    breed: "X".repeat(PASSPORT_FIELD_LIMITS.breed),
  });
}

export function createLongNameData(): PassportData {
  return basePassport({
    name: "N".repeat(PASSPORT_FIELD_LIMITS.name),
  });
}

export function createXssData(): PassportData {
  return basePassport({
    name: "<script>alert('xss')</script>",
    breed: "<img onerror=alert(1) src=x>",
    placeOfOrigin: '"><svg/onload=alert(1)>',
  });
}

export function createNullFieldsPayload(): Record<string, unknown> {
  const data = basePassport();
  return {
    ...data,
    name: null,
    breed: null,
    gender: null,
    species: null,
    photo: null,
    placeOfOrigin: null,
    birthdate: null,
    passportNo: null,
    companionId: null,
  };
}

export function createUndefinedFieldsPayload(): Record<string, unknown> {
  const data = basePassport();
  return {
    ownerEmail: data.ownerEmail,
    name: undefined,
    breed: undefined,
    gender: undefined,
    species: undefined,
    photo: undefined,
    placeOfOrigin: undefined,
    birthdate: undefined,
    passportNo: undefined,
    companionId: undefined,
  };
}

export function createMissingImageData(): PassportData {
  return basePassport({ photo: null });
}

export function createInvalidPhotoData(): PassportData {
  return basePassport({ photo: "https://invalid.petluma.test/missing.png" });
}

function toPayload(data: PassportData): Record<string, unknown> {
  return { ...data };
}

export const QA_VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 1440, height: 900 },
  mobile390: { width: 390, height: 844 },
  mobile360: { width: 360, height: 800 },
} as const;

/** All automated QA scenarios — no manual input required. */
export function generateAllTestCases(): QaTestCase[] {
  return [
    {
      id: "normal",
      label: "Normal passport data",
      screenshot: "desktop-normal.png",
      viewport: "desktop",
      ...QA_VIEWPORTS.desktop,
      route: "/result",
      method: "storage",
      payload: toPayload(createNormalData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "long-text",
      label: "Max-length text fields",
      screenshot: "mobile-long-text.png",
      viewport: "mobile",
      ...QA_VIEWPORTS.mobile390,
      route: "/result",
      method: "storage",
      payload: toPayload(createLongTextData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "empty-fields",
      label: "Empty fields",
      screenshot: "tablet-empty-fields.png",
      viewport: "tablet",
      ...QA_VIEWPORTS.tablet,
      route: "/result",
      method: "storage",
      payload: toPayload(createEmptyFieldsData()),
      expectPhoto: false,
      testExport: true,
    },
    {
      id: "emoji",
      label: "Emoji in text fields",
      screenshot: "mobile-emoji.png",
      viewport: "mobile",
      ...QA_VIEWPORTS.mobile360,
      route: "/result",
      method: "storage",
      payload: toPayload(createEmojiData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "chinese",
      label: "Chinese characters",
      screenshot: "desktop-chinese.png",
      viewport: "desktop",
      ...QA_VIEWPORTS.desktop,
      route: "/result",
      method: "storage",
      payload: toPayload(createChineseData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "special-chars",
      label: "Special characters",
      screenshot: "tablet-special-chars.png",
      viewport: "tablet",
      ...QA_VIEWPORTS.tablet,
      route: "/result",
      method: "storage",
      payload: toPayload(createSpecialCharsData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "long-breed",
      label: "Max-length breed",
      screenshot: "desktop-long-breed.png",
      viewport: "desktop",
      ...QA_VIEWPORTS.desktop,
      route: "/result",
      method: "storage",
      payload: toPayload(createLongBreedData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "long-name",
      label: "Max-length pet name",
      screenshot: "mobile-long-name.png",
      viewport: "mobile",
      ...QA_VIEWPORTS.mobile390,
      route: "/result",
      method: "storage",
      payload: toPayload(createLongNameData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "xss",
      label: "XSS character injection",
      screenshot: "xss-test.png",
      viewport: "desktop",
      ...QA_VIEWPORTS.desktop,
      route: "/result",
      method: "storage",
      payload: toPayload(createXssData()),
      expectPhoto: true,
      testExport: true,
    },
    {
      id: "null-values",
      label: "Null field values",
      screenshot: "tablet-null-values.png",
      viewport: "tablet",
      ...QA_VIEWPORTS.tablet,
      route: "/result",
      method: "storage",
      payload: createNullFieldsPayload(),
      expectPhoto: false,
      testExport: true,
    },
    {
      id: "undefined-values",
      label: "Undefined field values",
      screenshot: "mobile-undefined.png",
      viewport: "mobile",
      ...QA_VIEWPORTS.mobile360,
      route: "/result",
      method: "storage",
      payload: createUndefinedFieldsPayload(),
      expectPhoto: false,
      testExport: true,
    },
    {
      id: "missing-image",
      label: "Missing pet photo",
      screenshot: "mobile-missing-image.png",
      viewport: "mobile",
      ...QA_VIEWPORTS.mobile390,
      route: "/result",
      method: "storage",
      payload: toPayload(createMissingImageData()),
      expectPhoto: false,
      testExport: true,
    },
    {
      id: "form-normal",
      label: "Form injection — normal data",
      screenshot: "desktop-form-normal.png",
      viewport: "desktop",
      ...QA_VIEWPORTS.desktop,
      route: "/create",
      method: "form",
      payload: toPayload(createNormalData()),
      expectPhoto: false,
      testExport: false,
    },
    {
      id: "form-long-text",
      label: "Form injection — max-length fields",
      screenshot: "tablet-form-long-text.png",
      viewport: "tablet",
      ...QA_VIEWPORTS.tablet,
      route: "/create",
      method: "form",
      payload: toPayload(createLongTextData()),
      expectPhoto: false,
      testExport: false,
    },
  ];
}

export const QA_TEST_CASES = generateAllTestCases();
