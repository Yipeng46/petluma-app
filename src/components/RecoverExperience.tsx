"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { companionCardStorageKey } from "@/lib/cardStorage";
import { isValidEmail } from "@/lib/pet-identity";
import { parseCountryCodeFromCompanionId } from "@/lib/companion-id";
import type { PassportData } from "@/lib/passport-data";
import {
  findPassportsByOwnerEmailWithFallback,
  type RecoverPassportsResult,
  type RegistryRecord,
} from "@/lib/registry";

function formatCreatedAt(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function RecoverShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="verify-page relative min-h-screen overflow-x-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="verify-page__backdrop pointer-events-none absolute inset-0" />
      <div className="verify-page__paper-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-[#c7a15f]/15" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 rounded-full bg-[#111827]/4 blur-3xl" />

      <section className="verify-page__content relative mx-auto flex w-full max-w-3xl min-w-0 flex-col items-center gap-8 py-6 sm:gap-10 sm:py-10">
        {children}
      </section>
    </main>
  );
}

function registryRecordToPassportData(record: RegistryRecord): PassportData {
  return {
    ownerEmail: record.ownerEmail,
    photo: record.photoUrl ?? null,
    name: record.petName,
    breed: record.breed,
    gender: record.gender,
    birthdate: record.dateOfBirth,
    species: record.species,
    countryCode: parseCountryCodeFromCompanionId(record.companionId),
    placeOfOrigin: record.placeOfOrigin,
    passportNo: record.passportNo,
    companionId: record.companionId,
  };
}

function RecoverPassportCard({ record }: { record: RegistryRecord }) {
  const router = useRouter();
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const verifyHref = `/verify/${encodeURIComponent(record.passportNo)}`;

  async function handleCopyVerifyLink() {
    if (typeof window === "undefined") {
      return;
    }

    const verifyUrl = `${window.location.origin}${verifyHref}`;

    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Copy verify link failed:", error);
    }
  }

  function handleViewPassport() {
    localStorage.setItem(
      companionCardStorageKey,
      JSON.stringify(registryRecordToPassportData(record)),
    );
    router.push("/result");
  }

  return (
    <article className="recover-card verify-page-enter w-full min-w-0 rounded-[22px] border border-[#c7a15f]/30 bg-[#fffaf1]/92 p-4 shadow-[0_18px_50px_rgba(47,33,25,0.08)] backdrop-blur-[2px] sm:rounded-[26px] sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
            Pet Name
          </p>
          <p className="mt-1.5 text-sm font-medium uppercase tracking-[0.04em] text-[#2f2119]">
            {record.petName}
          </p>
        </div>
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
            Status
          </p>
          <p className="mt-1.5 text-sm font-medium uppercase tracking-[0.08em] text-[#2f2119]">
            {record.status}
          </p>
        </div>
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
            Passport No.
          </p>
          <p className="mt-1.5 break-all text-sm font-medium uppercase tracking-[0.04em] text-[#2f2119]">
            {record.passportNo}
          </p>
        </div>
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
            Companion ID
          </p>
          <p className="mt-1.5 break-all text-sm font-medium uppercase tracking-[0.04em] text-[#2f2119]">
            {record.companionId}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
            Created At
          </p>
          <p className="mt-1.5 text-sm font-medium tracking-[0.04em] text-[#2f2119]">
            {formatCreatedAt(record.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={handleViewPassport}
          className="rounded-full bg-[#2f2119] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[#fff8eb] shadow-[0_14px_36px_rgba(47,33,25,0.14)] transition hover:-translate-y-0.5 hover:bg-[#3a291f] sm:text-sm"
        >
          View Passport
        </button>
        <Link
          href={verifyHref}
          className="rounded-full border border-[#08182b]/15 bg-[#08182b] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[#fff8eb] shadow-[0_14px_36px_rgba(8,24,43,0.14)] transition hover:-translate-y-0.5 hover:bg-[#0a2038] sm:text-sm"
        >
          Verify Passport
        </Link>
        <button
          type="button"
          onClick={handleCopyVerifyLink}
          className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[#2f2119] shadow-[0_10px_30px_rgba(47,33,25,0.06)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1] sm:text-sm"
        >
          {copyState === "copied" ? "Link Copied" : "Copy Verify Link"}
        </button>
      </div>
    </article>
  );
}

export function RecoverExperience() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<RecoverPassportsResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();

    if (!trimmed || !isValidEmail(trimmed)) {
      setFormError("Please enter a valid owner email.");
      return;
    }

    setFormError(null);
    setIsSearching(true);
    setHasSearched(false);

    try {
      const lookup = await findPassportsByOwnerEmailWithFallback(trimmed);
      setResult(lookup);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <RecoverShell>
      <div className="verify-page-enter w-full min-w-0 text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#9b7b45] sm:text-[0.68rem]">
          PetLuma Registry
        </p>
        <h1 className="pet-serif mt-4 text-[2rem] font-normal uppercase tracking-[0.08em] text-[#2f2119] sm:mt-5 sm:text-5xl">
          Recover Passport
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6f5b4b] sm:text-base">
          Enter the owner email used during registration to retrieve passports
          linked to your account.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="verify-page-enter verify-card w-full min-w-0 rounded-[22px] border border-[#c7a15f]/30 bg-[#fffaf1]/92 p-4 shadow-[0_22px_60px_rgba(47,33,25,0.08)] backdrop-blur-[2px] sm:rounded-[26px] sm:p-8"
      >
        <label
          htmlFor="recover-owner-email"
          className="block text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45] sm:text-[0.62rem]"
        >
          Owner Email
        </label>
        <input
          id="recover-owner-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="owner@example.com"
          className="mt-3 w-full rounded-xl border border-[#e6ded2] bg-[#fffdf8] px-4 py-3 text-sm text-[#2f2119] outline-none ring-0 transition placeholder:text-[#a39d94] focus:border-[#c7a15f]/55"
        />
        {formError ? (
          <p className="mt-3 text-sm text-[#8b4a3a]">{formError}</p>
        ) : null}
        <button
          type="submit"
          disabled={isSearching}
          className="mt-5 w-full rounded-full bg-[#111827] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-[#fff8eb] shadow-[0_16px_42px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1E293B] disabled:cursor-wait disabled:opacity-70"
        >
          {isSearching ? "Searching Registry..." : "Recover Passports"}
        </button>
      </form>

      {hasSearched && result ? (
        <div className="verify-page-enter w-full min-w-0 space-y-4">
          {result.cloudError ? (
            <div className="rounded-2xl border border-[#c7a15f]/35 bg-[#fff8eb] px-5 py-4 text-center text-sm leading-6 text-[#6f5b4b]">
              Cloud registry unavailable. Showing locally saved passports.
            </div>
          ) : null}

          {result.records.length === 0 ? (
            <div className="verify-card rounded-[22px] border border-[#c7a15f]/30 bg-[#fffaf1]/92 px-5 py-8 text-center sm:rounded-[26px]">
              <p className="text-sm leading-7 text-[#6f5b4b]">
                No passports were found for this owner email in the PetLuma
                Registry.
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
                {result.records.length} passport
                {result.records.length === 1 ? "" : "s"} found
              </p>
              {result.records.map((record) => (
                <RecoverPassportCard key={record.passportNo} record={record} />
              ))}
            </>
          )}
        </div>
      ) : null}

      <Link
        href="/"
        className="verify-page-enter rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
      >
        Back to Home
      </Link>
    </RecoverShell>
  );
}
