import Image from "next/image";
import Link from "next/link";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";

type ArchiveCardProps = {
  record: RegistryHallRecord;
};

export function ArchiveCard({ record }: ArchiveCardProps) {
  return (
    <article className="archive-card flex flex-col overflow-hidden">
      <div className="wood-frame px-3 pb-2 pt-3">
        <div className="archive-card-photo relative aspect-[4/5] overflow-hidden bg-kingdom-parchment">
          <Image
            src={record.photoUrl}
            alt={`${record.name}, registered companion`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(46,40,32,0.12)_100%)]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-kingdom-gold-dark">
          {record.companionId}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-kingdom-ink">
          {record.name}
        </h2>
        <p className="mt-2 font-sans text-[13px] text-kingdom-ink-muted">
          {record.species}
          <span className="mx-2 text-kingdom-gold/60">·</span>
          {record.breed}
        </p>
        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-kingdom-warm-gray">
          Kingdom Since
        </p>
        <p className="mt-1 font-sans text-sm text-kingdom-ink">{record.kingdomSince}</p>

        <Link
          href={`/verify/${encodeURIComponent(record.passportNo)}`}
          className="mt-6 inline-flex self-start border border-kingdom-ink/20 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-kingdom-ink transition-colors duration-500 hover:border-kingdom-ink/35 hover:bg-kingdom-ivory"
        >
          View Archive
        </Link>
      </div>
    </article>
  );
}
