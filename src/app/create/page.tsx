import Link from "next/link";
import { CardGenerator } from "@/components/CardGenerator";
import { SiteHeader } from "@/components/SiteHeader";

export default function CreatePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-4 sm:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-[#6f5b4b] transition hover:text-[#2f2119]"
        >
          Back to home
        </Link>

        <CardGenerator />
      </section>
    </main>
  );
}
