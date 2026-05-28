import { SectionEyebrow, SectionTitle } from "./ui";

export function StorySection() {
  return (
    <section id="story" className="px-6 py-24 md:px-10 md:py-32 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 xl:gap-24">
        <div className="story-image-frame relative aspect-[4/5] overflow-hidden rounded-sm border border-kingdom-gold/12 shadow-soft lg:aspect-[5/6]">
          <div className="story-image-silhouette absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_55%,rgba(250,246,240,0.25),transparent_70%)]"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-kingdom-parchment/50 to-transparent" />
          <p className="absolute bottom-6 left-6 font-sans text-[9px] uppercase tracking-[0.28em] text-kingdom-warm-gray">
            Archive Portrait · Placeholder
          </p>
        </div>

        <div className="max-w-lg lg:py-4">
          <SectionEyebrow>The Keepsake</SectionEyebrow>
          <SectionTitle as="h2" className="text-4xl md:text-[2.75rem] lg:text-5xl">
            It&apos;s not just a passport.
            <span className="mt-2 block text-kingdom-navy">It&apos;s their story.</span>
          </SectionTitle>
          <p className="mt-8 font-sans text-[15px] leading-[1.85] text-kingdom-ink-muted md:text-base">
            Every detail, every photo, every memory — crafted into a timeless keepsake.
          </p>
          <div className="registry-rule mt-12 max-w-[120px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
