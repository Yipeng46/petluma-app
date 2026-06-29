import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { buildPassportSignInUrl, PASSPORT_OFFICE_PATH } from "@/lib/passport-routes";
import { createSiteMetadata } from "@/lib/site-metadata";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import "@/styles/passport-access.css";

export const metadata = createSiteMetadata({
  title: "Passport Office Access — PetLuma",
  description:
    "The Passport Office serves registered Guardians within the PetLuma Kingdom.",
  path: "/passport/access",
});

export default async function PassportOfficeAccessPage() {
  const supabase = await createAuthServerClient();

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      redirect(PASSPORT_OFFICE_PATH);
    }
  }

  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />

      <main className="passport-access-page">
        <div className="passport-access-page__inner">
          <Link href="/" className="passport-access-page__back">
            ← Back to home
          </Link>

          <p className="passport-access-page__eyebrow">Passport Office</p>
          <h1 className="passport-access-page__title">Passport Office Access</h1>

          <p className="passport-access-page__lede">
            The Passport Office serves registered Guardians only.
          </p>
          <p className="passport-access-page__lede">
            Please sign in to issue an official Companion Passport.
          </p>

          <div className="passport-access-page__actions">
            <Link href={buildPassportSignInUrl()} className="passport-access-page__action">
              Sign In
            </Link>
            <Link
              href={buildPassportSignInUrl("sign-up")}
              className="passport-access-page__action passport-access-page__action--primary"
            >
              Create Guardian Account
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
