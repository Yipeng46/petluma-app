import Link from "next/link";
import {
  HOME_PRODUCT_PASSPORT_IMAGE,
} from "@/lib/home-showcase-data";
import { HomeProductImage } from "./HomeProductImage";
import { SectionEyebrow } from "./RegistryButton";

export function HomePhysicalPassportSection() {
  return (
    <section
      id="passport-product"
      className="home-section home-showcase home-showcase--passport"
      aria-labelledby="home-passport-title"
    >
      <div className="home-showcase__inner mx-auto max-w-6xl px-6 md:px-10">
        <div className="home-showcase__grid home-showcase__grid--reverse">
          <div className="home-showcase__copy">
            <SectionEyebrow>A physical keepsake</SectionEyebrow>
            <h2 id="home-passport-title" className="pl-section-title home-showcase__title">
              A physical record made for one companion only.
            </h2>
            <p className="home-showcase__body pl-body">
              Crafted with care. Personalised with their identity. A lasting keepsake you
              can hold for years to come.
            </p>
            <Link
              href="#passport-product"
              className="registry-btn registry-btn--secondary pl-btn mt-8 inline-flex px-6 py-3"
            >
              Explore Passport
            </Link>
          </div>

          <HomeProductImage
            src={HOME_PRODUCT_PASSPORT_IMAGE}
            alt="PetLuma physical Companion Passport"
            variant="product"
          />
        </div>
      </div>
    </section>
  );
}
