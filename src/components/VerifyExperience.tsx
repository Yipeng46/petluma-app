"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  findPassportByNumber,
  type RegistryRecord,
} from "@/lib/registry";

function formatRegistryDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function VerifyShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(199,161,95,0.28),transparent_28rem),linear-gradient(135deg,#f8f0e4_0%,#efe0cb_54%,#f7efe3_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-[#c7a15f]/20" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 rounded-full bg-[#08182b]/5 blur-3xl" />

      <section className="relative mx-auto flex w-full max-w-2xl min-w-0 flex-col items-center justify-center gap-8 py-8">
        {children}
      </section>
    </main>
  );
}

function VerifyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-[#e6ded2]/80 py-4 last:border-b-0">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45]">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-medium uppercase tracking-[0.04em] text-[#2f2119] sm:text-base">
        {value}
      </p>
    </div>
  );
}

function VerifiedView({ record }: { record: RegistryRecord }) {
  return (
    <VerifyShell>
      <div className="w-full min-w-0 max-w-full text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#9b7b45]">
          PetLuma Registry
        </p>
        <h1 className="pet-serif mt-5 text-4xl font-normal uppercase tracking-[0.08em] text-[#2f2119] sm:text-5xl">
          Verified Passport
        </h1>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[24px] border border-[#c7a15f]/35 bg-[#fffaf1]/88 p-5 shadow-[0_22px_60px_rgba(47,33,25,0.1)] backdrop-blur sm:p-8">
        <div className="mb-6 rounded-2xl border border-[#08182b]/10 bg-[#08182b] px-5 py-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8eb]">
            ✓ Verified in PetLuma Registry
          </p>
        </div>

        <p className="mb-6 text-center text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#9b7b45]">
          Verified Passport
        </p>

        <div className="min-w-0 max-w-full">
          <VerifyField label="Passport No." value={record.passportNo} />
          <VerifyField label="Companion ID" value={record.companionId} />
          <VerifyField label="Pet Name" value={record.petName} />
          <VerifyField label="Species" value={record.species} />
          <VerifyField label="Breed" value={record.breed || "—"} />
          <VerifyField label="Gender" value={record.gender} />
          <VerifyField label="Date of Birth" value={record.dateOfBirth || "—"} />
          <VerifyField
            label="Registry Status"
            value={record.status.toUpperCase()}
          />
          <VerifyField
            label="Created At"
            value={formatRegistryDate(record.createdAt)}
          />
        </div>
      </div>

      <Link
        href="/"
        className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
      >
        Back to Home
      </Link>
    </VerifyShell>
  );
}

function NotFoundView({ passportNo }: { passportNo: string }) {
  return (
    <VerifyShell>
      <div className="w-full min-w-0 max-w-full text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#9b7b45]">
          PetLuma Registry
        </p>
        <h1 className="pet-serif mt-5 text-4xl font-normal uppercase tracking-[0.08em] text-[#2f2119] sm:text-5xl">
          Passport Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6f5b4b] sm:text-base">
          This passport does not exist in the PetLuma Registry.
        </p>
        {passportNo ? (
          <p className="mx-auto mt-4 max-w-md break-all text-xs uppercase tracking-[0.12em] text-[#9b7b45]">
            {passportNo}
          </p>
        ) : null}
      </div>

      <Link
        href="/"
        className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
      >
        Back to Home
      </Link>
    </VerifyShell>
  );
}

export function VerifyExperience() {
  const params = useParams<{ passportNo: string }>();
  const passportNo = decodeURIComponent(params.passportNo ?? "");
  const [record, setRecord] = useState<RegistryRecord | null | undefined>(
    undefined,
  );

  useEffect(() => {
    setRecord(findPassportByNumber(passportNo));
  }, [passportNo]);

  if (record === undefined) {
    return (
      <VerifyShell>
        <div className="w-full min-w-0 text-center">
          <p className="text-sm text-[#6f5b4b]">Checking registry...</p>
        </div>
      </VerifyShell>
    );
  }

  if (!record) {
    return <NotFoundView passportNo={passportNo} />;
  }

  return <VerifiedView record={record} />;
}
