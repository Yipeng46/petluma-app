import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

type LegalPageShellProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="registry-home flex min-h-screen flex-col bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <SiteHeader />
      <main className="flex-1 px-6 py-14 md:px-10 md:py-20">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="font-sans text-xs text-kingdom-ink-muted transition-colors hover:text-kingdom-ink"
          >
            ← Back to home
          </Link>
          <h1 className="mt-8 font-display text-3xl font-medium tracking-tight text-kingdom-ink md:text-4xl">
            {title}
          </h1>
          <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-kingdom-ink-muted">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
