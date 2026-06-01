import { RegistryButton, SectionTitle } from "./ui";

export function FinalCtaSection() {
  return (
    <section className="home-section home-section--cta">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <SectionTitle as="h2">Join the PetLuma Kingdom.</SectionTitle>
        <div className="pl-stack-desc-button flex justify-center">
          <RegistryButton href="/passport">Register Companion</RegistryButton>
        </div>
      </div>
    </section>
  );
}
