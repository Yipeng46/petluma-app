"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FinalCompanionCard } from "@/components/FinalCompanionCard";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";
import {
  createInitialPassportData,
  normalizePassportData,
} from "@/lib/passport-data";

type ImageSnapshot = {
  img: HTMLImageElement;
  hidden: boolean;
  visibility: string;
  display: string;
};

function hidePassportImages(container: HTMLElement): ImageSnapshot[] {
  return Array.from(container.querySelectorAll("img")).map((img) => {
    const snapshot: ImageSnapshot = {
      img,
      hidden: Boolean(img.hidden),
      visibility: img.style.visibility,
      display: img.style.display,
    };
    img.style.visibility = "hidden";
    return snapshot;
  });
}

function restorePassportImages(snapshots: ImageSnapshot[]) {
  snapshots.forEach(({ img, hidden, visibility, display }) => {
    img.hidden = hidden;
    img.style.visibility = visibility;
    img.style.display = display;
  });
}

async function capturePassportCanvas(element: HTMLElement) {
  const { default: html2canvas } = await import("html2canvas");
  const options = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#f7f1e8",
    logging: true,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  };

  try {
    return await html2canvas(element, options);
  } catch (firstError) {
    console.warn("Passport capture failed with images, retrying without photos:", firstError);
    const snapshots = hidePassportImages(element);

    try {
      return await html2canvas(element, options);
    } finally {
      restorePassportImages(snapshots);
    }
  }
}

export function ResultExperience() {
  const [passportData, setPassportData] = useState<StoredCompanionCard>(() =>
    createInitialPassportData(),
  );
  const [duplicateNotice, setDuplicateNotice] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const passportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedCard = localStorage.getItem(companionCardStorageKey);
    const notice = sessionStorage.getItem("petluma-passport-duplicate-notice");

    if (notice) {
      setDuplicateNotice(notice);
      sessionStorage.removeItem("petluma-passport-duplicate-notice");
    }

    if (!savedCard) {
      return;
    }

    try {
      setPassportData(normalizePassportData(JSON.parse(savedCard)));
    } catch {
      setPassportData(createInitialPassportData());
    }
  }, []);

  async function downloadPassportImage() {
    console.log("passportRef.current", passportRef.current);

    if (!passportRef.current) {
      console.error("Download failed: passportRef.current is null");
      return;
    }

    if (isDownloading) {
      return;
    }

    setIsDownloading(true);
    const exportRoot = passportRef.current;

    try {
      await document.fonts.ready;

      const downloadFromCanvas = (canvas: HTMLCanvasElement) => {
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.href = image;
        link.download = `petluma-passport-${passportData.name?.trim() || "result"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      try {
        downloadFromCanvas(await capturePassportCanvas(exportRoot));
        return;
      } catch (firstError) {
        console.warn("Passport download failed, retrying without photos:", firstError);
      }

      const snapshots = hidePassportImages(exportRoot);

      try {
        downloadFromCanvas(await capturePassportCanvas(exportRoot));
      } finally {
        restorePassportImages(snapshots);
      }
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
              <span className="mt-1 block text-xs text-[#9b7b45]">
                同一宠物已存在护照，已返回原护照。
              </span>
            </div>
          ) : null}
          <FinalCompanionCard card={passportData} passportRef={passportRef} />
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={downloadPassportImage}
            disabled={isDownloading}
            className="rounded-full bg-[#2f2119] px-7 py-3.5 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f] disabled:cursor-wait disabled:opacity-70"
          >
            {isDownloading ? "Preparing..." : "Download Passport"}
          </button>
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
