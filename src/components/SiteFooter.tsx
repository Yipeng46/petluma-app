import Link from "next/link";

const footerLinkClass =
  "font-sans text-[10px] tracking-wide text-[#6E6A64]/90 transition-colors hover:text-[#3a3228]";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E6DED2]/60 bg-[#FAF6F0]/90 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[11px] leading-relaxed text-[#6E6A64]">
          © 2026 PetLuma. All rights reserved.
        </p>
        <p className="mt-2 font-sans text-[10px] leading-relaxed text-[#6E6A64]/85">
          Digital companion identity & memorial service.
        </p>
        <p className="mx-auto mt-3 max-w-md font-sans text-[10px] leading-relaxed text-[#6E6A64]/75">
          PetLuma is an independent creative registry project and is not affiliated with
          any government authority.
        </p>
        <nav
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          aria-label="Legal"
        >
          <Link href="/privacy" className={footerLinkClass}>
            Privacy
          </Link>
          <Link href="/terms" className={footerLinkClass}>
            Terms
          </Link>
          <Link href="/contact" className={footerLinkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
