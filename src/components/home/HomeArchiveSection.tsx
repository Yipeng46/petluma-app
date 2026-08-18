import Link from "next/link";
import { SectionEyebrow } from "./RegistryButton";

export function HomeArchiveSection() {
  return (
    <section
      id="companion-archive"
      className="home-section home-showcase home-showcase--archive"
      aria-labelledby="home-archive-title"
    >
      <div className="home-showcase__inner mx-auto max-w-6xl px-6 md:px-10">
        <div className="home-showcase__grid">
          <article className="home-archive-panel" aria-label="Companion Archive example">
            <header className="home-archive-panel__header">
              <p className="home-archive-panel__registry">PetLuma Registry</p>
              <p className="home-archive-panel__label">Companion Archive</p>
            </header>

            <div className="home-archive-panel__hero">
              <div className="home-archive-panel__portrait" aria-hidden="true" />
              <div>
                <p className="home-archive-panel__name">Luna</p>
                <p className="home-archive-panel__id">PK-2026-AU-000021</p>
              </div>
            </div>

            <div className="home-archive-panel__story">
              <p className="home-archive-panel__story-label">Their Story</p>
              <p className="home-archive-panel__story-status">No story added yet.</p>
              <p className="home-archive-panel__story-copy">
                Tell the story of how your lives came together, what makes them special,
                or a memory you never want to forget.
              </p>
            </div>
          </article>

          <div className="home-showcase__copy">
            <SectionEyebrow>Beyond the book</SectionEyebrow>
            <h2 id="home-archive-title" className="pl-section-title home-showcase__title">
              Their story lives on.
            </h2>
            <p className="home-showcase__body pl-body">
              Build their story, record their journey, and keep their memory alive in
              their digital archive.
            </p>
            <Link href="/hall" className="registry-btn registry-btn--secondary pl-btn mt-8 inline-flex px-6 py-3">
              Explore the Archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
