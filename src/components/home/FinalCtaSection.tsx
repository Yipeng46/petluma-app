import { HomepagePrimaryCta } from "./HomepagePrimaryCta";
import { SectionTitle } from "./RegistryButton";

export function FinalCtaSection() {
  return (
    <section className="home-section home-section--cta">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <SectionTitle as="h2">Join the PetLuma Kingdom.</SectionTitle>
        <div className="pl-stack-desc-button flex justify-center">
          <HomepagePrimaryCta />
        </div>
      </div>
    </section>
  );
}
