import Link from "next/link";
import { HeroPassportMockup } from "@/components/HeroPassportMockup";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#fff8e8_0%,#f2e4c9_52%,#fffaf0_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(90deg,rgba(8,21,38,0.055)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.04)_1px,transparent_1px)] [background-size:30px_30px]" />
      <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full border-[36px] border-[#b9914c]/10" />
      <div className="pointer-events-none absolute -left-20 bottom-8 h-72 w-72 rounded-full bg-[#081526]/5 blur-3xl" />
      <SiteHeader />

      <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#7d632e]">
            PetLuma Passport System
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.07em] text-[#081526] sm:text-7xl">
            Official passports for beloved companions.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#3d4858]/78 sm:text-lg">
            Submit your companion information for official PetLuma registration
            and generate a refined digital passport identity.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full border border-[#b8944d]/35 bg-[#081526] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#fff8eb] shadow-[0_18px_50px_rgba(8,21,38,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b1c32]"
            >
              Create Passport
            </Link>
            <span className="inline-flex items-center justify-center rounded-full border border-[#b8944d]/30 bg-[#fffaf0]/60 px-7 py-3.5 text-sm font-semibold text-[#7d632e] shadow-[0_12px_34px_rgba(8,21,38,0.06)]">
              Official identity preview
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <HeroPassportMockup />
        </div>
      </section>
    </main>
  );
}
