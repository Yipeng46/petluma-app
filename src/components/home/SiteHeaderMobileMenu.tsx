"use client";

import Link from "next/link";
import { useState } from "react";
import { GuardianMenuClient } from "@/components/guardian/GuardianMenuClient";
import { PassportOfficeLink } from "@/components/home/PassportOfficeLink";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Passport Office", href: "/passport", passport: true },
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

export function SiteHeaderMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="site-header__menu flex h-9 w-9 items-center justify-center rounded-none border border-kingdom-ink/10 bg-transparent md:hidden"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <MenuIcon open={menuOpen} />
      </button>

      {menuOpen ? (
        <nav
          className="site-header__mobile absolute left-0 right-0 top-[var(--site-header-height)] border-t border-kingdom-ink/[0.06] px-6 py-8 md:hidden"
          aria-label="Mobile"
        >
          <ul className="site-header__wayfinding site-header__wayfinding--mobile">
            {navLinks.map((link) => (
              <li key={link.label}>
                {"passport" in link && link.passport ? (
                  <PassportOfficeLink
                    className="site-header__link site-header__link--mobile"
                    onNavigate={closeMenu}
                  >
                    {link.label}
                  </PassportOfficeLink>
                ) : (
                  <Link
                    href={link.href}
                    className="site-header__link site-header__link--mobile"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="site-header__mobile-cta">
              <GuardianMenuClient
                className="site-header__link site-header__link--mobile inline-block"
                onNavigate={closeMenu}
              />
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}
