import Link from "next/link";
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

        <div className="relative">
          <div className="absolute -left-8 top-10 h-48 w-48 rounded-full bg-[#b9914c]/18 blur-3xl" />
          <div className="relative rounded-[1.6rem] border border-[#b8944d]/26 bg-[#fff8e8]/62 p-3 shadow-[0_30px_90px_rgba(8,21,38,0.13)] backdrop-blur sm:p-4">
            <div className="grid min-h-[520px] overflow-hidden rounded-[1.25rem] border border-[#b8944d]/35 bg-[#081526] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] md:grid-cols-[0.68fr_1.32fr]">
              <div className="relative overflow-hidden rounded-[1rem] border border-[#d9b36c]/26 bg-[linear-gradient(145deg,#04101f_0%,#0a1a31_48%,#06111f_100%)] p-6 text-center text-[#f6ecd8]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.42)_1px,transparent_0),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.18)_44%,transparent_45%)] [background-size:5px_5px,180px_180px]" />
                <div className="relative flex h-full min-h-[460px] flex-col items-center justify-between">
                  <div>
                    <p className="text-[0.5rem] font-semibold uppercase tracking-[0.36em] text-[#d9b36c]/80">
                      Official Companion Document
                    </p>
                    <p className="mt-7 text-3xl font-semibold uppercase leading-tight tracking-[0.12em] text-[#f1c873]">
                      PetLuma
                      <span className="mt-2 block text-xl tracking-[0.18em]">
                        Passport
                      </span>
                    </p>
                  </div>
                  <div className="relative flex h-28 w-24 items-center justify-center rounded-b-[2rem] rounded-t-xl border border-[#d9b36c]/60 bg-[#d9b36c]/8">
                    <span className="pet-serif text-4xl text-[#d9b36c]">PL</span>
                  </div>
                  <p className="border-t border-[#d9b36c]/24 pt-5 text-[0.5rem] uppercase leading-4 tracking-[0.28em] text-[#f6ecd8]/55">
                    PetLuma Kingdom
                  </p>
                </div>
              </div>

              <div className="relative mt-3 overflow-hidden rounded-[1rem] border border-[#d9b36c]/32 bg-[linear-gradient(135deg,#fff8e8_0%,#f3e6ca_52%,#fffaf0_100%)] p-6 text-[#081526] md:ml-3 md:mt-0">
                <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(8,21,38,0.15)_53%,transparent_54%),linear-gradient(90deg,rgba(8,21,38,0.06)_1px,transparent_1px)] [background-size:88px_40px,28px_28px]" />
                <div className="pointer-events-none absolute right-5 top-20 text-7xl font-semibold leading-none tracking-[-0.08em] text-[#081526]/[0.035]">
                  PL
                </div>
                <div className="relative flex h-full min-h-[460px] flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 border-b border-[#9f7835]/28 pb-5">
                      <div>
                        <p className="text-[0.52rem] font-semibold uppercase tracking-[0.34em] text-[#7d632e]">
                          PETLUMA PASSPORT
                        </p>
                        <p className="mt-2 text-2xl font-semibold uppercase tracking-[0.14em]">
                          Identity Page
                        </p>
                      </div>
                      <p className="border border-[#9f7835]/35 px-3 py-1.5 text-[0.48rem] uppercase tracking-[0.18em] text-[#7d632e]">
                        Official
                      </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-[0.72fr_1.28fr]">
                      <div>
                        <div className="flex aspect-[35/45] items-center justify-center rounded-md border border-[#9f7835]/40 bg-[#fdf4df] p-2">
                          <div className="flex h-full w-full items-center justify-center bg-[#081526]/10 text-[0.5rem] uppercase tracking-[0.22em] text-[#081526]/42">
                            Official Portrait
                          </div>
                        </div>
                        <p className="mt-3 border border-[#9f7835]/28 bg-white/20 p-2 text-center font-mono text-[0.56rem] uppercase tracking-[0.14em]">
                          COMPANION ID
                          <span className="mt-1 block">PLK-AU-8K3QX</span>
                        </p>
                      </div>

                      <div className="space-y-4">
                        <PreviewLine label="Pet Name" value="Luma" large />
                        <PreviewLine label="Breed" value="Golden Retriever" />
                        <PreviewLine label="Gender" value="COMPANION" />
                        <PreviewLine
                          label="Place of Origin"
                          value="PetLuma Kingdom"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#9f7835]/30 pt-4 font-mono text-[0.58rem] uppercase leading-5 tracking-[0.22em] text-[#081526]/70">
                    <p>P&lt;PLM&lt;&lt;LUMA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                    <p>PLM20260001PETLUMA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PreviewLine({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="border-b border-[#9f7835]/24 pb-2">
      <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#7d632e]">
        {label}
      </p>
      <p
        className={
          large
            ? "pet-serif mt-1 break-words text-3xl leading-none tracking-[-0.045em] text-[#081526]"
            : "mt-1 break-words text-xs font-semibold uppercase tracking-[0.1em] text-[#081526]"
        }
      >
        {value}
      </p>
    </div>
  );
}
