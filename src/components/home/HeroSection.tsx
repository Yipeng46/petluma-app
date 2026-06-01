import Image from "next/image";
import { RegistryButton } from "./ui";

const HERO_PRODUCT_WIDTH = 420;
const HERO_PRODUCT_HEIGHT = 520;

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-section__backdrop" aria-hidden="true" />

      <div className="hero-section__inner">
        <div id="passport" className="hero-section__content text-left">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[2.65rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#2e2820] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.25rem]">
            Every companion
            <span className="block">deserves to be</span>
            <span className="block">remembered.</span>
          </h1>
          <p className="mt-8 font-sans text-[14px] leading-[1.85] text-[#6b6358] md:mt-10 md:text-[15px] md:leading-8">
            PetLuma Kingdom Registry preserves companion identities, memories, and stories
            for generations to come.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start md:mt-12">
            <RegistryButton href="/create">Register Companion</RegistryButton>
            <RegistryButton href="#registry" variant="secondary">
              Explore the Kingdom
            </RegistryButton>
          </div>
        </div>

        <div className="hero-section__scene">
          <Image
            src="/hero-passport-product.png"
            alt="PetLuma Passport with gold-foil Kingdom emblem"
            width={HERO_PRODUCT_WIDTH}
            height={HERO_PRODUCT_HEIGHT}
            priority
            sizes="(max-width: 1023px) 88vw, 38vw"
            className="hero-section__passport"
          />
        </div>
      </div>
    </section>
  );
}
