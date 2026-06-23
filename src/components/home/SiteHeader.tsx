import Link from "next/link";
import { SiteHeaderMobileMenu } from "@/components/home/SiteHeaderMobileMenu";
import { TrackedPassportLink } from "@/components/home/TrackedPassportLink";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Passport Office", href: "/passport" },
  { label: "Registry Hall", href: "/hall" },
  { label: "Founding Chamber", href: "/founding" },
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="site-header relative w-full border-b border-kingdom-ink/[0.06]">
        <nav
          className="site-header__bar mx-auto grid h-[var(--site-header-height)] w-full max-w-[1400px] grid-cols-[1fr_auto] items-center px-6 md:grid-cols-[1fr_auto_1fr] md:px-10"
          aria-label="Site"
        >
          <Link
            href="/"
            className="site-header__brand group flex shrink-0 flex-col justify-center justify-self-start"
          >
            <span className="font-[family-name:var(--font-cormorant)] text-[22px] font-medium leading-none text-[#2B241D]">
              PetLuma
            </span>
            <span className="pl-caption mt-1.5 text-[#6F6256]">Kingdom Registry</span>
          </Link>

          <div className="site-header__wayfinding site-header__wayfinding--desktop hidden justify-self-center md:flex">
            {navLinks.map((link) =>
              link.href === "/passport" ? (
                <TrackedPassportLink key={link.label} href={link.href} className="site-header__link">
                  {link.label}
                </TrackedPassportLink>
              ) : (
                <Link key={link.label} href={link.href} className="site-header__link">
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="relative flex shrink-0 items-center justify-self-end gap-3 md:gap-4">
            <TrackedPassportLink href="/passport" className="site-header__cta hidden md:inline-flex">
              Begin Registration
            </TrackedPassportLink>
            <SiteHeaderMobileMenu />
          </div>
        </nav>
      </header>
      <div className="site-header-spacer" aria-hidden />
    </>
  );
}
