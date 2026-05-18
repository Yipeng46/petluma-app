import Link from "next/link";
import { CardGenerator } from "@/components/CardGenerator";
import { SiteHeader } from "@/components/SiteHeader";

export default function CreatePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#fff8e8_0%,#f2e4c9_52%,#fffaf0_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(8,21,38,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.04)_1px,transparent_1px)] [background-size:30px_30px]" />
      <div className="pointer-events-none absolute -right-20 top-28 h-80 w-80 rounded-full border-[32px] border-[#b9914c]/10" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#081526]/5 blur-3xl" />
      <SiteHeader />

      <section className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-4 sm:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-semibold text-[#7d632e] transition hover:text-[#081526]"
        >
          Back to home
        </Link>

        <CardGenerator />
      </section>
    </main>
  );
}
