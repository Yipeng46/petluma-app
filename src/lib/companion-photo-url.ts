export const REGISTRY_HALL_PLACEHOLDER_PHOTO =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=640&h=800&fit=crop&q=80";

export function buildCompanionPhotoApiUrl(companionId: string) {
  return `/api/companion-photo/${encodeURIComponent(companionId)}`;
}

function isRemotePhotoUrl(photoUrl: string) {
  return photoUrl.startsWith("http://") || photoUrl.startsWith("https://");
}

function isInlineDataPhotoUrl(photoUrl: string) {
  return photoUrl.startsWith("data:");
}

export function resolvePublicListPhotoUrl(
  companionId: string,
  photoUrl?: string | null,
): { photoUrl: string; hasPhoto: boolean } {
  const trimmed = photoUrl?.trim();

  if (!trimmed) {
    return {
      photoUrl: REGISTRY_HALL_PLACEHOLDER_PHOTO,
      hasPhoto: false,
    };
  }

  if (isRemotePhotoUrl(trimmed)) {
    return {
      photoUrl: trimmed,
      hasPhoto: true,
    };
  }

  if (isInlineDataPhotoUrl(trimmed)) {
    return {
      photoUrl: buildCompanionPhotoApiUrl(companionId),
      hasPhoto: true,
    };
  }

  return {
    photoUrl: REGISTRY_HALL_PLACEHOLDER_PHOTO,
    hasPhoto: false,
  };
}

export function parseInlinePhotoDataUrl(photoUrl: string) {
  const trimmed = photoUrl.trim();
  const match = trimmed.match(/^data:([^;]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}
