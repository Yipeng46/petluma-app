import { Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SignInForm } from "@/components/guardian/SignInForm";
import { createSiteMetadata } from "@/lib/site-metadata";
import "@/styles/guardian-auth.css";

export const metadata = createSiteMetadata({
  title: "Sign In — PetLuma Kingdom",
  description: "Enter My Kingdom as a registered Guardian of the PetLuma Registry.",
  path: "/sign-in",
});

export default function SignInPage() {
  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />

      <main className="guardian-auth-page">
        <div className="guardian-auth-page__inner">
          <Link href="/" className="guardian-auth-page__back">
            ← Back to home
          </Link>

          <p className="guardian-auth-page__eyebrow">Guardian Access</p>
          <h1 className="guardian-auth-page__title">Enter My Kingdom</h1>
          <p className="guardian-auth-page__lede">
            Sign in as a Guardian to return to your companions within the Kingdom Registry.
          </p>

          <Suspense fallback={<div className="guardian-auth-page__loading">Loading…</div>}>
            <SignInForm />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
