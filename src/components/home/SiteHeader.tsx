"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "#story" },
  { label: "Passport", href: "/create" },
  { label: "Registry", href: "/registry-hall" },
  { label: "Memorial", href: "#registry" },
  { label: "Journal", href: "#story" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[18px]" aria-hidden>
      <span
        className={`absolute left-0 top-0 h-px w-full bg-kingdom-ink transition-all duration-500 ${open ? "top-[6px] rotate-45" : ""}`}
      />
      <span
        className={`absolute left-0 top-[6px] h-px w-full bg-kingdom-ink transition-all duration-500 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`absolute bottom-0 left-0 h-px w-full bg-kingdom-ink transition-all duration-500 ${open ? "bottom-[6px] -rotate-45" : ""}`}
      />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-kingdom-ink/[0.06] bg-kingdom-cream/92 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 md:px-10 md:py-5">
        <Link href="/" className="group inline-flex items-center justify-self-start">
          <Image
            src="/petluma-logo.svg"
            alt="PetLuma"
            width={960}
            height={320}
            priority
            className="h-8 w-auto object-contain object-left opacity-100 transition-opacity duration-300 group-hover:opacity-80 sm:h-9 md:h-11 lg:h-[52px]"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-[11px] tracking-[0.06em] text-kingdom-ink-muted transition-colors duration-500 hover:text-kingdom-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 md:gap-4">
          <Link
            href="/create"
            className="hidden border border-kingdom-ink bg-kingdom-ink px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-kingdom-cream transition-colors duration-500 hover:bg-kingdom-brown sm:inline-flex"
          >
            Create Passport
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-kingdom-ink/10 bg-transparent transition-colors duration-500 hover:border-kingdom-ink/20 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          className="border-t border-kingdom-ink/[0.06] bg-kingdom-cream px-6 py-6 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block font-sans text-sm tracking-wide text-kingdom-ink-muted transition-colors hover:text-kingdom-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/create"
                className="inline-flex border border-kingdom-ink bg-kingdom-ink px-5 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-kingdom-cream"
                onClick={() => setMenuOpen(false)}
              >
                Create Passport
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
