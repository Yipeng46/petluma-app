import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCommunityRegistryHallRecordByCompanionId } from "@/lib/community-registry-server";
import {
  displayBreed,
  displayCountry,
  displayGender,
  displaySpecies,
} from "@/lib/display-normalization";
import {
  getCountryFromCompanionId,
  type RegistryHallRecord,
} from "@/lib/registry-hall-mock";
import { buildCompanionUrl } from "@/lib/site-url";
import "@/styles/companion-archive.css";

type CompanionArchivePageProps = {
  params: Promise<{ id: string }>;
};

type ArchiveRecordField = {
  label: string;
  value: string;
};

async function resolveRegistryHallRecord(
  companionId: string,
): Promise<RegistryHallRecord | undefined> {
  return fetchCommunityRegistryHallRecordByCompanionId(companionId);
}

function displayArchiveValue(value: string | undefined, fallback = "—") {
  const trimmed = value?.trim();

  if (!trimmed) {
    return fallback;
  }

  return trimmed;
}

function StoryParagraphs({ text }: { text: string }) {
  return text
    .trim()
    .split(/\n\n+/)
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

function ArchiveRecordEntry({ label, value }: ArchiveRecordField) {
  return (
    <div className="companion-archive__record-entry">
      <p className="companion-archive__record-label">{label}</p>
      <p className="companion-archive__record-value">{value}</p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: CompanionArchivePageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await resolveRegistryHallRecord(id);

  if (!record) {
    return {
      title: "Archive Not Found — PetLuma Kingdom",
    };
  }

  const title = `${record.name} — Companion Archive`;
  const description = `Archive record for ${record.name}, ${record.companionId}, preserved within the PetLuma Kingdom Registry.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCompanionUrl(id),
    },
    openGraph: {
      title,
      description,
      url: buildCompanionUrl(id),
      type: "website",
      siteName: "PetLuma Kingdom Registry",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CompanionArchivePage({ params }: CompanionArchivePageProps) {
  const { id } = await params;
  const record = await resolveRegistryHallRecord(id);

  if (!record) {
    notFound();
  }

  const country = record.country ?? getCountryFromCompanionId(record.companionId);
  const storyText = record.story?.trim() ?? "";
  const specialMemoryText = record.specialMemory?.trim() ?? "";
  const favoriteThings = record.favoriteThings ?? [];
  const showPortrait = record.hasPhoto ?? Boolean(record.photoUrl);
  const dateRegistered = displayArchiveValue(record.kingdomSince);

  const archiveRecord: ArchiveRecordField[] = [
    { label: "Species", value: displayArchiveValue(displaySpecies(record.species)) },
    { label: "Breed", value: displayArchiveValue(displayBreed(record.breed)) },
    { label: "Gender", value: displayArchiveValue(displayGender(record.gender ?? "")) },
    { label: "Country", value: displayArchiveValue(displayCountry(country ?? "")) },
    { label: "Date of Birth", value: displayArchiveValue(record.dateOfBirth) },
    { label: "Date Registered", value: dateRegistered },
  ];

  return (
    <div className="companion-archive min-h-screen font-sans antialiased">
      <div className="companion-archive__texture" aria-hidden="true" />
      <SiteHeader />

      <main className="companion-archive__main">
        <section className="companion-archive__hero" aria-labelledby="companion-archive-name">
          <div className="companion-archive__container companion-archive__hero-inner">
            <p className="companion-archive__eyebrow">PetLuma Kingdom Registry</p>
            <p className="companion-archive__eyebrow companion-archive__eyebrow-sub">
              Companion Archive
            </p>

            <div className="companion-archive__hero-stage">
              <div className="companion-archive__hero-portrait">
                {showPortrait ? (
                  <Image
                    src={record.photoUrl}
                    alt={`Portrait of ${record.name}`}
                    width={720}
                    height={900}
                    priority
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 72vw, 28rem"
                    className="companion-archive__hero-image"
                  />
                ) : (
                  <div className="companion-archive__hero-image companion-archive__hero-image--empty" aria-hidden="true">
                    <span>No portrait archived</span>
                  </div>
                )}
              </div>

              <div className="companion-archive__hero-identity">
                <h1 id="companion-archive-name" className="companion-archive__name">
                  {record.name}
                </h1>
                <p className="companion-archive__hero-id">{record.companionId}</p>
                <p className="companion-archive__hero-registered">
                  Registered in the Kingdom
                  <span className="companion-archive__hero-registered-date">{dateRegistered}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="companion-archive__record" aria-labelledby="archive-record-title">
          <div className="companion-archive__container">
            <div className="companion-archive__record-header">
              <h2 id="archive-record-title" className="companion-archive__section-title">
                Archive Record
              </h2>
              <p className="companion-archive__section-lead">
                Catalogued details preserved within the Kingdom Registry.
              </p>
            </div>

            <div className="companion-archive__record-grid">
              {archiveRecord.map((field) => (
                <ArchiveRecordEntry key={field.label} {...field} />
              ))}
            </div>
          </div>
        </section>

        <section className="companion-archive__narrative" aria-labelledby="archive-story-title">
          <div className="companion-archive__container">
            <div className="companion-archive__narrative-inner">
              <h2 id="archive-story-title" className="companion-archive__section-title">
                Archive Story
              </h2>
              <div className="companion-archive__narrative-body">
                {storyText ? (
                  <StoryParagraphs text={storyText} />
                ) : (
                  <p className="companion-archive__narrative-placeholder">
                    No written narrative has been added to this archive.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {specialMemoryText ? (
          <section className="companion-archive__narrative" aria-labelledby="special-memory-title">
            <div className="companion-archive__container">
              <div className="companion-archive__narrative-inner">
                <h2 id="special-memory-title" className="companion-archive__section-title">
                  Special Memory
                </h2>
                <div className="companion-archive__narrative-body">
                  <StoryParagraphs text={specialMemoryText} />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {favoriteThings.length > 0 ? (
          <section className="companion-archive__narrative" aria-labelledby="favorite-things-title">
            <div className="companion-archive__container">
              <div className="companion-archive__narrative-inner">
                <h2 id="favorite-things-title" className="companion-archive__section-title">
                  Favorite Things
                </h2>
                <div className="companion-archive__narrative-body">
                  {favoriteThings.length === 1 ? (
                    <p>{favoriteThings[0]}</p>
                  ) : (
                    <ul className="companion-archive__favorite-list">
                      {favoriteThings.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <footer className="companion-archive__footer">
          <div className="companion-archive__container companion-archive__footer-inner">
            <p className="companion-archive__footer-statement">
              Preserved in the PetLuma Kingdom Registry.
            </p>
            <p className="companion-archive__footer-motto">
              Every companion deserves to be remembered.
            </p>
            <p className="companion-archive__footer-id">{record.companionId}</p>
          </div>
        </footer>

        <div className="companion-archive__actions">
          <div className="companion-archive__container companion-archive__actions-inner">
            <Link href="/hall" className="companion-archive__action companion-archive__action--primary">
              Back to Registry Hall
            </Link>
            <Link
              href="/passport"
              className="companion-archive__action companion-archive__action--secondary"
            >
              Register Another Companion
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
