import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCommunityRegistryHallRecordByCompanionId } from "@/lib/community-registry-server";
import {
  getCountryFromCompanionId,
  type RegistryHallRecord,
} from "@/lib/registry-hall-mock";
import { buildCompanionUrl } from "@/lib/site-url";
import "@/styles/companion-archive.css";

type CompanionArchivePageProps = {
  params: Promise<{ id: string }>;
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

  const archiveDetails = [
    { label: "Species", value: displayArchiveValue(record.species) },
    { label: "Breed", value: displayArchiveValue(record.breed) },
    { label: "Gender", value: displayArchiveValue(record.gender) },
    { label: "Country", value: displayArchiveValue(country) },
    { label: "Date of Birth", value: displayArchiveValue(record.dateOfBirth) },
    {
      label: "Registered Status",
      value: displayArchiveValue(record.registeredStatus, "Registered"),
    },
  ] as const;

  return (
    <div className="companion-archive min-h-screen font-sans antialiased">
      <div className="companion-archive__texture" aria-hidden="true" />
      <SiteHeader />

      <main className="companion-archive__main">
        <section className="companion-archive__hero">
          <div className="companion-archive__container">
            <p className="companion-archive__eyebrow">PetLuma Kingdom Registry</p>
            <p className="companion-archive__eyebrow companion-archive__eyebrow-sub">
              Companion Archive
            </p>

            <div className="companion-archive__identity">
              <p className="companion-archive__field-label">Companion Name</p>
              <h1 className="companion-archive__name">{record.name}</h1>
            </div>

            <dl className="companion-archive__header-meta">
              <div className="companion-archive__header-meta-item">
                <dt>Companion ID</dt>
                <dd className="companion-archive__mono">{record.companionId}</dd>
              </div>
              <div className="companion-archive__header-meta-item">
                <dt>Passport Number</dt>
                <dd className="companion-archive__mono">{record.passportNo}</dd>
              </div>
              <div className="companion-archive__header-meta-item">
                <dt>Kingdom Since</dt>
                <dd>{record.kingdomSince}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="companion-archive__profile">
          <div className="companion-archive__container">
            <div className="companion-archive__profile-grid">
              <div className="companion-archive__portrait-wrap">
                <p className="companion-archive__portrait-label">Companion Portrait</p>
                <div className="companion-archive__portrait">
                  {showPortrait ? (
                    <Image
                      src={record.photoUrl}
                      alt={`Portrait of ${record.name}`}
                      width={640}
                      height={800}
                      priority
                      sizes="(max-width: 1023px) 100vw, 22rem"
                      className="companion-archive__portrait-image"
                    />
                  ) : (
                    <div className="companion-archive__portrait-empty" aria-hidden="true">
                      <span>No portrait archived</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="companion-archive__registry">
                <h2 className="companion-archive__registry-title">Archive Details</h2>
                <dl className="companion-archive__registry-list">
                  {archiveDetails.map((field) => (
                    <div key={field.label} className="companion-archive__registry-row">
                      <dt>{field.label}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="companion-archive__story">
          <div className="companion-archive__container">
            <h2 className="companion-archive__section-title">Story</h2>
            <div className="companion-archive__story-text">
              {storyText ? (
                <StoryParagraphs text={storyText} />
              ) : (
                <p className="companion-archive__story-placeholder">
                  This archive has not yet included a written story.
                </p>
              )}
            </div>
          </div>
        </section>

        {specialMemoryText ? (
          <section className="companion-archive__story">
            <div className="companion-archive__container">
              <h2 className="companion-archive__section-title">Special Memory</h2>
              <div className="companion-archive__story-text">
                <StoryParagraphs text={specialMemoryText} />
              </div>
            </div>
          </section>
        ) : null}

        {favoriteThings.length > 0 ? (
          <section className="companion-archive__story">
            <div className="companion-archive__container">
              <h2 className="companion-archive__section-title">Favorite Things</h2>
              <div className="companion-archive__story-text">
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
          </section>
        ) : null}

        <section className="companion-archive__declaration">
          <div className="companion-archive__container">
            <p>
              This companion archive is preserved within the PetLuma Kingdom Registry.
            </p>
            <p>Every companion deserves to be remembered.</p>
          </div>
        </section>

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
