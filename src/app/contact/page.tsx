import { LegalPageShell } from "@/components/LegalPageShell";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Contact — PetLuma",
  description: "Contact the PetLuma Kingdom Registry for archive corrections, removal requests, or general inquiries.",
  path: "/contact",
});

const contactEmail = "registry@petluma.co";

const contactLinkClass =
  "text-kingdom-ink underline decoration-kingdom-gold/40 underline-offset-2";

export default function ContactPage() {
  return (
    <LegalPageShell title="Contact">
      <p>
        For archive corrections, archive removal requests, or general inquiries:
      </p>
      <p>
        <a href={`mailto:${contactEmail}`} className={contactLinkClass}>
          {contactEmail}
        </a>
      </p>
      <p>PetLuma Kingdom Registry</p>
      <p className="text-kingdom-ink/80">Every companion deserves to be remembered.</p>
    </LegalPageShell>
  );
}
