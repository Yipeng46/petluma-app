import Link from "next/link";
import { redirect } from "next/navigation";
import { KingdomCompanionCard } from "@/components/guardian/KingdomCompanionCard";
import { SignOutButton } from "@/components/guardian/SignOutButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  fetchGuardianKingdomData,
  formatCompanionCount,
  formatGuardianDisplayName,
} from "@/lib/guardian-server";
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

  const kingdom = await fetchGuardianKingdomData(user.id);

  if (!kingdom) {
    redirect("/sign-in?next=/my-kingdom");
  }

  const displayName = formatGuardianDisplayName(kingdom.profile);
  const companionLabel = formatCompanionCount(kingdom.companions.length);

  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />

      <main className="my-kingdom">
        <div className="my-kingdom__inner">
          <header className="my-kingdom__header">
            <p className="my-kingdom__welcome">Welcome back</p>
            <h1 className="my-kingdom__title">{displayName}</h1>
            <p className="my-kingdom__subtitle">Guardian of {companionLabel}</p>
          </header>

          {kingdom.companions.length === 0 ? (
            <section className="my-kingdom__empty">
              <p className="my-kingdom__empty-text">
                Your Kingdom awaits its first registered companion.
              </p>
            </section>
          ) : (
            <section className="my-kingdom__grid" aria-label="Your companions">
              {kingdom.companions.map((companion) => (
                <KingdomCompanionCard key={companion.companionId} companion={companion} />
              ))}
            </section>
          )}

          <footer className="my-kingdom__footer">
            <Link href="/passport" className="my-kingdom__register">
              Register Another Companion
            </Link>
            <SignOutButton />
          </footer>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
