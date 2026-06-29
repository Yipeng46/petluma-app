"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";

type GuardianNavLinkClientProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function GuardianNavLinkClient({
  className,
  linkClassName = "site-header__link",
  onNavigate,
}: GuardianNavLinkClientProps) {
  const [href, setHref] = useState("/sign-in");
  const [label, setLabel] = useState("Sign In");
  const resolvedClassName = className ?? linkClassName;

  useEffect(() => {
    const supabase = createAuthBrowserClient();

    if (!supabase) {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setHref("/my-kingdom");
        setLabel("My Kingdom");
      } else {
        setHref("/sign-in");
        setLabel("Sign In");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Link href={href} prefetch className={resolvedClassName} onClick={onNavigate}>
      {label}
    </Link>
  );
}
