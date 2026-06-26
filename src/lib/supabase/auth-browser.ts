import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseAuthUrl } from "@/lib/supabase/auth-env";

let authBrowserClient: SupabaseClient | null = null;

export function createAuthBrowserClient() {
  const supabaseUrl = getSupabaseAuthUrl();
  const anonKey = getSupabaseAnonKey();

  if (!supabaseUrl || !anonKey || typeof window === "undefined") {
    return null;
  }

  if (!authBrowserClient) {
    authBrowserClient = createBrowserClient(supabaseUrl, anonKey);
  }

  return authBrowserClient;
}
