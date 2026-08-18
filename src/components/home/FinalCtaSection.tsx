import { PassportOfficeTrackedButton } from "./PassportOfficeTrackedButton";

export function FinalCtaSection() {
  return (
    <section className="home-section home-section--cta home-final-cta">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <h2 className="home-final-cta__title">
          Every companion deserves to be remembered.
        </h2>
        <div className="home-final-cta__action">
          <PassportOfficeTrackedButton>
            Create Your Companion&apos;s Identity
          </PassportOfficeTrackedButton>
        </div>
      </div>
    </section>
  );
}
