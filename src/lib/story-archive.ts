export function normalizeStoryField(value: string | undefined) {
  return value?.trim() ?? "";
}

export function parseFavoriteThings(value: string | null | undefined): string[] {
  const trimmed = value?.trim();

  if (!trimmed) {
    return [];
  }

  return trimmed
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function serializeFavoriteThings(value: string) {
  return normalizeStoryField(value);
}
