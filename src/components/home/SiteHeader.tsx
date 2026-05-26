import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-kingdom-gold/10 bg-kingdom-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-xl font-medium tracking-tight text-kingdom-ink transition-colors duration-300 group-hover:text-kingdom-forest">
            PetLuma
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-kingdom-ink-muted">
            Kingdom Registry
          </span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8" aria-label="Primary">
          <Link
            href="#kingdom-registry"
            className="hidden font-sans text-xs tracking-wide text-kingdom-ink-muted transition-colors duration-300 hover:text-kingdom-ink sm:inline"
          >
            The Registry
          </Link>
          <Link
            href="#editions"
            className="hidden font-sans text-xs tracking-wide text-kingdom-ink-muted transition-colors duration-300 hover:text-kingdom-ink sm:inline"
          >
            Editions
          </Link>
          <Link
            href="/create"
            className="rounded-sm border border-kingdom-forest/20 bg-kingdom-forest px-4 py-2 font-sans text-xs font-medium tracking-wide text-kingdom-cream transition-all duration-300 hover:bg-kingdom-forest-deep hover:shadow-card"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
