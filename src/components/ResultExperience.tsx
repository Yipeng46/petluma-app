"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PassportPreviewDisclaimer } from "@/components/PassportPreviewDisclaimer";
import { PassportSVG } from "@/components/PassportSVG";
import { useStoredCompanionCard } from "@/hooks/useStoredCompanionCard";
import { displayBreed, displaySpecies } from "@/lib/display-normalization";
import { exportPassportSvgToPng } from "@/lib/passport-svg-export";

export function ResultExperience() {
  const passportData = useStoredCompanionCard();
  const [duplicateNotice, setDuplicateNotice] = useState<string | null>(null);
  const [cloudSyncNotice, setCloudSyncNotice] = useState<string | null>(null);
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPassportPreview, setShowPassportPreview] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const companionName = passportData.name?.trim() || "Your companion";
  const companionId = passportData.companionId.trim();
  const storyHref = companionId
    ? `/companion/${encodeURIComponent(companionId)}?editStory=1`
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

  async function handleDownloadPassport() {
    if (!svgRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const filename = `petluma-passport-${passportData.name?.trim() || "result"}.png`;
      await exportPassportSvgToPng(svgRef.current, filename, {
        photoSrc: passportData.photo,
      });
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

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col items-center justify-center gap-8 py-8">
        <div className="max-w-2xl text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#9b7b45]">
            PetLuma Registry
          </p>
          <h1 className="pet-serif mt-5 text-4xl font-normal tracking-[-0.05em] text-[#2f2119] sm:text-6xl">
            {companionName}&apos;s identity has been created.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6f5b4b] sm:text-base sm:leading-8">
            Their official companion identity is now preserved within the Kingdom
            Registry.
          </p>
        </div>

        {duplicateNotice ? (
          <div className="w-full max-w-2xl rounded-2xl border border-[#c7a15f]/35 bg-[#fff8eb] px-5 py-4 text-center text-sm leading-6 text-[#6f5b4b]">
            {duplicateNotice}
          </div>
        ) : null}
        {cloudSyncNotice ? (
          <div className="w-full max-w-2xl rounded-2xl border border-[#c7a15f]/35 bg-[#fff8eb] px-5 py-4 text-center text-sm leading-6 text-[#6f5b4b]">
            {cloudSyncNotice}
            {cloudSyncError ? (
              <p className="mt-2">Cloud sync failed: {cloudSyncError}</p>
            ) : null}
          </div>
        ) : null}

        <article className="w-full max-w-xl rounded-[28px] border border-[#e6ded2] bg-[#fffdf8]/90 p-6 shadow-[0_22px_60px_rgba(17,24,39,0.08)] sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl border border-[#e6ded2] bg-[#f8f3e8]">
              {passportData.photo ? (
                <Image
                  src={passportData.photo}
                  alt={`Portrait of ${companionName}`}
                  fill
                  unoptimized
                  sizes="7rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-3 text-center text-xs text-[#9a948c]">
                  No portrait
                </div>
              )}
            </div>

            <dl className="min-w-0 flex-1 space-y-4 text-left">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.24em] text-[#9b7b45]">
                  Companion Name
                </dt>
                <dd className="pet-serif mt-1 text-3xl text-[#2f2119]">{companionName}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.24em] text-[#9b7b45]">
                  Companion ID
                </dt>
                <dd className="mt-1 font-mono text-sm text-[#2f2119]">
                  {companionId || "—"}
                </dd>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.24em] text-[#9b7b45]">
                    Species
                  </dt>
                  <dd className="mt-1 text-sm text-[#2f2119]">
                    {displaySpecies(passportData.species) || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.24em] text-[#9b7b45]">
                    Breed
                  </dt>
                  <dd className="mt-1 text-sm text-[#2f2119]">
                    {displayBreed(passportData.breed) || "—"}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </article>

        <div className="flex w-full max-w-xl flex-col gap-3">
          <Link
            href="/my-kingdom"
            className="rounded-full bg-[#2f2119] px-7 py-3.5 text-center text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f]"
          >
            View My Archive
          </Link>
          {storyHref ? (
            <Link
              href={storyHref}
              className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
            >
              Add their story
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setShowPassportPreview((current) => !current)}
            className="rounded-full px-7 py-3 text-center text-sm font-medium text-[#6f5b4b] transition hover:text-[#2f2119]"
          >
            {showPassportPreview ? "Hide passport preview" : "Preview digital passport"}
          </button>
        </div>

        {showPassportPreview ? (
          <div className="w-full max-w-6xl">
            <PassportSVG ref={svgRef} passportData={passportData} />
            <PassportPreviewDisclaimer />
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleDownloadPassport}
                disabled={isDownloading}
                className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1] disabled:cursor-wait disabled:opacity-70"
              >
                {isDownloading ? "Preparing..." : "Download Passport"}
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
