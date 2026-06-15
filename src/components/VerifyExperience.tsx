"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  displayBreed,
  displayGender,
  displaySpecies,
} from "@/lib/display-normalization";
import {
  findPassportByNumberWithFallback,
  type RegistryRecord,
} from "@/lib/registry";

function formatRegistryDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date(iso))
      .replace(/\//g, "-");
  } catch {
    return iso;
  }
}

function formatVerificationTimestamp(iso: string) {
  try {
    const date = new Date(iso);
    const datePart = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    })
      .format(date)
      .replace(/\//g, "-");
    const timePart = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);

    return `${datePart} ${timePart} UTC`;
  } catch {
    return iso;
  }
}

function deriveDigitalRegistryId(passportNo: string) {
  let hash = 0;

  for (let index = 0; index < passportNo.length; index += 1) {
    hash = (hash * 31 + passportNo.charCodeAt(index)) >>> 0;
  }

  return `PLM-REGISTRY-${hash.toString(16).toUpperCase().slice(0, 6).padStart(6, "0")}`;
}

function VerifyShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="verify-page relative min-h-screen overflow-x-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="verify-page__backdrop pointer-events-none absolute inset-0" />
      <div className="verify-page__paper-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-[#c7a15f]/15" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 rounded-full bg-[#111827]/4 blur-3xl" />

      <section className="verify-page__content relative mx-auto flex w-full max-w-2xl min-w-0 flex-col items-center justify-center gap-8 py-6 sm:gap-10 sm:py-10">
        {children}
      </section>
    </main>
  );
}

function VerifyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="verify-field min-w-0 border-b border-[#e6ded2]/80 py-3.5 last:border-b-0 sm:py-4">
      <p className="verify-field__label text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#9b7b45] sm:text-[0.62rem]">
        {label}
      </p>
      <p className="verify-field__value mt-1.5 break-words text-[0.82rem] font-medium uppercase tracking-[0.04em] text-[#2f2119] sm:mt-2 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function VerifyMetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="verify-meta-field min-w-0 py-3 sm:py-3.5">
      <p className="text-[0.52rem] font-medium uppercase tracking-[0.32em] text-[#9a958c] sm:text-[0.54rem]">
        {label}
      </p>
      <p className="mt-2 break-words text-[0.72rem] font-normal uppercase tracking-[0.08em] text-[#6f6a62] sm:text-xs">
        {value}
      </p>
    </div>
  );
}

function OfficialRegistryStamp() {
  return (
    <div className="verify-official-stamp pointer-events-none absolute bottom-5 right-4 sm:bottom-7 sm:right-6" aria-hidden="true">
      <svg
        viewBox="0 0 180 180"
        className="verify-official-stamp__svg h-[7.5rem] w-[7.5rem] sm:h-[8.5rem] sm:w-[8.5rem]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="90" cy="90" r="78" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="90" cy="90" r="68" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" />
        <text
          x="90"
          y="72"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontWeight="500"
          letterSpacing="0.28em"
        >
          PETLUMA
        </text>
        <text
          x="90"
          y="92"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontWeight="400"
          letterSpacing="0.18em"
        >
          REGISTRY OFFICE
        </text>
        <text
          x="90"
          y="112"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontWeight="500"
          letterSpacing="0.24em"
        >
          VERIFIED
        </text>
      </svg>
    </div>
  );
}

function VerifyPortrait({ record }: { record: RegistryRecord }) {
  const initial = record.petName.trim().charAt(0).toUpperCase() || "P";

  return (
    <div className="verify-portrait-wrap mb-6 flex justify-center sm:mb-7">
      {record.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={record.photoUrl}
          alt=""
          className="verify-portrait verify-portrait--photo"
        />
      ) : (
        <div className="verify-portrait verify-portrait--placeholder" aria-hidden="true">
          <span>{initial}</span>
        </div>
      )}
    </div>
  );
}

