import Link from "next/link";
import { HOME_HERO_PASSPORT_IMAGE } from "@/lib/home-showcase-data";
import { HomeProductImage } from "./HomeProductImage";
import { PassportOfficeTrackedButton } from "./PassportOfficeTrackedButton";

export function HeroSection() {
  return (
    <section id="home" className="hero-section hero-section--split">
      <div className="hero-section__backdrop" aria-hidden="true" />

      <div className="hero-section__inner hero-section__inner--split">
        <div className="hero-section__content">
          <h1 className="pl-hero-title">
            Every companion deserves an identity.
          </h1>
          <p className="hero-section__lead pl-body">
            Create a permanent Companion Identity, receive their unique ID, and preserve
            the story you share.
          </p>
          <div className="hero-section__cta">
            <div className="hero-section__cta-row">
              <PassportOfficeTrackedButton>Create an Identity</PassportOfficeTrackedButton>
              <Link
                href="#passport-product"
                className="registry-btn registry-btn--secondary pl-btn inline-flex px-6 py-3"
              >
                Explore the Passport
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-section__visual hero-product">
          <HomeProductImage
            src={HOME_HERO_PASSPORT_IMAGE}
            alt="PetLuma Companion Passport"
            priority
            variant="hero"
          />
        </div>
      </div>
    </section>
  );
}
