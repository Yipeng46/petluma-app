const RECENT_REGISTRATIONS = [
  { name: "Milo", id: "PK-2026-AU-000001", origin: "Australia" },
  { name: "Luna", id: "PK-2026-US-000002", origin: "United States" },
  { name: "Coco", id: "PK-2026-JP-000003", origin: "Japan" },
] as const;

export function RecentlyRegisteredSection() {
  return (
    <section className="home-section recently-section">
      <div className="home-section__inner mx-auto max-w-6xl px-6 md:px-10">
        <header className="home-section__chapter">
          <p className="home-section__chapter-label">
            <span className="home-section__chapter-index">03</span>
            <span className="home-section__chapter-rule" aria-hidden="true" />
            <span>Recently Registered</span>
          </p>
        </header>

        <div className="recently-section__intro">
          <h2 className="home-section__title">Recently Registered</h2>
          <p className="home-section__subtitle">
            A growing archive of companions from around the world.
          </p>
        </div>

        <ul className="recently-section__grid">
          {RECENT_REGISTRATIONS.map((entry) => (
            <li key={entry.id} className="registry-preview-card">
              <p className="registry-preview-card__id">{entry.id}</p>
              <h3 className="registry-preview-card__name">{entry.name}</h3>
              <p className="registry-preview-card__meta">{entry.origin}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
