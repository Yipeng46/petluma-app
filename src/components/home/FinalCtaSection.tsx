import { RegistryButton, SectionTitle } from "./ui";

export function FinalCtaSection() {
  return (
    <section className="border-t border-kingdom-gold/10 px-6 py-24 md:px-10 md:py-32 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle as="h2" className="text-4xl md:text-5xl lg:text-[3rem]">
          Join the PetLuma Kingdom.
        </SectionTitle>
        <p className="mx-auto mt-7 max-w-xl font-sans text-[15px] leading-[1.8] text-kingdom-ink-muted md:text-base">
          Create your companion&apos;s passport and become part of a global family that
          celebrates love, memory, and belonging.
        </p>
        <div className="mt-10 flex justify-center">
          <RegistryButton href="/create">Create Passport</RegistryButton>
        </div>
      </div>
    </section>
  );
}
