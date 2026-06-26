import Image from "next/image";
import Link from "next/link";
import type { KingdomCompanion } from "@/lib/guardian-server";

type KingdomCompanionCardProps = {
  companion: KingdomCompanion;
};

export function KingdomCompanionCard({ companion }: KingdomCompanionCardProps) {
  const archiveHref = `/companion/${encodeURIComponent(companion.companionId)}`;
  const passportHref = `/verify/${encodeURIComponent(companion.passportNo)}`;

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

        <div className="my-kingdom-card__actions">
          <Link href={archiveHref} className="my-kingdom-card__action">
            View Archive
          </Link>
          {companion.passportNo ? (
            <Link href={passportHref} className="my-kingdom-card__action my-kingdom-card__action--secondary">
              View Passport
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
