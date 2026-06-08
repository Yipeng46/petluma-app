"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Passport Office", href: "/passport" },
  { label: "Registry Hall", href: "/hall" },
  { label: "Founding Chamber", href: "/founding" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="site-header__menu-glyph" aria-hidden>
      {open ? "✕" : "☰"}
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header w-full border-b border-kingdom-ink/[0.06]">
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
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="site-header__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-self-end gap-3 md:gap-4">
            <Link href="/passport" className="site-header__cta hidden md:inline-flex">
              Begin Registration
            </Link>
            <button
              type="button"
              className="site-header__menu flex h-9 w-9 items-center justify-center rounded-none border border-kingdom-ink/10 bg-transparent md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </nav>

        {menuOpen ? (
          <nav
            className="site-header__mobile border-t border-kingdom-ink/[0.06] px-6 py-8 md:hidden"
            aria-label="Mobile"
          >
            <ul className="site-header__wayfinding site-header__wayfinding--mobile">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="site-header__link site-header__link--mobile"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="site-header__mobile-cta">
                <Link
                  href="/passport"
                  className="site-header__cta inline-flex w-full justify-center"
                  onClick={closeMenu}
                >
                  Begin Registration
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
      <div className="site-header-spacer" aria-hidden />
    </>
  );
}
