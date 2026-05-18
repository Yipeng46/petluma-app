import Link from "next/link";

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

      <Link
        href="/create"
        className="hidden rounded-full border border-[#2f2119]/15 bg-[#2f2119] px-5 py-2.5 text-sm font-medium text-[#fff8eb] shadow-[0_14px_40px_rgba(47,33,25,0.16)] transition hover:-translate-y-0.5 hover:bg-[#3a291f] sm:inline-flex"
      >
        Create card
      </Link>
    </header>
  );
}
