import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClarityEventOnMount } from "@/components/ClarityEventOnMount";
import { CompanionStoryPanel } from "@/components/companion/CompanionStoryPanel";
import { ArchiveCard } from "@/components/registry-hall/ArchiveCard";
import { fetchCommunityRegistryHallRecordByCompanionId } from "@/lib/community-registry-server";
import {
  buildRandomCompanionDiscoveryUrl,
  getRelatedCompanions,
} from "@/lib/random-companions";
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
import { CLARITY_EVENTS } from "@/lib/clarity";
import { guardianOwnsCompanion } from "@/lib/companion-story-server";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import "@/styles/companion-archive.css";
import "@/styles/registry-hall.css";

export const dynamic = "force-dynamic";

type CompanionArchivePageProps = {
  params: Promise<{ id: string }>;
};

type ArchiveRecordField = {
  label: string;
  value: string;
};

const ARCHIVE_STATUS_LABEL = "Preserved";

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

  const relatedCompanions = await getRelatedCompanions(record.companionId, 3);
  const country = record.country ?? getCountryFromCompanionId(record.companionId);
  const storyText = record.story?.trim() ?? "";
  const specialMemoryText = record.specialMemory?.trim() ?? "";
  const favoriteThings = record.favoriteThings ?? [];
  const showPortrait = record.hasPhoto ?? Boolean(record.photoUrl);
  const dateRegistered = displayArchiveValue(record.kingdomSince);
  const supabase = await createAuthServerClient();
  let canEditStory = false;

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      canEditStory = await guardianOwnsCompanion(record.companionId, user.id);
    }
  }

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
      <ClarityEventOnMount event={CLARITY_EVENTS.ARCHIVE_OPENED} />
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

                <dl className="companion-archive__hero-catalog">
                  <div className="companion-archive__hero-catalog-item">
                    <dt className="companion-archive__hero-catalog-label">Archive Status</dt>
                    <dd className="companion-archive__hero-catalog-value">{ARCHIVE_STATUS_LABEL}</dd>
                  </div>
                  <div className="companion-archive__hero-catalog-item">
                    <dt className="companion-archive__hero-catalog-label">Registered</dt>
                    <dd className="companion-archive__hero-catalog-value">{dateRegistered}</dd>
                  </div>
                </dl>
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

        <Suspense
          fallback={
            <section className="companion-archive__narrative">
              <div className="companion-archive__container">
                <div className="companion-archive__narrative-inner">
                  <h2 className="companion-archive__section-title">Their Story</h2>
                  <p className="companion-archive__narrative-placeholder">Loading story…</p>
                </div>
              </div>
            </section>
          }
        >
          <CompanionStoryPanel
            companionId={record.companionId}
            companionName={record.name}
            initialStory={storyText}
            canEdit={canEditStory}
          />
        </Suspense>

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
            <p className="companion-archive__footer-heading">Entered into the Kingdom Registry</p>
            <p className="companion-archive__footer-date">{dateRegistered}</p>

            <div className="companion-archive__footer-id-block">
              <p className="companion-archive__footer-id-label">Companion ID</p>
              <p className="companion-archive__footer-id-value">{record.companionId}</p>
            </div>

            <p className="companion-archive__footer-motto">
              Every companion deserves to be remembered.
            </p>
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
              Register another Companion
            </Link>
          </div>
        </div>

        {relatedCompanions.length > 0 ? (
          <section className="companion-archive__explore" aria-labelledby="explore-registry-title">
            <div className="companion-archive__container">
              <h2 id="explore-registry-title" className="companion-archive__explore-title">
                Continue Exploring The Registry
              </h2>
              <p className="companion-archive__explore-lead">
                Discover another companion preserved within the Kingdom.
              </p>
              <div className="companion-archive__explore-grid registry-hall">
                {relatedCompanions.map((relatedRecord) => (
                  <ArchiveCard key={relatedRecord.companionId} record={relatedRecord} />
                ))}
              </div>
              <div className="companion-archive__explore-actions">
                <a
                  href={buildRandomCompanionDiscoveryUrl(record.companionId)}
                  className="companion-archive__discovery-btn"
                >
                  Random Discovery
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
