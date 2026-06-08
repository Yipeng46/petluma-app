"use client";

import { useMemo, useState } from "react";
import { ArchiveCard } from "@/components/registry-hall/ArchiveCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  filterRegistryHallRecords,
  type RegistryHallFilter,
  type RegistryHallRecord,
} from "@/lib/registry-hall-mock";

const filters: { label: string; value: RegistryHallFilter }[] = [
  { label: "All", value: "all" },
  { label: "Canine", value: "canine" },
  { label: "Feline", value: "feline" },
  { label: "Other", value: "other" },
];

type RegistryHallArchivesProps = {
  communityRecords: RegistryHallRecord[];
};

function RegistryCollectionGrid({
  records,
  emptyMessage,
}: {
  records: RegistryHallRecord[];
  emptyMessage: string;
}) {
  if (records.length === 0) {
    return <p className="pl-small registry-hall__section-empty">{emptyMessage}</p>;
  }

  return (
    <div className="archive-desk relative z-10 mt-10">
      {records.map((record) => (
        <ArchiveCard key={record.companionId} record={record} />
      ))}
    </div>
  );
}

export function RegistryHallArchives({ communityRecords }: RegistryHallArchivesProps) {
  const [archivesEntered, setArchivesEntered] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RegistryHallFilter>("all");

  const visibleRecords = useMemo(
    () => filterRegistryHallRecords(communityRecords, query, activeFilter),
    [communityRecords, query, activeFilter],
  );

  return (
    <div className="registry-hall min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative z-10 px-6 py-14 text-[#2e2820] md:px-10 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {!archivesEntered ? (
            <section className="hall-intro mx-auto flex min-h-[calc(100svh-12rem)] max-w-2xl flex-col items-center justify-center text-center">
              <p className="pl-caption">PetLuma Kingdom Registry</p>
              <h1 className="pl-section-title hall-intro__title">The Registry Hall</h1>
              <p className="pl-body mx-auto max-w-lg hall-intro__lead">
                A public archive of companions preserved within the Kingdom.
              </p>
              <button
                type="button"
                onClick={() => setArchivesEntered(true)}
                className="pl-btn hall-intro__cta border border-kingdom-ink bg-kingdom-ink px-7 py-3 text-kingdom-cream transition-colors duration-500 hover:bg-kingdom-brown"
              >
                Enter the Archives
              </button>
            </section>
          ) : (
            <>
              <header className="hall-header-in mx-auto max-w-3xl text-center">
                <p className="pl-caption">PetLuma Kingdom Registry</p>
                <h1
                  id="registry-hall-heading"
                  className="pl-section-title hall-header-in__title"
                >
                  The Registry Hall
                </h1>
                <p className="pl-body mx-auto max-w-2xl hall-header-in__lead">
                  A public archive of companions preserved within the Kingdom.
                </p>
              </header>

              <section
                className="registry-hall__section registry-hall__section--community"
                aria-labelledby="registry-hall-heading"
              >
                <div className="registry-hall-cabinet relative z-10 mx-auto mt-10 max-w-6xl rounded-sm px-5 py-8 md:px-10 md:py-12">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <label className="block w-full md:max-w-md">
                      <span className="sr-only">Search by Companion ID or Name</span>
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by Companion ID or Name"
                        className="hall-search w-full px-4 py-3 text-[#2e2820] placeholder:text-[#8a8278]"
                      />
                    </label>

                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Filter by species"
                    >
                      {filters.map((filter) => (
                        <button
                          key={filter.value}
                          type="button"
                          onClick={() => setActiveFilter(filter.value)}
                          className={`filter-pill pl-btn px-4 py-2 ${
                            activeFilter === filter.value
                              ? "filter-pill--active"
                              : "text-[#6b6358]"
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {communityRecords.length === 0 ? (
                    <p className="pl-small registry-hall__section-empty">
                      Companion archives will appear here when guardians choose to share
                      them publicly.
                    </p>
                  ) : (
                    <RegistryCollectionGrid
                      records={visibleRecords}
                      emptyMessage="No companions match your search in the Registry Hall."
                    />
                  )}
                </div>
              </section>

              <p className="pl-small relative z-10 mx-auto mt-14 max-w-2xl text-center md:mt-16">
                Only companions shared with guardian consent are displayed here. Private
                records remain preserved within the Kingdom archives.
              </p>
            </>
          )}
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
