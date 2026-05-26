import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy — PetLuma",
  description: "PetLuma privacy policy for companion identity and memorial services.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy">
      <p>
        Data you upload to PetLuma is used solely to generate your companion&apos;s identity
        record and passport preview.
      </p>
      <p>
        We do not publish or share your personal information or companion details without
        your consent.
      </p>
      <p>
        If you would like your data removed from the PetLuma registry, please contact us
        at{" "}
        <a
          href="mailto:hello@petluma.com"
          className="text-kingdom-ink underline decoration-kingdom-gold/40 underline-offset-2"
        >
          hello@petluma.com
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
