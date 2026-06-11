const DEFAULT_SITE_URL = "https://petluma.co";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return DEFAULT_SITE_URL;
}

export function buildSiteUrl(path = "/") {
  if (!path || path === "/") {
    return getSiteUrl();
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildCompanionUrl(companionId: string) {
  return buildSiteUrl(`/companion/${encodeURIComponent(companionId)}`);
}

export function buildRecoverUrl() {
  return buildSiteUrl("/recover");
}

export function buildVerifyUrl(passportNo: string) {
  return buildSiteUrl(`/verify/${encodeURIComponent(passportNo)}`);
}
