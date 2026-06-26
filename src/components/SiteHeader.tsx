import Link from "next/link";
import { GuardianNavLinkClient } from "@/components/guardian/GuardianNavLinkClient";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 sm:px-8 sm:py-4">
      <Link
        href="/"
        className="inline-flex items-center overflow-visible"
      >
        <img
          src="/petluma-logo-transparent.png"
          alt="PetLuma"
          className="h-auto w-[260px] object-contain object-left mix-blend-multiply"
        />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <GuardianNavLinkClient linkClassName="font-[family-name:var(--font-body)] text-xs font-medium tracking-wide text-[#6E6A64] transition hover:text-[#081526]" />
        <Link
          href="/privacy"
          className="hidden font-[family-name:var(--font-body)] text-xs font-medium tracking-wide text-[#6E6A64] transition hover:text-[#081526] md:inline"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="hidden font-[family-name:var(--font-body)] text-xs font-medium tracking-wide text-[#6E6A64] transition hover:text-[#081526] md:inline"
        >
          Terms
        </Link>
        <Link
          href="/recover"
          className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.12em] text-[#7d632e] transition hover:text-[#081526] sm:text-sm"
        >
          Recover
        </Link>
        <Link
          href="/create"
          className="hidden rounded-full border border-[#b8944d]/35 bg-[#081526] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#fff8eb] shadow-[0_14px_40px_rgba(8,21,38,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0b1c32] sm:inline-flex"
        >
          Register Companion
        </Link>
      </nav>
    </header>
  );
}
