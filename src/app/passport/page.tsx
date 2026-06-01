import Link from "next/link";
import { CardGenerator } from "@/components/CardGenerator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function PassportOfficePage() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#F7F4EE]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(8,21,38,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.04)_1px,transparent_1px)] [background-size:30px_30px]" />
        <SiteHeader />

        <section className="relative mx-auto w-full max-w-6xl min-w-0 overflow-x-hidden px-5 pb-16 pt-4 sm:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex text-sm font-medium text-[#6E6A64] transition hover:text-[#111827]"
          >
            Back to home
          </Link>

          <CardGenerator />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
