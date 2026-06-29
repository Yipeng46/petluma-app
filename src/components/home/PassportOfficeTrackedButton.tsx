"use client";

import { useEffect, useState } from "react";
import { trackPassportEntryClick } from "@/lib/clarity";
import {
  PASSPORT_ACCESS_PATH,
  PASSPORT_OFFICE_PATH,
} from "@/lib/passport-routes";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import { TrackedRegistryButton } from "./TrackedRegistryButton";
import type { RegistryButtonProps } from "./RegistryButton";

type PassportOfficeTrackedButtonProps = Omit<RegistryButtonProps, "href">;

export function PassportOfficeTrackedButton({
  onClick,
  ...props
}: PassportOfficeTrackedButtonProps) {
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
    <TrackedRegistryButton
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        trackPassportEntryClick();
      }}
    />
  );
}
