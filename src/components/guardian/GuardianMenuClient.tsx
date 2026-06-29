"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import { PASSPORT_OFFICE_PATH } from "@/lib/passport-routes";

type GuardianMenuClientProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function GuardianMenuClient({
  className,
  linkClassName = "site-header__link",
  onNavigate,
}: GuardianMenuClientProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const resolvedClassName = className ?? linkClassName;

  useEffect(() => {
    const supabase = createAuthBrowserClient();

    if (!supabase) {
      return;
    }

    function applySession(signedIn: boolean) {
      setIsSignedIn(signedIn);
      if (!signedIn) {
        setMenuOpen(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(Boolean(session?.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(Boolean(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

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

  async function handleSignOut() {
    const supabase = createAuthBrowserClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    setMenuOpen(false);
    onNavigate?.();
    router.push("/");
    router.refresh();
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className={resolvedClassName}
        onClick={() => {
          setMenuOpen(false);
          onNavigate?.();
        }}
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="guardian-menu" ref={menuRef}>
      <button
        type="button"
        className={`guardian-menu__trigger ${resolvedClassName}`}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        Guardian <span aria-hidden="true">▾</span>
      </button>

      {menuOpen ? (
        <div className="guardian-menu__panel" role="menu">
          <Link
            href="/my-kingdom"
            className="guardian-menu__item"
            role="menuitem"
            onClick={() => {
              setMenuOpen(false);
              onNavigate?.();
            }}
          >
            My Kingdom
          </Link>
          <Link
            href={PASSPORT_OFFICE_PATH}
            className="guardian-menu__item"
            role="menuitem"
            onClick={() => {
              setMenuOpen(false);
              onNavigate?.();
            }}
          >
            Passport Office
          </Link>
          <button
            type="button"
            className="guardian-menu__item guardian-menu__item--button"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
