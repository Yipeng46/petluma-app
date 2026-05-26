import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms — PetLuma",
  description: "PetLuma terms of service for companion identity and memorial archives.",
};

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
