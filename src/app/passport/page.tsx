import Link from "next/link";
import { redirect } from "next/navigation";
import { PassportCardGenerator } from "@/components/PassportCardGenerator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { PASSPORT_ACCESS_PATH } from "@/lib/passport-routes";
import { createSiteMetadata } from "@/lib/site-metadata";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import "@/styles/passport-office.css";

export const metadata = createSiteMetadata({
  title: "Kingdom Passport Office — PetLuma",
  description:
    "Issue an official Companion Passport within the PetLuma Kingdom Registry.",
  path: "/passport",
});

export default async function PassportOfficePage() {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    redirect(PASSPORT_ACCESS_PATH);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect(PASSPORT_ACCESS_PATH);
  }

  return (
    <>
      <main className="passport-office relative min-h-screen overflow-hidden bg-[#F7F4EE]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(8,21,38,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(8,21,38,0.04)_1px,transparent_1px)] [background-size:30px_30px]" />
        <SiteHeader />

        <section className="relative mx-auto w-full max-w-6xl min-w-0 overflow-x-hidden px-5 pb-16 pt-4 sm:px-8">
          <Link
            href="/my-kingdom"
            className="passport-office__back mb-6 inline-flex font-medium text-[#6E6A64] transition hover:text-[#111827]"
          >
            ← My Kingdom
          </Link>

          <PassportCardGenerator />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
