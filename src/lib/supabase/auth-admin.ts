import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAuthUrl } from "@/lib/supabase/auth-env";

let adminClient: SupabaseClient | null = null;

export function createSupabaseAdminClient() {
  const supabaseUrl = getSupabaseAuthUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}
