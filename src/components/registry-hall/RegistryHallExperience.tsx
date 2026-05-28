"use client";

import { useMemo, useState } from "react";
import { ArchiveCard } from "@/components/registry-hall/ArchiveCard";
import {
  filterRegistryHallRecords,
  registryHallRecords,
  type RegistryHallFilter,
} from "@/lib/registry-hall-mock";

const filters: { label: string; value: RegistryHallFilter }[] = [
  { label: "All", value: "all" },
  { label: "Canine", value: "canine" },
  { label: "Feline", value: "feline" },
  { label: "Other", value: "other" },
];

export function RegistryHallExperience() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RegistryHallFilter>("all");

  const visibleRecords = useMemo(
    () => filterRegistryHallRecords(registryHallRecords, query, activeFilter),
    [query, activeFilter],
  );

  return (
    <div className="opacity-0-start animate-fade-in">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-kingdom-gold-dark">
          PetLuma Kingdom Registry
        </p>
        <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-kingdom-ink md:text-5xl lg:text-[3.25rem]">
          The Registry Hall
        </h1>
        <p className="mt-4 font-display text-xl text-kingdom-brown md:text-2xl">
          Kingdom Archive of Registered Companions
        </p>
        <p className="mx-auto mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] text-kingdom-ink-muted">
          A quiet public archive of companions whose guardians have chosen to share their
          official Kingdom identity.
        </p>
      </header>

      <div className="registry-hall-cabinet mx-auto mt-14 max-w-6xl rounded-sm px-5 py-8 md:mt-16 md:px-10 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <label className="block w-full md:max-w-md">
            <span className="sr-only">Search by Companion ID or Name</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by Companion ID or Name"
              className="hall-search w-full px-4 py-3 font-sans text-sm text-kingdom-ink placeholder:text-kingdom-warm-gray"
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
                    : "text-kingdom-ink-muted"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {visibleRecords.length === 0 ? (
          <p className="mt-14 text-center font-sans text-sm text-kingdom-ink-muted">
            No companions match your search within the public archive.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleRecords.map((record, index) => (
              <div
                key={record.companionId}
                className="opacity-0-start animate-fade-in"
                style={{ animationDelay: `${0.05 + index * 0.04}s` }}
              >
                <ArchiveCard record={record} />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center font-sans text-[12px] leading-[1.85] text-kingdom-ink-muted md:mt-16">
        Only companions with guardian consent are shown here. Private records remain sealed
        within the Kingdom Registry.
      </p>
    </div>
  );
}
