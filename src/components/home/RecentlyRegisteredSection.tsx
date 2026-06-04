import Image from "next/image";
import Link from "next/link";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";
import { RegistryButton } from "./ui";

const PORTRAIT_WIDTH = 280;
const PORTRAIT_HEIGHT = 350;

type RecentlyRegisteredCardProps = {
  record: RegistryHallRecord;
};

function RecentlyRegisteredCard({ record }: RecentlyRegisteredCardProps) {
  const archiveHref = `/companion/${encodeURIComponent(record.companionId)}`;

  return (
    <li className="registry-preview-card">
      <Link href={archiveHref} className="registry-preview-card__link">
        <div className="registry-preview-card__portrait">
          <Image
            src={record.photoUrl}
            alt={`Portrait of ${record.name}`}
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            sizes="(max-width: 1023px) 78vw, 16vw"
            className="registry-preview-card__image"
          />
        </div>

        <div className="registry-preview-card__body">
          <p className="registry-preview-card__id">{record.companionId}</p>
          <h3 className="registry-preview-card__name">{record.name}</h3>
          <p className="registry-preview-card__meta">
            {record.species}
            <span className="registry-preview-card__meta-sep" aria-hidden="true">
              ·
            </span>
            {record.breed}
          </p>
          <p className="registry-preview-card__since">
            <span className="registry-preview-card__since-label">Kingdom Since</span>
            <span className="registry-preview-card__since-value">{record.kingdomSince}</span>
          </p>
        </div>
      </Link>

      <Link href={archiveHref} className="registry-preview-card__action">
        View Archive
      </Link>
    </li>
  );
}

type RecentlyRegisteredSectionProps = {
  records: RegistryHallRecord[];
};

export function RecentlyRegisteredSection({ records }: RecentlyRegisteredSectionProps) {
  return (
    <section className="home-section recently-section">
      <div className="home-section__inner mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="home-section__title">Recently Registered</h2>

        {records.length === 0 ? (
          <div className="recently-section__empty">
            <p className="recently-section__empty-text">
              The Registry is waiting for its first public companions.
            </p>
            <div className="recently-section__empty-action">
              <RegistryButton href="/passport">Register A Companion</RegistryButton>
            </div>
          </div>
        ) : (
          <ul className="recently-section__grid">
            {records.map((record) => (
              <RecentlyRegisteredCard key={record.companionId} record={record} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
