import Image from "next/image";
import Link from "next/link";
import type { KingdomCompanion } from "@/lib/guardian-server";

type KingdomCompanionCardProps = {
  companion: KingdomCompanion;
};

export function KingdomCompanionCard({ companion }: KingdomCompanionCardProps) {
  const archiveHref = `/companion/${encodeURIComponent(companion.companionId)}`;

  return (
    <article className="my-kingdom-card">
      <div className="my-kingdom-card__portrait">
        <Image
          src={companion.photoUrl}
          alt={`Portrait of ${companion.petName}`}
          fill
          sizes="(max-width: 767px) 100vw, 280px"
          className="my-kingdom-card__image"
        />
      </div>

      <div className="my-kingdom-card__body">
        <p className="my-kingdom-card__id">{companion.companionId}</p>
        <h2 className="my-kingdom-card__name">{companion.petName}</h2>

        <dl className="my-kingdom-card__meta">
          <div className="my-kingdom-card__meta-row">
            <dt className="my-kingdom-card__meta-label">Species</dt>
            <dd className="my-kingdom-card__meta-value">{companion.species}</dd>
          </div>
          <div className="my-kingdom-card__meta-row">
            <dt className="my-kingdom-card__meta-label">Breed</dt>
            <dd className="my-kingdom-card__meta-value">{companion.breed}</dd>
          </div>
          <div className="my-kingdom-card__meta-row">
            <dt className="my-kingdom-card__meta-label">Kingdom Since</dt>
            <dd className="my-kingdom-card__meta-value">{companion.kingdomSince}</dd>
          </div>
        </dl>

        <div className="my-kingdom-card__actions">
          <Link href={archiveHref} className="my-kingdom-card__action">
            View Archive
          </Link>
        </div>
      </div>
    </article>
  );
}
