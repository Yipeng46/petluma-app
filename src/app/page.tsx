import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#9b7b45]">
            PetLuma Companion Card Generator
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-[#2f2119] sm:text-7xl">
            Refined cards for pets with a life outdoors.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#6f5b4b] sm:text-lg">
            Create a warm, editorial companion card with your pet&apos;s name,
            breed, and portrait. No account, no checkout, no QR. Just the first
            stable step for PetLuma.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full bg-[#2f2119] px-7 py-3.5 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f]"
            >
              Create your card
            </Link>
            <span className="inline-flex items-center justify-center rounded-full border border-[#c7a15f]/35 bg-[#fffaf1]/55 px-7 py-3.5 text-sm font-medium text-[#6f5b4b]">
              Phase 1 preview only
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-48 w-48 rounded-full bg-[#c7a15f]/20 blur-3xl" />
          <div className="relative rounded-[2.4rem] border border-[#c7a15f]/25 bg-[#fffaf1]/55 p-4 shadow-[0_30px_90px_rgba(71,49,33,0.14)] backdrop-blur">
            <div className="aspect-[0.86/1] overflow-hidden rounded-[1.8rem] bg-[#2f2119] p-5 text-[#fff8eb]">
              <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-[#e5c789]/30 bg-[linear-gradient(145deg,rgba(255,248,235,0.1),transparent_55%)] p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d9bd82]">
                    Outdoor Luxury
                  </p>
                  <h2 className="mt-5 text-5xl font-semibold tracking-[-0.07em]">
                    Luma
                  </h2>
                  <p className="mt-2 text-[#f1dfc4]/75">Golden Retriever</p>
                </div>
                <div className="rounded-[1.2rem] bg-[#f6efe3] p-4 text-[#2f2119]">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9b7b45]">
                    Companion profile
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6f5b4b]">
                    Warm cream, espresso details, and soft gold accents for a
                    quieter pet lifestyle brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
