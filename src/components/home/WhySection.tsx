import { SectionEyebrow, SectionTitle } from "./RegistryButton";

export function WhySection() {
  return (
    <section className="border-t border-kingdom-gold/10 bg-kingdom-parchment/50 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>Purpose</SectionEyebrow>
        <SectionTitle>Not just a pet. A companion.</SectionTitle>
        <p className="mt-8 font-sans text-base leading-relaxed text-kingdom-ink-muted md:text-lg">
          PetLuma is built for the companions who become part of our homes, routines, memories,
          and families.
        </p>
        <p className="mt-6 font-display text-xl leading-relaxed text-kingdom-ink md:text-2xl">
          They are not profiles to manage. They are presences worth recording — quietly,
          permanently, with dignity.
        </p>
      </div>
    </section>
  );
}
