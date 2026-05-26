import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { VerifyExperience } from "@/components/VerifyExperience";

export const metadata: Metadata = {
  title: "PetLuma Passport Verification",
  description: "Verify a PetLuma Passport against the PetLuma Registry.",
};

export default function VerifyPage() {
  return (
    <>
      <VerifyExperience />
      <SiteFooter />
    </>
  );
}
