import Link from "next/link";
import { redirect } from "next/navigation";
import { KingdomCompanionCard } from "@/components/guardian/KingdomCompanionCard";
import { SignOutButton } from "@/components/guardian/SignOutButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { fetchGuardianKingdomData } from "@/lib/guardian-server";
import { createSiteMetadata } from "@/lib/site-metadata";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import "@/styles/my-kingdom.css";

export const metadata = createSiteMetadata({
  title: "My Kingdom — PetLuma",
  description: "Your Guardian Kingdom within the PetLuma Registry.",
  path: "/my-kingdom",
});

export default async function MyKingdomPage() {
  const supabase = await createAuthServerClient();

  if (!supabase) {
    redirect("/sign-in?next=/my-kingdom");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?next=/my-kingdom");
  }

  const kingdom = await fetchGuardianKingdomData(user.id, user.email ?? "");

  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />

      <main className="my-kingdom">
        <div className="my-kingdom__inner">
          <header className="my-kingdom__header">
            <p className="my-kingdom__welcome">Guardian Dashboard</p>
            <h1 className="my-kingdom__title">My Kingdom</h1>
            <p className="my-kingdom__subtitle">
              Your registered companions within the PetLuma Kingdom.
            </p>

            <div className="my-kingdom__actions">
              <Link href="/passport" className="my-kingdom__action-btn my-kingdom__action-btn--primary">
                Register Another Companion
              </Link>
              <Link href="/hall" className="my-kingdom__action-btn">
                View Registry Hall
              </Link>
            </div>
          </header>

          {kingdom.companions.length === 0 ? (
            <section className="my-kingdom__empty">
              <p className="my-kingdom__empty-title">Your Kingdom is waiting.</p>
              <p className="my-kingdom__empty-text">
                Register your first companion to begin your archive.
              </p>
              <Link href="/passport" className="my-kingdom__empty-cta">
                Register Your First Companion
              </Link>
            </section>
          ) : (
            <section className="my-kingdom__grid" aria-label="Your companions">
              {kingdom.companions.map((companion) => (
                <KingdomCompanionCard key={companion.companionId} companion={companion} />
              ))}
            </section>
          )}

          <footer className="my-kingdom__footer">
            <SignOutButton />
          </footer>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
