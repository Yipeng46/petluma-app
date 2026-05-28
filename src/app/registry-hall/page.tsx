"use client";

import { useMemo, useState } from "react";
import { ArchiveCard } from "@/components/registry-hall/ArchiveCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  filterRegistryHallRecords,
  registryHallRecords,
  type RegistryHallFilter,
} from "@/lib/registry-hall-mock";
import "@/styles/registry-hall.css";

const filters: { label: string; value: RegistryHallFilter }[] = [
  { label: "All", value: "all" },
  { label: "Canine", value: "canine" },
  { label: "Feline", value: "feline" },
  { label: "Other", value: "other" },
];

export default function RegistryHallPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RegistryHallFilter>("all");

  const visibleRecords = useMemo(
    () => filterRegistryHallRecords(registryHallRecords, query, activeFilter),
    [query, activeFilter],
  );

  return (
    <div className="registry-hall registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative z-10 px-6 py-14 text-[#2e2820] md:px-10 md:py-20 lg:py-24">
        <div className="hall-animate-in mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-[#8a7349]">
              PetLuma Kingdom Registry
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-medium tracking-tight text-[#2e2820] md:text-5xl lg:text-[3.25rem]">
              The Registry Hall
            </h1>
            <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl text-[#5c5348] md:text-2xl">
              Kingdom Archive of Registered Companions
            </p>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] text-[#6b6358]">
              A quiet public archive of companions whose guardians have chosen to share
              their official Kingdom identity.
            </p>
          </header>

          <div className="registry-hall-cabinet relative z-10 mx-auto mt-14 max-w-6xl rounded-sm px-5 py-8 md:mt-16 md:px-10 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <label className="block w-full md:max-w-md">
                <span className="sr-only">Search by Companion ID or Name</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by Companion ID or Name"
                  className="hall-search w-full px-4 py-3 font-sans text-sm text-[#2e2820] placeholder:text-[#8a8278]"
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
                    className={`filter-pill px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] ${
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

            {visibleRecords.length === 0 ? (
              <p className="mt-14 text-center font-sans text-sm text-[#6b6358]">
                No companions match your search within the public archive.
              </p>
            ) : (
              <div className="relative z-10 mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleRecords.map((record) => (
                  <ArchiveCard key={record.companionId} record={record} />
                ))}
              </div>
            )}
          </div>

          <p className="relative z-10 mx-auto mt-14 max-w-2xl text-center font-sans text-[12px] leading-[1.85] text-[#6b6358] md:mt-16">
            Only companions with guardian consent are shown here. Private records remain
            sealed within the Kingdom Registry.
          </p>
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
