import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { VerifyExperience } from "@/components/VerifyExperience";
import { buildVerifyUrl } from "@/lib/site-url";

type VerifyPageProps = {
  params: Promise<{ passportNo: string }>;
};

export async function generateMetadata({
  params,
}: VerifyPageProps): Promise<Metadata> {
  const { passportNo } = await params;
  const title = "PetLuma Passport Verification";
  const description = "Verify a PetLuma Passport against the PetLuma Registry.";
  const url = buildVerifyUrl(passportNo);

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

export default function VerifyPage() {
  return (
    <>
      <VerifyExperience />
      <SiteFooter />
    </>
  );
}
