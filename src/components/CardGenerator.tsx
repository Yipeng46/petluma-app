"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";
import {
  createInitialPassportData,
  updatePassportField,
  type PassportData,
} from "@/lib/passport-data";
import { PetCardForm } from "./PetCardForm";
import { PetCardPreview } from "./PetCardPreview";

export function CardGenerator() {
  const router = useRouter();
  const [passportData, setPassportData] = useState<PassportData>(() =>
    createInitialPassportData(),
  );

  function updateField<K extends keyof PassportData>(
    field: K,
    value: PassportData[K],
  ) {
    setPassportData((current) => updatePassportField(current, field, value));
  }

  function handlePhotoChange(file: File | null) {
    if (!file) {
      updateField("photo", null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("photo", reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handlePreviewFinalCard() {
    try {
      console.log("[PetLuma] Preview Final Card clicked", {
        name: passportData.name,
        breed: passportData.breed,
        gender: passportData.gender,
        hasPhoto: Boolean(passportData.photo),
      });

      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pet_name: passportData.name,
          breed: passportData.breed,
          photo_url: passportData.photo,
        }),
      });
      const data = await response.json();

      console.log("[PetLuma] /api/pets response", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        console.error("[PetLuma] /api/pets full error", data);
        throw new Error(data?.error || "Could not save pet.");
      }

      console.log("[PetLuma] saved pet", data.pet);

      const card: StoredCompanionCard = {
        ...passportData,
        companionId: data.pet.companion_id,
        passportNo: data.pet.passport_number,
      };

      localStorage.setItem(companionCardStorageKey, JSON.stringify(card));
      router.push("/result");
    } catch (error) {
      console.error("[PetLuma] Preview Final Card save error", error);
      alert(
        error instanceof Error
          ? error.message
          : "The selected photo is too large to preview on the result page.",
      );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div>
        <PetCardForm
          passportData={passportData}
          onFieldChange={updateField}
          onPhotoChange={handlePhotoChange}
        />

        <button
          type="button"
          onClick={handlePreviewFinalCard}
          className="mt-5 w-full rounded-full border border-[#C8A97E]/35 bg-[#111827] px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#FFFDF8] shadow-[0_16px_42px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1E293B]"
        >
          Generate Passport ✨
        </button>
      </div>

      <div className="lg:sticky lg:top-8">
        <PetCardPreview passportData={passportData} />
      </div>
    </div>
  );
}
