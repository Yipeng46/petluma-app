export function SiteFooter() {
  return (
    <footer className="border-t border-kingdom-gold/10 bg-kingdom-cream px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-display text-lg text-kingdom-ink">PetLuma</p>
          <p className="mt-1 font-sans text-xs text-kingdom-ink-muted">
            Kingdom Registry · Companion Archive
          </p>
        </div>
        <p className="max-w-sm text-center font-sans text-xs leading-relaxed text-kingdom-ink-muted md:text-right">
          Every companion deserves to be remembered.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-6xl registry-rule" aria-hidden />
      <p className="mx-auto mt-6 max-w-6xl text-center font-sans text-[10px] text-kingdom-ink-muted/70">
        © {new Date().getFullYear()} PetLuma. All companions registered with care.
      </p>
    </footer>
  );
}
