import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-kingdom-gold/10 bg-kingdom-cream/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-xl font-medium tracking-tight text-kingdom-ink transition-colors duration-500 group-hover:text-kingdom-navy">
            PetLuma
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-kingdom-ink-muted">
            Kingdom Registry
          </span>
        </Link>
        <nav className="flex items-center gap-3 md:gap-5" aria-label="Primary">
          <Link
            href="#registry"
            className="hidden font-sans text-[11px] tracking-wide text-kingdom-ink-muted transition-colors duration-500 hover:text-kingdom-ink sm:inline"
          >
            The Registry
          </Link>
          <Link
            href="#story"
            className="hidden font-sans text-[11px] tracking-wide text-kingdom-ink-muted transition-colors duration-500 hover:text-kingdom-ink sm:inline"
          >
            Story
          </Link>
          <Link
            href="/privacy"
            className="hidden font-sans text-[11px] tracking-wide text-kingdom-ink-muted transition-colors duration-500 hover:text-kingdom-ink md:inline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hidden font-sans text-[11px] tracking-wide text-kingdom-ink-muted transition-colors duration-500 hover:text-kingdom-ink md:inline"
          >
            Terms
          </Link>
          <Link
            href="/create"
            className="border border-kingdom-navy/15 bg-kingdom-navy px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-kingdom-cream transition-all duration-500 hover:bg-kingdom-navy-deep"
          >
            Create Passport
          </Link>
        </nav>
      </div>
    </header>
  );
}
