"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PassportSVG } from "@/components/PassportSVG";
import { useStoredCompanionCard } from "@/hooks/useStoredCompanionCard";
import { exportPassportSvgToPng } from "@/lib/passport-svg-export";

export function ResultExperience() {
  const passportData = useStoredCompanionCard();
  const [duplicateNotice, setDuplicateNotice] = useState<string | null>(null);
  const [cloudSyncNotice, setCloudSyncNotice] = useState<string | null>(null);
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const svgRef = useRef<SVGSVGElement>(null);
  const passportNo = passportData.passportNo.trim();
  const verifyHref = passportNo
    ? `/verify/${encodeURIComponent(passportNo)}`
    : null;

  useEffect(() => {
    const notice = sessionStorage.getItem("petluma-passport-duplicate-notice");

    if (notice) {
      setDuplicateNotice(notice);
      sessionStorage.removeItem("petluma-passport-duplicate-notice");
    }

    const syncNotice = sessionStorage.getItem("petluma-cloud-sync-notice");

    if (syncNotice) {
      setCloudSyncNotice(syncNotice);
      sessionStorage.removeItem("petluma-cloud-sync-notice");
    }

    const syncError = sessionStorage.getItem("petluma-cloud-sync-error");

    if (syncError) {
      setCloudSyncError(syncError);
      sessionStorage.removeItem("petluma-cloud-sync-error");
    }
  }, []);

  async function handleCopyVerifyLink() {
    if (!passportNo || typeof window === "undefined") {
      return;
    }

    const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(passportNo)}`;

    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Copy verify link failed:", error);
    }
  }

  async function handleDownloadPassport() {
    if (!svgRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const filename = `petluma-passport-${passportData.name?.trim() || "result"}.png`;
      await exportPassportSvgToPng(svgRef.current, filename);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(199,161,95,0.28),transparent_28rem),linear-gradient(135deg,#f8f0e4_0%,#efe0cb_54%,#f7efe3_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-[#c7a15f]/20" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 rounded-full bg-[#2f2119]/5 blur-3xl" />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col items-center justify-center gap-8">
        <div className="max-w-3xl text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#9b7b45]">
            PetLuma Passport
          </p>
          <h1 className="pet-serif mt-5 text-5xl font-normal tracking-[-0.07em] text-[#2f2119] sm:text-7xl">
            Your companion passport is ready.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6f5b4b] sm:text-lg sm:leading-8">
            An official PetLuma identity document for your beloved companion.
          </p>
        </div>

        <div className="w-full max-w-6xl">
          {duplicateNotice ? (
            <div className="mb-4 rounded-2xl border border-[#c7a15f]/35 bg-[#fff8eb] px-5 py-4 text-center text-sm leading-6 text-[#6f5b4b]">
              {duplicateNotice}
            </div>
          ) : null}
          {cloudSyncNotice ? (
            <div className="mb-4 rounded-2xl border border-[#c7a15f]/35 bg-[#fff8eb] px-5 py-4 text-center text-sm leading-6 text-[#6f5b4b]">
              {cloudSyncNotice}
              {cloudSyncError ? (
                <p className="mt-2">Cloud sync failed: {cloudSyncError}</p>
              ) : null}
            </div>
          ) : null}
          <PassportSVG ref={svgRef} passportData={passportData} />
        </div>

        <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={handleDownloadPassport}
            disabled={isDownloading}
            className="rounded-full bg-[#2f2119] px-7 py-3.5 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f] disabled:cursor-wait disabled:opacity-70"
          >
            {isDownloading ? "Preparing..." : "Download Passport"}
          </button>
          {verifyHref ? (
            <Link
              href={verifyHref}
              className="rounded-full border border-[#08182b]/15 bg-[#08182b] px-7 py-3.5 text-center text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(8,24,43,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0a2038]"
            >
              Verify Passport
            </Link>
          ) : null}
          {passportNo ? (
            <button
              type="button"
              onClick={handleCopyVerifyLink}
              className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
            >
              {copyState === "copied" ? "Link Copied" : "Copy Verify Link"}
            </button>
          ) : null}
          <Link
            href="/create"
            className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
          >
            Create Another Passport
          </Link>
        </div>
      </section>
    </main>
  );
}
