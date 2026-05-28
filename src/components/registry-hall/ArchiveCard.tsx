import Image from "next/image";
import Link from "next/link";
import type { RegistryHallRecord } from "@/lib/registry-hall-mock";

type ArchiveCardProps = {
  record: RegistryHallRecord;
};

export function ArchiveCard({ record }: ArchiveCardProps) {
  return (
    <article className="archive-document archive-card relative z-10 flex w-[min(100%,15.5rem)] flex-col">
      <div
        className="archive-official-stamp pointer-events-none absolute right-4 top-4 z-20 flex h-11 w-11 flex-col items-center justify-center rounded-full"
        aria-hidden
      >
        <span className="font-sans text-[5px] uppercase leading-tight tracking-[0.1em]">PetLuma</span>
        <span className="font-[family-name:var(--font-cormorant)] text-[9px] leading-none">Kingdom</span>
      </div>

      <div className="archive-card-photo-frame px-4 pb-1 pt-4">
        <div className="archive-card-photo relative aspect-[4/5] overflow-hidden bg-[#ebe3d6]">
          <Image
            src={record.photoUrl}
            alt={`${record.name}, registered companion`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 248px"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgba(46,40,32,0.1)_100%)]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8a7349]">
          {record.companionId}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-[1.65rem] font-medium leading-tight tracking-tight text-[#2e2820]">
          {record.name}
        </h2>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#6b6358]">
          {record.species}
          <span className="mx-2 text-[#b89a6a]">·</span>
          {record.breed}
        </p>
        <div className="mt-4 border-t border-[#2e2820]/8 pt-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
            Kingdom Since
          </p>
          <p className="mt-1 font-sans text-sm text-[#2e2820]">{record.kingdomSince}</p>
        </div>

        <Link
          href={`/verify/${encodeURIComponent(record.passportNo)}`}
          className="relative z-10 mt-5 inline-flex self-start border border-[#2e2820]/18 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#2e2820] transition-colors duration-500 hover:border-[#2e2820]/32 hover:bg-[#faf6f0]/80"
        >
          View Archive
        </Link>
      </div>
    </article>
  );
}
