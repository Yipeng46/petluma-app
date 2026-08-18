"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PASSPORT_OFFICE_NAV } from "@/lib/home-nav-links";

type PassportRegistrationNavProps = {
  onNavigate?: () => void;
};

export function PassportRegistrationNav({ onNavigate }: PassportRegistrationNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handlePointerDown);
    }

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    onNavigate?.();
  }

  return (
    <div className="registry-nav-menu" ref={menuRef}>
      <button
        type="button"
        className="registry-nav-menu__trigger site-header__link"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {PASSPORT_OFFICE_NAV.label}{" "}
        <span className="site-header__nav-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {menuOpen ? (
        <div className="registry-nav-menu__panel" role="menu">
          {PASSPORT_OFFICE_NAV.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="registry-nav-menu__item"
                role="menuitem"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
        </div>
      ) : null}
    </div>
  );
}
