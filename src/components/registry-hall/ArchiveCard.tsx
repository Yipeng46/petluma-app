import Image from "next/image";
import Link from "next/link";
import { displayBreed, displaySpecies } from "@/lib/display-normalization";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";

const PHOTO_WIDTH = 160;
const PHOTO_HEIGHT = 200;

type ArchiveCardProps = {
  record: RegistryHallRecord;
};

export function ArchiveCard({ record }: ArchiveCardProps) {
  return (
    <article className="archive-document relative z-10 w-[min(100%,15.5rem)]">
      <div className="archive-card relative flex flex-col">
        <div
          className="archive-official-stamp pointer-events-none absolute right-4 top-4 z-20 flex h-11 w-11 flex-col items-center justify-center rounded-full"
          aria-hidden
        >
          <span className="pl-caption text-[5px] leading-tight tracking-[0.1em]">
            PetLuma
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-[9px] leading-none">
            Kingdom
          </span>
        </div>

        <div className="archive-card-photo-frame px-4 pb-1 pt-4">
          <div className="archive-card-photo relative mx-auto overflow-hidden bg-[#ebe3d6]">
            {record.photoUrl ? (
              <Image
                src={record.photoUrl}
                alt={`${record.name}, registered companion`}
                width={PHOTO_WIDTH}
                height={PHOTO_HEIGHT}
                className="h-[200px] w-[160px] object-cover"
                sizes="160px"
                loading="lazy"
              />
            ) : (
              <div
                className="h-[200px] w-[160px]"
                role="img"
                aria-label={`Portrait placeholder for ${record.name}`}
              />
            )}
          </div>
        </div>

        <div className="archive-card-body flex flex-1 flex-col px-5 pb-6 pt-4">
          <p className="pl-caption">{record.companionId}</p>
          <h2 className="archive-card__name pl-card-title mt-2">{record.name}</h2>
          <p className="pl-small mt-2">
            {displaySpecies(record.species)}
            <span className="mx-2 text-[#b89a6a]">·</span>
            {displayBreed(record.breed)}
          </p>
          <div className="mt-4 border-t border-[#2e2820]/8 pt-4">
            <p className="pl-caption text-[#8a8278]">Kingdom Since</p>
            <p className="pl-small mt-1 text-[#2e2820]">{record.kingdomSince}</p>
          </div>

          <Link
            href={`/companion/${encodeURIComponent(record.companionId)}`}
            className="pl-btn relative z-10 mt-5 inline-flex self-start border border-[#2e2820]/18 px-4 py-2 text-[#2e2820] transition-colors duration-300 hover:border-[#2e2820]/32 hover:bg-[#faf6f0]/80"
          >
            View Archive
          </Link>
        </div>
      </div>
    </article>
  );
}
