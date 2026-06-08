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
import "@/styles/companion-archive.css";

type CompanionArchivePageProps = {
  params: Promise<{ id: string }>;
};

async function resolveRegistryHallRecord(
  companionId: string,
): Promise<RegistryHallRecord | undefined> {
  return fetchCommunityRegistryHallRecordByCompanionId(companionId);
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

  return {
    title: `${record.name} — Companion Archive`,
    description: `Archive record for ${record.name}, ${record.companionId}, within the PetLuma Kingdom collection.`,
  };
}

export default async function CompanionArchivePage({ params }: CompanionArchivePageProps) {
  const { id } = await params;
  const record = await resolveRegistryHallRecord(id);

  if (!record) {
    notFound();
  }

  const country = record.country ?? getCountryFromCompanionId(record.companionId);

  const eraLabel = record.isPublic ? "Public Archive" : "Archive Record";

  const storyText = record.story?.trim() ?? "";
  const specialMemoryText = record.specialMemory?.trim() ?? "";
  const favoriteThings = record.favoriteThings ?? [];

  const registryFields = [
    { label: "Companion ID", value: record.companionId, mono: true },
    { label: "Name", value: record.name },
    { label: "Species", value: record.species },
    { label: "Breed", value: record.breed },
    { label: "Country", value: country },
    { label: "Registry Date", value: record.kingdomSince },
    ...(eraLabel ? [{ label: "Era", value: eraLabel }] : []),
  ] as const;

  const showPortrait = record.hasPhoto ?? Boolean(record.photoUrl);

  return (
    <div className="companion-archive min-h-screen font-sans antialiased">
      <div className="companion-archive__texture" aria-hidden="true" />
      <SiteHeader />

      <main className="companion-archive__main">
        <section className="companion-archive__hero">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="companion-archive__eyebrow">PetLuma Kingdom</p>
            <p className="companion-archive__eyebrow companion-archive__eyebrow-sub">
              {eraLabel}
            </p>
            <h1 className="companion-archive__name">{record.name}</h1>
            <p className="companion-archive__companion-id">{record.companionId}</p>
          </div>
        </section>

        <section className="companion-archive__profile">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="companion-archive__profile-grid">
              {showPortrait ? (
                <div className="companion-archive__portrait">
                  <Image
                    src={record.photoUrl}
                    alt={`Portrait of ${record.name}`}
                    width={640}
                    height={800}
                    priority
                    sizes="(max-width: 1023px) 100vw, 28rem"
                    className="companion-archive__portrait-image"
                  />
                </div>
              ) : null}

              <div className="companion-archive__registry">
                <h2 className="companion-archive__registry-title">Registry Record</h2>
                <dl className="companion-archive__registry-list">
                  {registryFields.map((field) => (
                    <div key={field.label} className="companion-archive__registry-row">
                      <dt>{field.label}</dt>
                      <dd
                        className={
                          "mono" in field && field.mono
                            ? "companion-archive__registry-value--mono"
                            : undefined
                        }
                      >
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {storyText ? (
          <section className="companion-archive__story">
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <h2 className="companion-archive__section-title">Story</h2>
              <div className="companion-archive__story-text">
                <StoryParagraphs text={storyText} />
              </div>
            </div>
          </section>
        ) : null}

        {specialMemoryText ? (
          <section className="companion-archive__story">
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <h2 className="companion-archive__section-title">Special Memory</h2>
              <p className="companion-archive__story-text">{specialMemoryText}</p>
            </div>
          </section>
        ) : null}

        {favoriteThings.length > 0 ? (
          <section className="companion-archive__story">
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <h2 className="companion-archive__section-title">Favorite Things</h2>
              <ul className="companion-archive__story-text list-disc pl-5">
                {favoriteThings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="companion-archive__footer-meta">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="companion-archive__footer-grid">
              <div>
                <p className="companion-archive__footer-label">Archive Collection</p>
                <p className="companion-archive__footer-value">{eraLabel}</p>
              </div>
              <div>
                <p className="companion-archive__footer-label">Registry Date</p>
                <p className="companion-archive__footer-value">{record.kingdomSince}</p>
              </div>
              <div>
                <p className="companion-archive__footer-label">Preserved Within</p>
                <p className="companion-archive__footer-value">The Registry</p>
              </div>
            </div>
          </div>
        </section>

        <div className="companion-archive__actions mx-auto max-w-6xl px-6 md:px-10">
          <Link href="/hall" className="companion-archive__back">
            Back To Registry Hall
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
