"use client";

import { useRouter } from "next/navigation";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createAuthBrowserClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" className="my-kingdom__sign-out" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
