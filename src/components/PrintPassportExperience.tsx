"use client";

import { FinalCompanionCard } from "@/components/FinalCompanionCard";
import { useStoredCompanionCard } from "@/hooks/useStoredCompanionCard";

export function PrintPassportExperience() {
  const passportData = useStoredCompanionCard();

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-5 py-8 sm:px-8">
      <div className="no-print mx-auto mb-6 flex w-full max-w-6xl justify-center">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-[#2f2119] px-7 py-3.5 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f]"
        >
          Save as PDF
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <FinalCompanionCard card={passportData} />
      </div>
    </main>
  );
}