function VerifiedView({ record }: { record: RegistryRecord }) {
  const digitalRegistryId = deriveDigitalRegistryId(record.passportNo);

  return (
    <VerifyShell>
      <div className="verify-page-enter w-full min-w-0 max-w-full text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#9b7b45] sm:text-[0.68rem]">
          PetLuma Registry
        </p>
        <h1 className="pet-serif mt-4 text-[2rem] font-normal uppercase tracking-[0.08em] text-[#2f2119] sm:mt-5 sm:text-5xl">
          Verified Passport
        </h1>
      </div>

      <div className="verify-page-enter verify-card relative mx-auto w-full min-w-0 max-w-full overflow-hidden rounded-[22px] border border-[#c7a15f]/30 bg-[#fffaf1]/92 p-4 shadow-[0_22px_60px_rgba(47,33,25,0.08)] backdrop-blur-[2px] sm:max-w-[calc(100%-1.5rem)] sm:rounded-[26px] sm:p-8">
        <div className="verify-status-bar verify-status-bar--ready mb-5 rounded-[14px] px-4 py-3.5 sm:mb-6 sm:rounded-[16px] sm:px-5 sm:py-4">
          <p className="flex items-center justify-center gap-2.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#f8f4eb] sm:text-[0.68rem] sm:tracking-[0.24em]">
            <span className="verify-status-bar__icon text-[0.72rem] leading-none sm:text-sm" aria-hidden="true">
              ✓
            </span>
            <span>Verified in Global PetLuma Registry</span>
          </p>
        </div>

        <p className="mb-5 text-center text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#9b7b45] sm:mb-6 sm:text-[0.62rem]">
          Verified Passport
        </p>

        <VerifyPortrait record={record} />

        <div className="verify-fields relative z-[1] min-w-0 max-w-full pr-2 sm:pr-4">
          <VerifyField label="Passport No." value={record.passportNo} />
          <VerifyField label="Companion ID" value={record.companionId} />
          <VerifyField label="Pet Name" value={record.petName} />
          <VerifyField label="Species" value={displaySpecies(record.species)} />
          <VerifyField label="Breed" value={displayBreed(record.breed) || "—"} />
          <VerifyField label="Gender" value={displayGender(record.gender)} />
          <VerifyField label="Date of Birth" value={record.dateOfBirth || "—"} />
        </div>

        <div className="verify-metadata relative z-[1] mt-6 border-t border-[#e6ded2]/70 pt-2 sm:mt-8 sm:pt-3">
          <div className="grid gap-1 sm:grid-cols-2 sm:gap-x-8">
            <VerifyMetaField
              label="Registered At"
              value={formatRegistryDate(record.createdAt)}
            />
            <VerifyMetaField
              label="Verification Status"
              value={record.status.toUpperCase()}
            />
            <VerifyMetaField
              label="Digital Registry ID"
              value={digitalRegistryId}
            />
            <VerifyMetaField
              label="Verification Timestamp"
              value={formatVerificationTimestamp(record.updatedAt)}
            />
          </div>
        </div>

        <div className="verify-issued-by relative z-[1] mt-6 border-t border-[#ece5da]/80 pt-5 sm:mt-7 sm:pt-6">
          <p className="text-[0.5rem] font-medium uppercase tracking-[0.34em] text-[#a39d94]">
            Issued By
          </p>
          <p className="mt-2 text-[0.62rem] font-normal uppercase tracking-[0.2em] text-[#7a746b] sm:text-[0.64rem]">
            PetLuma Registry Office
          </p>
        </div>

        <OfficialRegistryStamp />
      </div>

      <Link
        href="/"
        className="verify-page-enter rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
      >
        Back to Home
      </Link>
    </VerifyShell>
  );
}

function NotFoundView({ passportNo }: { passportNo: string }) {
  return (
    <VerifyShell>
      <div className="verify-page-enter w-full min-w-0 max-w-full text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#9b7b45] sm:text-[0.68rem]">
          PetLuma Registry
        </p>
        <h1 className="pet-serif mt-4 text-[2rem] font-normal uppercase tracking-[0.08em] text-[#2f2119] sm:mt-5 sm:text-5xl">
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
        className="verify-page-enter rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
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
    let active = true;

    void findPassportByNumberWithFallback(passportNo).then((result) => {
      if (active) {
        setRecord(result);
      }
    });

    return () => {
      active = false;
    };
  }, [passportNo]);

  if (record === undefined) {
    return (
      <VerifyShell>
        <div className="verify-page-enter w-full min-w-0 text-center">
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
