"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FinalCompanionCard } from "@/components/FinalCompanionCard";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";

const fallbackCard: StoredCompanionCard = {
  name: "",
  breed: "",
  personality: "",
  favoritePlace: "",
  photoUrl: null,
};

export function ResultExperience() {
  const [card, setCard] = useState<StoredCompanionCard>(fallbackCard);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedCard = localStorage.getItem(companionCardStorageKey);

    if (!savedCard) {
      return;
    }

    try {
      setCard(JSON.parse(savedCard) as StoredCompanionCard);
    } catch {
      setCard(fallbackCard);
    }
  }, []);

  async function handleDownloadCard() {
    if (!cardRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      await document.fonts.ready;

      let html2canvas: (
        element: HTMLElement,
        options?: Record<string, unknown>,
      ) => Promise<HTMLCanvasElement>;

      try {
        html2canvas = (await import("html2canvas")).default;
      } catch {
        alert("html2canvas is not installed yet. Please run: npm install html2canvas");
        return;
      }

      const canvas = await html2canvas(cardRef.current, {
        allowTaint: true,
        backgroundColor: "#241812",
        logging: false,
        removeContainer: true,
        scale: Math.max(2, window.devicePixelRatio || 1),
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = "petluma-companion-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
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
            PetLuma Companion Card
          </p>
          <h1 className="pet-serif mt-5 text-5xl font-normal tracking-[-0.07em] text-[#2f2119] sm:text-7xl">
            Your companion card is ready.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6f5b4b] sm:text-lg sm:leading-8">
            A quiet keepsake for the pet who brightens your everyday life.
          </p>
        </div>

        <div className="w-full max-w-6xl">
          <FinalCompanionCard card={card} cardRef={cardRef} />
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleDownloadCard}
            disabled={isDownloading}
            className="rounded-full bg-[#2f2119] px-7 py-3.5 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f] disabled:cursor-wait disabled:opacity-70"
          >
            {isDownloading ? "Preparing..." : "Download Card"}
          </button>
          <Link
            href="/create"
            className="rounded-full border border-[#c7a15f]/45 bg-[#fffaf1]/70 px-7 py-3.5 text-center text-sm font-semibold text-[#2f2119] shadow-[0_14px_40px_rgba(47,33,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf1]"
          >
            Create Another
          </Link>
        </div>
      </section>
    </main>
  );
}
