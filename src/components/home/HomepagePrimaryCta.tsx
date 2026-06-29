"use client";

import { useEffect, useState } from "react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import { TrackedRegistryButton } from "./TrackedRegistryButton";

type CtaState = {
  href: string;
  label: string;
  showSubtitle: boolean;
};

const SIGNED_OUT_CTA: CtaState = {
  href: "/sign-in?mode=sign-up",
  label: "Begin Your Kingdom",
  showSubtitle: true,
};

const SIGNED_IN_CTA: CtaState = {
  href: "/my-kingdom",
  label: "Enter My Kingdom",
  showSubtitle: false,
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

  return (
    <div className="hero-section__cta-block">
      <TrackedRegistryButton href={cta.href}>{cta.label}</TrackedRegistryButton>
      {cta.showSubtitle ? (
        <p className="hero-section__cta-note">
          Create your Guardian account and begin your companion&apos;s official journey.
        </p>
      ) : null}
    </div>
  );
}
