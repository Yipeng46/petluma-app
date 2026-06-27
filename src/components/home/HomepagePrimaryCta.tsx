"use client";

import { useEffect, useState } from "react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import { TrackedRegistryButton } from "./TrackedRegistryButton";

type CtaState = {
  href: string;
  label: string;
};

const SIGNED_OUT_CTA: CtaState = {
  href: "/sign-in?mode=sign-up",
  label: "Create Guardian Account",
};

const SIGNED_IN_CTA: CtaState = {
  href: "/passport",
  label: "Register a Companion",
};

export function HomepagePrimaryCta() {
  const [cta, setCta] = useState<CtaState>(SIGNED_OUT_CTA);

  useEffect(() => {
    const supabase = createAuthBrowserClient();

    if (!supabase) {
      return;
    }

    function applySession(isSignedIn: boolean) {
      setCta(isSignedIn ? SIGNED_IN_CTA : SIGNED_OUT_CTA);
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

  return <TrackedRegistryButton href={cta.href}>{cta.label}</TrackedRegistryButton>;
}
