"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  buildLibraryShelfRows,
  getRecordSpineStyle,
  registryLibraryRecords,
  type DecorativeVolume,
  type RegistryLibraryRecord,
  type ShelfVolume,
} from "@/lib/registry-library-mock";
import "@/styles/registry-library.css";

function shortenCompanionId(id: string) {
  const parts = id.split("-");
  return parts.length >= 4 ? `PK-${parts[2]}-${parts[3]}` : id;
}

function spineVariantClass(variant: DecorativeVolume["variant"]) {
  return `archive-spine--variant-${variant}`;
}

type ArchiveSpineProps = {
  record: RegistryLibraryRecord;
  recordIndex: number;
  onSelect: (id: string) => void;
};

function ArchiveSpine({ record, recordIndex, onSelect }: ArchiveSpineProps) {
  const metrics = getRecordSpineStyle(recordIndex);

  return (
    <motion.button
      type="button"
      layoutId={`volume-${record.companionId}`}
      onClick={() => onSelect(record.companionId)}
      className={`archive-spine archive-spine--interactive group relative flex flex-col items-center justify-between px-1 py-3.5 ${spineVariantClass(metrics.variant)}`}
      style={{ height: `${metrics.heightRem}rem`, width: `${metrics.widthRem}rem` }}
      aria-label={`Open archive for ${record.name}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      <span className="spine-crest flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-cormorant)] text-[9px]">
        PL
      </span>
      <span
        className="spine-id max-h-20 flex-shrink-0 font-sans text-[6px] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {shortenCompanionId(record.companionId)}
      </span>
      <span
        className="spine-name flex-1 font-[family-name:var(--font-cormorant)] text-[11px] tracking-[0.06em]"
        style={{ writingMode: "vertical-rl" }}
      >
        {record.name}
      </span>
    </motion.button>
  );
}

function DecorativeSpine({ volume }: { volume: DecorativeVolume }) {
  const labelVariants = ["REG", "ARC", "VOL", "PK", "IX"];

  return (
    <div
      aria-hidden
      className={`archive-spine archive-spine--decorative relative flex flex-col items-center justify-between px-0.5 py-3 ${spineVariantClass(volume.variant)}`}
      style={{ height: `${volume.heightRem}rem`, width: `${volume.widthRem}rem` }}
    >
      <span className="spine-crest flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-cormorant)] text-[8px] opacity-70">
        PL
      </span>
      <span
        className="spine-label-muted max-h-16 flex-shrink-0 font-sans text-[5px] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {labelVariants[volume.variant]}
      </span>
      <span
        className="spine-label-muted flex-1 font-[family-name:var(--font-cormorant)] text-[9px] opacity-60"
        style={{ writingMode: "vertical-rl" }}
      >
        ·
      </span>
    </div>
  );
}

type OpenArchiveVolumeProps = {
  record: RegistryLibraryRecord;
  onClose: () => void;
  useSharedLayout: boolean;
};

function OpenArchiveVolume({ record, onClose, useSharedLayout }: OpenArchiveVolumeProps) {
  return (
    <>
      <motion.button
        type="button"
        aria-label="Close archive"
        className="fixed inset-0 z-40 cursor-default bg-[#080604]/62 backdrop-blur-[8px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 py-10 sm:px-6">
        <motion.div
          layoutId={useSharedLayout ? `volume-${record.companionId}` : undefined}
          initial={useSharedLayout ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={useSharedLayout ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
          className="open-volume-shell pointer-events-auto relative w-[min(94vw,760px)] overflow-hidden rounded-[2px]"
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 border border-[#2e2820]/18 bg-[#faf6f0]/80 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#2e2820] backdrop-blur-sm transition-colors hover:border-[#2e2820]/32 hover:bg-[#faf6f0]"
          >
            Close
          </button>

          <motion.div
            className="grid md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.5, ease: "easeOut" }}
          >
            <div className="open-volume-page open-volume-page-left relative p-6 md:p-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8a7349]">
                Kingdom Archive · Photograph
              </p>
              <div className="open-volume-photo-frame relative mx-auto mt-5 aspect-[4/5] max-w-[250px] overflow-hidden bg-[#ebe3d6]">
                <Image
                  src={record.photoUrl}
                  alt={record.name}
                  fill
                  className="object-cover"
                  sizes="250px"
                  priority
                />
              </div>
              <div className="mx-auto mt-6 flex max-w-[250px] items-center justify-between border-t border-[#2e2820]/10 pt-4">
                <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#8a7349]">
                  PetLuma Crest
                </p>
                <span className="spine-crest flex h-8 w-8 items-center justify-center rounded-full font-[family-name:var(--font-cormorant)] text-[10px]">
                  PL
                </span>
              </div>
            </div>

            <div className="open-volume-page relative p-6 md:p-8">
              <div className="open-volume-gutter pointer-events-none absolute bottom-6 left-0 top-6 hidden w-px md:block" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8a7349]">
                    Public Archive Record
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-[2rem] leading-tight text-[#2e2820] md:text-[2.15rem]">
                    {record.name}
                  </h2>
                  <p className="open-volume-id mt-2 font-sans text-[10px] uppercase">
                    {record.companionId}
                  </p>
                </div>

                <div
                  className="open-volume-stamp flex h-[4.5rem] w-[4.5rem] flex-shrink-0 flex-col items-center justify-center rounded-full text-center"
                  aria-hidden
                >
                  <span className="font-sans text-[6px] uppercase leading-tight tracking-[0.14em]">
                    PetLuma
                  </span>
                  <span className="mt-0.5 font-[family-name:var(--font-cormorant)] text-[11px] leading-none">
                    Kingdom
                  </span>
                  <span className="mt-1 font-sans text-[5px] uppercase tracking-[0.12em]">
                    Registry
                  </span>
                </div>
              </div>

              <dl className="mt-7 space-y-3.5 border-y border-[#2e2820]/10 py-5 font-sans text-sm text-[#2e2820]">
                <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">Name</dt>
                  <dd>{record.name}</dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                    Species
                  </dt>
                  <dd>{record.species}</dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">Breed</dt>
                  <dd>{record.breed}</dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                    Kingdom Since
                  </dt>
                  <dd>{record.kingdomSince}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                  Guardian Note
                </p>
                <p className="mt-3 font-sans text-[14px] leading-[1.85] text-[#6b6358]">
                  {record.guardianNote}
                </p>
              </div>

              <p className="mt-7 border-t border-[#2e2820]/10 pt-5 font-sans text-[11px] leading-relaxed text-[#8a8278]">
                Public record shared with guardian consent.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

function MobileArchiveCard({
  record,
  onSelect,
}: {
  record: RegistryLibraryRecord;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(record.companionId)}
      className="mobile-archive-card flex w-full items-center gap-4 rounded-[2px] p-4 text-left"
    >
      <div className="open-volume-photo-frame relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[#ebe3d6]">
        <Image
          src={record.photoUrl}
          alt={record.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="open-volume-id font-sans text-[9px] uppercase">{record.companionId}</p>
        <p className="mt-1 font-[family-name:var(--font-cormorant)] text-xl text-[#2e2820]">
          {record.name}
        </p>
        <p className="mt-1 font-sans text-xs text-[#6b6358]">
          {record.species} · {record.breed}
        </p>
      </div>
      <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#8a7349]">
        Open
      </span>
    </button>
  );
}

function BookshelfRow({
  volumes,
  selectedId,
  onSelect,
  recordIndexOffset,
}: {
  volumes: ShelfVolume[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  recordIndexOffset: number;
}) {
  let recordCursor = recordIndexOffset;

  return (
    <div className="library-shelf-wrap">
      <div className="library-shelf-cavity">
        <div className="library-shelf-back" aria-hidden />
        <div className="library-shelf-books">
          {volumes.map((volume) => {
            if (volume.kind === "decorative") {
              return <DecorativeSpine key={volume.volume.id} volume={volume.volume} />;
            }

            if (selectedId === volume.record.companionId) {
              recordCursor += 1;
              return null;
            }

            const index = recordCursor;
            recordCursor += 1;

            return (
              <ArchiveSpine
                key={volume.record.companionId}
                record={volume.record}
                recordIndex={index}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
      <div className="library-shelf-board" aria-hidden />
      <div className="library-shelf-lip" aria-hidden />
    </div>
  );
}

export function RegistryLibraryExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [useSharedLayout, setUseSharedLayout] = useState(false);
  const shelfRows = useMemo(() => buildLibraryShelfRows(registryLibraryRecords), []);
  const selectedRecord =
    registryLibraryRecords.find((record) => record.companionId === selectedId) ?? null;

  const close = useCallback(() => setSelectedId(null), []);

  const openFromSpine = useCallback((id: string) => {
    setUseSharedLayout(true);
    setSelectedId(id);
  }, []);

  const openFromMobile = useCallback((id: string) => {
    setUseSharedLayout(false);
    setSelectedId(id);
  }, []);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedId, close]);

  const recordOffsets = useMemo(() => {
    let offset = 0;
    return shelfRows.map((row) => {
      const current = offset;
      offset += row.filter((volume) => volume.kind === "record").length;
      return current;
    });
  }, [shelfRows]);

  return (
    <LayoutGroup>
      <div className="registry-library min-h-screen font-sans antialiased">
        <SiteHeader />

        <main className="relative z-10 px-5 pb-20 pt-32 text-[#f3ece1] md:px-10 md:pb-28 md:pt-36">
          <header className="mx-auto max-w-3xl text-center">
            <p className="library-header-eyebrow font-sans text-[10px] uppercase tracking-[0.34em]">
              PetLuma Kingdom Registry
            </p>
            <h1 className="library-header-title mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-medium tracking-tight md:text-[3.25rem]">
              The Registry Library
            </h1>
            <p className="library-header-subtitle mt-4 font-[family-name:var(--font-cormorant)] text-xl md:text-2xl">
              Every registered companion is preserved in the Kingdom Archive.
            </p>
            <p className="library-header-privacy mx-auto mt-5 max-w-xl font-sans text-[11px] leading-relaxed tracking-[0.04em]">
              Only public records shared with guardian consent are displayed.
            </p>
          </header>

          <motion.div
            className="relative mx-auto mt-12 max-w-[1400px] md:mt-16"
            animate={{
              filter: selectedId ? "blur(7px)" : "blur(0px)",
              opacity: selectedId ? 0.22 : 1,
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="hidden lg:block">
              {shelfRows.map((row, rowIndex) => (
                <BookshelfRow
                  key={`shelf-row-${rowIndex}`}
                  volumes={row}
                  selectedId={selectedId}
                  onSelect={openFromSpine}
                  recordIndexOffset={recordOffsets[rowIndex]}
                />
              ))}
            </div>

            <div className="space-y-3 lg:hidden">
              {registryLibraryRecords.map((record) => (
                <MobileArchiveCard
                  key={record.companionId}
                  record={record}
                  onSelect={openFromMobile}
                />
              ))}
            </div>
          </motion.div>
        </main>

        <SiteFooter />

        <AnimatePresence>
          {selectedRecord && selectedId ? (
            <OpenArchiveVolume
              record={selectedRecord}
              onClose={close}
              useSharedLayout={useSharedLayout}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
