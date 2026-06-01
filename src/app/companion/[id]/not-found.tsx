import Link from "next/link";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "@/styles/companion-archive.css";

export default function CompanionArchiveNotFound() {
  return (
    <div className="companion-archive min-h-screen font-sans antialiased">
      <div className="companion-archive__texture" aria-hidden="true" />
      <SiteHeader />

      <main className="companion-archive__main companion-archive-not-found">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="companion-archive__eyebrow">PetLuma Kingdom</p>
          <h1 className="companion-archive-not-found__title">Archive Not Found</h1>
          <div className="companion-archive__actions mt-10">
            <Link href="/hall" className="companion-archive__back">
              Return To Registry Hall
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
