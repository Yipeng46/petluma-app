import { RegistryButton, SectionTitle } from "./ui";

export function FinalCtaSection() {
  return (
    <section className="bg-kingdom-forest px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionTitle as="h2" className="text-kingdom-cream">
          Begin your companion&apos;s registration.
        </SectionTitle>
        <p className="mt-5 font-sans text-sm leading-relaxed text-kingdom-cream/75 md:text-base">
          Issue an official Companion ID. Secure a place in the Kingdom Archive.
        </p>
        <div className="mt-10">
          <RegistryButton
            href="/create"
            variant="secondary"
            className="border-kingdom-cream/30 bg-kingdom-cream text-kingdom-forest hover:border-kingdom-cream hover:bg-kingdom-parchment"
          >
            Register Your Companion
          </RegistryButton>
        </div>
      </div>
    </section>
  );
}
