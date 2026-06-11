import { LegalPageShell } from "@/components/LegalPageShell";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Terms — PetLuma",
  description: "PetLuma terms of service for companion identity and memorial archives.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms">
      <p>
        PetLuma provides digital memorial and companion identity archive services — a
        creative registry for beloved companions.
      </p>
      <p>
        PetLuma passports and companion identity booklets are not government-issued
        documents.
      </p>
      <p>
        They are not intended for travel, legal identification, or official identity
        verification of any kind.
      </p>
    </LegalPageShell>
  );
}
