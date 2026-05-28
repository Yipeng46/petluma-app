"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  registryLibraryRecords,
  splitLibraryShelves,
  type RegistryLibraryRecord,
} from "@/lib/registry-library-mock";
import "@/styles/registry-library.css";

function shortenCompanionId(id: string) {
  const parts = id.split("-");
  return parts.length >= 4 ? `PK-${parts[2]}-${parts[3]}` : id;
}

type ArchiveSpineProps = {
  record: RegistryLibraryRecord;
  onSelect: (id: string) => void;
};

function ArchiveSpine({ record, onSelect }: ArchiveSpineProps) {
  return (
    <motion.button
      type="button"
      layoutId={`volume-${record.companionId}`}
      onClick={() => onSelect(record.companionId)}
      className="archive-spine group relative flex h-52 w-11 flex-col items-center justify-between px-1.5 py-4 sm:h-56 sm:w-12"
      aria-label={`Open archive for ${record.name}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      <span className="spine-crest flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-cormorant)] text-[10px]">
        PL
      </span>
      <span
        className="spine-id max-h-24 flex-shrink-0 font-sans text-[7px] uppercase tracking-[0.18em]"
        style={{ writingMode: "vertical-rl" }}
      >
        {shortenCompanionId(record.companionId)}
      </span>
      <span
        className="spine-name flex-1 font-[family-name:var(--font-cormorant)] text-sm tracking-wide"
        style={{ writingMode: "vertical-rl" }}
      >
        {record.name}
      </span>
    </motion.button>
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
        className="fixed inset-0 z-40 cursor-default bg-[#1a1510]/50 backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6">
        <motion.div
          layoutId={useSharedLayout ? `volume-${record.companionId}` : undefined}
          initial={useSharedLayout ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={useSharedLayout ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
          className="open-volume-shell pointer-events-auto relative w-[min(92vw,720px)] overflow-hidden rounded-sm"
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 border border-[#2e2820]/15 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#2e2820] transition-colors hover:border-[#2e2820]/30 hover:bg-[#faf6f0]"
          >
            Close
          </button>

          <motion.div
            className="grid md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.5, ease: "easeOut" }}
          >
            <div className="open-volume-page border-b border-[#2e2820]/8 p-6 md:border-b-0 md:border-r md:p-8">
              <div className="relative mx-auto aspect-[4/5] max-w-[240px] overflow-hidden border border-[#b89a6a]/25 bg-[#ebe3d6]">
                <Image
                  src={record.photoUrl}
                  alt={record.name}
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>
              <p className="mt-6 text-center font-[family-name:var(--font-cormorant)] text-lg text-[#8a7349]">
                PetLuma Kingdom Crest
              </p>
            </div>

            <div className="open-volume-page relative p-6 md:p-8">
              <div className="open-volume-gutter pointer-events-none absolute bottom-6 left-0 top-6 hidden w-px md:block" />
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8a7349]">
                Public Archive Record
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl text-[#2e2820]">
                {record.name}
              </h2>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-[#6b6358]">
                {record.companionId}
              </p>

              <dl className="mt-8 space-y-4 font-sans text-sm text-[#2e2820]">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                    Species
                  </dt>
                  <dd className="mt-1">{record.species}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                    Breed
                  </dt>
                  <dd className="mt-1">{record.breed}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                    Kingdom Since
                  </dt>
                  <dd className="mt-1">{record.kingdomSince}</dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-[#2e2820]/10 pt-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#8a8278]">
                  Guardian Note
                </p>
                <p className="mt-3 font-sans text-[14px] leading-[1.85] text-[#6b6358]">
                  {record.guardianNote}
                </p>
              </div>

              <p className="mt-8 font-sans text-[11px] leading-relaxed text-[#8a8278]">
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
      className="mobile-archive-card flex w-full items-center gap-4 rounded-sm p-4 text-left"
    >
      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden border border-[#b89a6a]/20 bg-[#ebe3d6]">
        <Image
          src={record.photoUrl}
          alt={record.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#8a7349]">
          {record.companionId}
        </p>
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
  records,
  selectedId,
  onSelect,
}: {
  records: RegistryLibraryRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="library-shelf-unit rounded-sm px-4 pb-3 pt-5 sm:px-6">
      <div className="flex items-end justify-center gap-2 sm:gap-3">
        {records.map((record) =>
          selectedId === record.companionId ? null : (
            <ArchiveSpine key={record.companionId} record={record} onSelect={onSelect} />
          ),
        )}
      </div>
      <div className="library-shelf-board mt-3 h-2.5 w-full rounded-sm" />
    </div>
  );
}

export function RegistryLibraryExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [useSharedLayout, setUseSharedLayout] = useState(false);
  const { upperShelf, lowerShelf } = splitLibraryShelves(registryLibraryRecords);
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

  return (
    <LayoutGroup>
      <div className="registry-library registry-home min-h-screen font-sans antialiased">
        <SiteHeader />

        <main className="relative z-10 px-6 py-14 text-[#2e2820] md:px-10 md:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-[#8a7349]">
              PetLuma Kingdom Registry
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-medium tracking-tight md:text-5xl">
              The Registry Library
            </h1>
            <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl text-[#5c5348] md:text-2xl">
              Every registered companion is preserved in the Kingdom Archive.
            </p>
          </header>

          <motion.div
            className="mx-auto mt-14 max-w-5xl space-y-8 lg:mt-16"
            animate={{
              filter: selectedId ? "blur(5px)" : "blur(0px)",
              opacity: selectedId ? 0.32 : 1,
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="hidden lg:block">
              <BookshelfRow records={upperShelf} selectedId={selectedId} onSelect={openFromSpine} />
              <BookshelfRow records={lowerShelf} selectedId={selectedId} onSelect={openFromSpine} />
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
