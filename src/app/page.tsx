import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const FEATURES = [
  {
    title: "Unique Companion ID",
    description: "A personal identity number for every companion.",
  },
  {
    title: "Memory Archive",
    description: "Preserve moments, notes, and milestones.",
  },
  {
    title: "Kingdom Membership",
    description: "Join a world built for beloved pets.",
  },
] as const;

export default function Home() {
  return (
    <main className="landing-page relative min-h-screen overflow-x-clip">
      <div className="landing-page__texture pointer-events-none absolute inset-0" />
      <div className="landing-page__grain pointer-events-none absolute inset-0" />
      <SiteHeader />

      <section className="landing-hero relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-10 text-center sm:px-8 sm:pt-14 lg:max-w-6xl lg:pb-24 lg:pt-20">
        <div className="landing-hero__copy w-full max-w-3xl">
          <p className="landing-hero__eyebrow font-[family-name:var(--font-body)] text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#7d632e] sm:text-xs">
            PETLUMA KINGDOM PASSPORT
          </p>
          <h1 className="landing-hero__title mt-7 font-[family-name:var(--font-display)] text-[2.65rem] font-medium leading-[0.94] tracking-[-0.03em] text-[#081526] sm:text-6xl lg:text-[4.35rem]">
            Identity books for beloved companions.
          </h1>
          <p className="landing-hero__subtitle mx-auto mt-8 max-w-2xl font-[family-name:var(--font-body)] text-base leading-8 text-[#3d4858]/76 sm:text-[1.05rem] sm:leading-8">
            Create a refined companion identity, preserve their memories, and
            welcome them into the PetLuma Kingdom.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full border border-[#b8944d]/35 bg-[#081526] px-7 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.12em] text-[#fff8eb] shadow-[0_18px_50px_rgba(8,21,38,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b1c32]"
            >
              Create Companion Identity
            </Link>
            <Link
              href="#kingdom"
              className="inline-flex items-center justify-center rounded-full border border-[#b8944d]/28 bg-[#fffaf0]/55 px-7 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-[#7d632e] shadow-[0_12px_34px_rgba(8,21,38,0.05)] transition hover:-translate-y-0.5 hover:border-[#b8944d]/40"
            >
              Explore Kingdom
            </Link>
            <Link
              href="/recover"
              className="inline-flex items-center justify-center rounded-full border border-[#081526]/10 bg-[#fffaf0]/45 px-7 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-[#3d4858] shadow-[0_12px_34px_rgba(8,21,38,0.05)] transition hover:-translate-y-0.5 hover:border-[#b8944d]/35 hover:text-[#081526]"
            >
              Recover Passport
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-features relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="landing-features__item rounded-[1.15rem] border border-[#081526]/6 bg-[#fffaf0]/45 px-6 py-7 shadow-[0_18px_48px_rgba(8,21,38,0.04)] backdrop-blur-[2px]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-[#081526]">
                {feature.title}
              </h2>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-7 text-[#3d4858]/72">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="kingdom"
        className="landing-kingdom relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="landing-kingdom__texture pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-body)] text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#c9a45c]/78">
              PetLuma Kingdom
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[0.96] tracking-[-0.03em] text-[#fff8eb] sm:text-5xl">
              A home for companion stories.
            </h2>
            <p className="mt-5 max-w-xl font-[family-name:var(--font-body)] text-base leading-8 text-[#d8deea]/72">
              Every identity book opens a place in the Kingdom — a quiet archive
              of love, memory, and belonging.
            </p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#c9a45c]/12 px-6 py-3 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.12em] text-[#fff8eb] transition hover:-translate-y-0.5 hover:bg-[#c9a45c]/18"
          >
            Begin Your Book
          </Link>
        </div>
      </section>
    </main>
  );
}
