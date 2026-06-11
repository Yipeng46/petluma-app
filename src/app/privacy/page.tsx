import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Privacy — PetLuma",
  description: "PetLuma privacy policy for companion identity and memorial services.",
  path: "/privacy",
});

const contactLinkClass =
  "text-kingdom-ink underline decoration-kingdom-gold/40 underline-offset-2";

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy">
      <p>
        Data you upload to PetLuma is used solely to generate your companion&apos;s identity
        record and passport preview.
      </p>
      <p>
        Guardians remain the owners of any photographs, stories, memories, and content they
        submit. PetLuma does not claim ownership of user-submitted content.
      </p>
      <p>
        Companion archives will only be publicly displayed when the guardian chooses to make
        them visible.
      </p>
      <p>
        We do not publish or share your personal information or companion details without
        your consent.
      </p>
      <p>
        If you would like your data removed from the PetLuma registry, please{" "}
        <Link href="/contact" className={contactLinkClass}>
          contact us
        </Link>
        .
      </p>
    </LegalPageShell>
  );
}
