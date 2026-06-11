import type { Metadata } from "next";
import { buildSiteUrl } from "@/lib/site-url";

type CreateSiteMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createSiteMetadata({
  title,
  description,
  path = "/",
}: CreateSiteMetadataInput): Metadata {
  const url = buildSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "PetLuma Kingdom Registry",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
