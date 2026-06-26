import Link from "next/link";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

type GuardianNavLinkProps = {
  className?: string;
  linkClassName?: string;
};

export async function GuardianNavLink({
  className,
  linkClassName = "site-header__link",
}: GuardianNavLinkProps) {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link href="/my-kingdom" className={className ?? linkClassName}>
        My Kingdom
      </Link>
    );
  }

  return (
    <Link href="/sign-in" className={className ?? linkClassName}>
      Sign In
    </Link>
  );
}
