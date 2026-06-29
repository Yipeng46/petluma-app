"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackPassportEntryClick } from "@/lib/clarity";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import {
  PASSPORT_ACCESS_PATH,
  PASSPORT_OFFICE_PATH,
} from "@/lib/passport-routes";

type PassportOfficeLinkProps = {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
};

export function PassportOfficeLink({
  className,
  children,
  onNavigate,
}: PassportOfficeLinkProps) {
  const [href, setHref] = useState(PASSPORT_ACCESS_PATH);

  useEffect(() => {
    const supabase = createAuthBrowserClient();

    if (!supabase) {
      return;
    }

    function applySession(isSignedIn: boolean) {
      setHref(isSignedIn ? PASSPORT_OFFICE_PATH : PASSPORT_ACCESS_PATH);
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

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        onNavigate?.();
        trackPassportEntryClick();
      }}
    >
      {children}
    </Link>
  );
}
