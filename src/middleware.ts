import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseAuthUrl } from "@/lib/supabase/auth-env";

export async function middleware(request: NextRequest) {
  const supabaseUrl = getSupabaseAuthUrl();
  const anonKey = getSupabaseAnonKey();

  if (!supabaseUrl || !anonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}

// Refreshes the auth session once per navigation. Route pages use getSession()
// locally to avoid a second Auth API round trip after middleware runs.

export const config = {
  matcher: ["/my-kingdom/:path*", "/sign-in"],
};
