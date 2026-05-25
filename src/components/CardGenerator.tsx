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
import { isValidEmail } from "@/lib/pet-identity";
import {
  isAllowedPassportPhotoType,
  PASSPORT_PHOTO_MAX_BYTES,
  validatePassportUserInput,
} from "@/lib/passport-form";
import { createRegistryRecord } from "@/lib/registry";
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

    if (!isAllowedPassportPhotoType(file.type)) {
      alert("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > PASSPORT_PHOTO_MAX_BYTES) {
      alert("Photo must be 5 MB or smaller.");
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

  function handlePreviewFinalCard() {
    if (!passportData.ownerEmail.trim() || !isValidEmail(passportData.ownerEmail)) {
      alert("Please enter a valid owner email before generating a passport.");
      return;
    }

    const validationError = validatePassportUserInput(passportData);

    if (validationError) {
      alert(validationError);
      return;
    }

    const { record, isDuplicate, message } = createRegistryRecord({
      ownerEmail: passportData.ownerEmail,
      petName: passportData.name,
      species: passportData.species,
      breed: passportData.breed,
      gender: passportData.gender,
      dateOfBirth: passportData.birthdate,
      placeOfOrigin: passportData.placeOfOrigin,
    });

    const card: StoredCompanionCard = {
      ...passportData,
      companionId: record.companionId,
      passportNo: record.passportNo,
    };

    if (isDuplicate) {
      sessionStorage.setItem(
        "petluma-passport-duplicate-notice",
        message || "This companion already has a PetLuma Passport.",
      );
    } else {
      sessionStorage.removeItem("petluma-passport-duplicate-notice");
    }

    localStorage.setItem(companionCardStorageKey, JSON.stringify(card));
    router.push("/result");
  }

  return (
    <div className="grid max-w-full min-w-0 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div className="min-w-0 max-w-full">
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

      <div className="min-w-0 max-w-full overflow-x-hidden lg:sticky lg:top-8">
        <PetCardPreview passportData={passportData} />
      </div>
    </div>
  );
}
