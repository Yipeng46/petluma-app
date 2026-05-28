const features = [
  {
    title: "Companion Passport",
    description: "An identity as unique as they are.",
    accent: "01",
  },
  {
    title: "Memorial Archive",
    description: "Memories deserve a home.",
    accent: "02",
  },
  {
    title: "Kingdom Box",
    description: "Timeless design. Made with care.",
    accent: "03",
  },
] as const;

export function FeatureCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 lg:gap-4">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="feature-card registry-paper group rounded-sm px-5 py-5 md:px-6 md:py-6"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-kingdom-gold-dark/80">
            {feature.accent}
          </p>
          <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-kingdom-ink transition-colors duration-500 group-hover:text-kingdom-navy">
            {feature.title}
          </h3>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-kingdom-ink-muted">
            {feature.description}
          </p>
          <div className="registry-rule mt-5 w-10 opacity-60 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
        </article>
      ))}
    </div>
  );
}
