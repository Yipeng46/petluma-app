const STEPS = [
  {
    title: "Create their identity",
    description: "Add their details and portrait to build a permanent record.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="home-steps__icon">
        <path d="M7 4h10v16H7z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    title: "Receive a unique ID",
    description: "Every companion receives a one-of-a-kind Companion ID.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="home-steps__icon">
        <path d="M5 7h14v10H5z" />
        <path d="M8 11h8M8 14h5" />
        <path d="M9 5v2M15 5v2" />
      </svg>
    ),
  },
  {
    title: "Preserve it, always",
    description:
      "Keep their identity digitally, and optionally in a physical Companion Passport.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="home-steps__icon">
        <path d="M6 5h12v14H6z" />
        <path d="M9 9h6M9 12h6M9 15h4" />
        <path d="M8 5V3h8v2" />
      </svg>
    ),
  },
] as const;

export function HomeThreeStepsSection() {
  return (
    <section className="home-section home-steps" aria-labelledby="home-steps-title">
      <div className="home-section__inner mx-auto max-w-6xl px-6 md:px-10">
        <h2 id="home-steps-title" className="home-section__title home-steps__title">
          Three simple steps
        </h2>

        <ol className="home-steps__grid">
          {STEPS.map((step, index) => (
            <li key={step.title} className="home-steps__item">
              <div className="home-steps__icon-wrap">{step.icon}</div>
              <p className="home-steps__index">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="home-steps__item-title">{step.title}</h3>
              <p className="home-steps__item-copy">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
