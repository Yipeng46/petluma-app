import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";

export type AuthenticatedGuardian = {
  id: string;
  email: string;
};

declare global {
  interface Window {
    __PETLUMA_E2E_GUARDIAN__?: AuthenticatedGuardian;
  }
}

export async function getAuthenticatedGuardian(): Promise<AuthenticatedGuardian | null> {
  if (typeof window !== "undefined" && window.__PETLUMA_E2E_GUARDIAN__) {
    return window.__PETLUMA_E2E_GUARDIAN__;
  }

  const supabase = createAuthBrowserClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
  };
}
