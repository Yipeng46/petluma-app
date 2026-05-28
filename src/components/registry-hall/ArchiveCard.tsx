import Image from "next/image";
import Link from "next/link";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";

type ArchiveCardProps = {
  record: RegistryHallRecord;
};

export function ArchiveCard({ record }: ArchiveCardProps) {
  return (
    <article className="archive-card relative z-10 flex flex-col overflow-hidden">
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
        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8a7349]">
          {record.companionId}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl font-medium tracking-tight text-[#2e2820]">
          {record.name}
        </h2>
        <p className="mt-2 font-sans text-[13px] text-[#6b6358]">
          {record.species}
          <span className="mx-2 text-[#b89a6a]">·</span>
          {record.breed}
        </p>
        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
          Kingdom Since
        </p>
        <p className="mt-1 font-sans text-sm text-[#2e2820]">{record.kingdomSince}</p>

        <Link
          href={`/verify/${encodeURIComponent(record.passportNo)}`}
          className="relative z-10 mt-6 inline-flex self-start border border-[#2e2820]/25 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#2e2820] transition-colors duration-500 hover:border-[#2e2820]/40 hover:bg-[#f7f3eb]"
        >
          View Archive
        </Link>
      </div>
    </article>
  );
}
