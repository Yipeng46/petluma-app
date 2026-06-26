"use client";

import dynamic from "next/dynamic";
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
import {
  displayOwnerEmail,
  isRecoverableOwnerEmail,
  isValidEmail,
} from "@/lib/pet-identity";
import { notifyWelcomeEmail } from "@/lib/welcome-email-client";
import {
  isAllowedPassportPhotoType,
  PASSPORT_PHOTO_MAX_BYTES,
  validatePassportUserInput,
} from "@/lib/passport-form";
import { getCountryByCode } from "@/lib/countries";
import { getRecordCountryCode } from "@/lib/companion-lookup";
import { createRegistryRecordWithFallback } from "@/lib/registry";
import { buildCompanionUrl } from "@/lib/site-url";
import { CLARITY_EVENTS, trackClarityEvent } from "@/lib/clarity";
import { PetCardForm } from "./PetCardForm";
import { PetCardPreview } from "./PetCardPreview";
import { TermsConfirmationField } from "./TermsConfirmationField";

const PetPhotoCropModal = dynamic(
  () => import("./PetPhotoCropModal").then((module) => module.PetPhotoCropModal),
  { ssr: false },
);

export function CardGenerator() {
  const router = useRouter();
  const [passportData, setPassportData] = useState<PassportData>(() =>
    createInitialPassportData(),
  );
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [photoInputKey, setPhotoInputKey] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  function updateField<K extends keyof PassportData>(
    field: K,
    value: PassportData[K],
  ) {
    setPassportData((current) => updatePassportField(current, field, value));
  }

  function handlePhotoChange(file: File | null) {
    if (!file) {
      return;
    }

    if (!isAllowedPassportPhotoType(file.type)) {
      alert("Please upload a JPG, PNG, or WEBP image.");
      setPhotoInputKey((current) => current + 1);
      return;
    }

    if (file.size > PASSPORT_PHOTO_MAX_BYTES) {
      alert("Image must be under 5MB.");
      setPhotoInputKey((current) => current + 1);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCropImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleCropConfirm(croppedImageDataUrl: string) {
    updateField("photo", croppedImageDataUrl);
    setCropImageSrc(null);
    setPhotoInputKey((current) => current + 1);
  }

  function handleCropCancel() {
    setCropImageSrc(null);
    setPhotoInputKey((current) => current + 1);
  }

  function handleCountryChange(countryCode: string) {
    const country = getCountryByCode(countryCode);

    if (!country) {
      setPassportData((current) => ({
        ...current,
        countryCode: "",
        placeOfOrigin: "",
      }));
      return;
    }

    setPassportData((current) => ({
      ...current,
      countryCode: country.code,
      placeOfOrigin: country.name,
    }));
  }

  async function handlePreviewFinalCard() {
    if (!termsAccepted) {
      alert("Please confirm the Terms and Privacy Policy before continuing.");
      return;
    }

    const guardianEmail = passportData.ownerEmail.trim();

    if (guardianEmail && !isValidEmail(guardianEmail)) {
      alert("Please enter a valid guardian email, or leave the field blank.");
      return;
    }

    const validationError = validatePassportUserInput(passportData);

    if (validationError) {
      alert(validationError);
      return;
    }

    trackClarityEvent(CLARITY_EVENTS.CREATE_IDENTITY_CLICKED);

    let guardianId: string | null = null;

    if (guardianEmail && isRecoverableOwnerEmail(guardianEmail)) {
      try {
        const response = await fetch("/api/guardian/ensure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: guardianEmail }),
        });

        if (response.ok) {
          const payload = (await response.json()) as { guardianId?: string };
          guardianId = payload.guardianId ?? null;
        }
      } catch {
        // Guardian linking is best-effort; registration continues unchanged.
      }
    }

    const { record, isDuplicate, message, cloudSynced, cloudSyncError } =
      await createRegistryRecordWithFallback({
      ownerEmail: guardianEmail,
      petName: passportData.name,
      species: passportData.species,
      breed: passportData.breed,
      gender: passportData.gender,
      dateOfBirth: passportData.birthdate,
      countryCode: passportData.countryCode,
      placeOfOrigin: passportData.placeOfOrigin,
      photoUrl: passportData.photo,
      story: passportData.story,
      specialMemory: passportData.specialMemory,
      favoriteThings: passportData.favoriteThings,
      isPublic: passportData.isPublic,
      guardianEmail: null,
      guardianName: null,
      guardianId,
    });

    const card: StoredCompanionCard = isDuplicate
      ? {
          ownerEmail: displayOwnerEmail(record.ownerEmail),
          photo: record.photoUrl ?? passportData.photo,
          name: record.petName,
          breed: record.breed,
          gender: record.gender,
          birthdate: record.dateOfBirth,
          species: record.species,
          countryCode: getRecordCountryCode(record),
          placeOfOrigin: record.placeOfOrigin,
          passportNo: record.passportNo,
          companionId: record.companionId,
          story: record.story ?? passportData.story,
          specialMemory: record.specialMemory ?? passportData.specialMemory,
          favoriteThings: record.favoriteThings ?? passportData.favoriteThings,
          isPublic: record.isPublic,
        }
      : {
          ...passportData,
          companionId: record.companionId,
          passportNo: record.passportNo,
        };

    if (!isDuplicate) {
      trackClarityEvent(CLARITY_EVENTS.PASSPORT_CREATED_SUCCESSFULLY);
    }

    if (isDuplicate) {
      sessionStorage.setItem(
        "petluma-passport-duplicate-notice",
        message || "This companion already has a PetLuma Passport.",
      );
    } else {
      sessionStorage.removeItem("petluma-passport-duplicate-notice");
    }

    if (cloudSynced) {
      sessionStorage.setItem(
        "petluma-cloud-sync-notice",
        "Cloud registry synced",
      );
      sessionStorage.removeItem("petluma-cloud-sync-error");
    } else {
      sessionStorage.setItem(
        "petluma-cloud-sync-notice",
        "Cloud registry failed, saved locally",
      );

      if (cloudSyncError) {
        sessionStorage.setItem("petluma-cloud-sync-error", cloudSyncError);
      } else {
        sessionStorage.removeItem("petluma-cloud-sync-error");
      }
    }

    if (!isDuplicate && cloudSynced && isRecoverableOwnerEmail(guardianEmail)) {
      notifyWelcomeEmail({
        email: guardianEmail,
        petName: passportData.name.trim(),
        companionId: record.companionId,
        passportNo: record.passportNo,
        date: record.createdAt,
        country: record.placeOfOrigin || passportData.placeOfOrigin || "—",
        archiveUrl: buildCompanionUrl(record.companionId),
      });
    }

    localStorage.setItem(companionCardStorageKey, JSON.stringify(card));
    router.push("/result");
  }

  return (
    <>
      {cropImageSrc ? (
        <PetPhotoCropModal
          imageSrc={cropImageSrc}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      ) : null}

      <div className="grid max-w-full min-w-0 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="min-w-0 max-w-full">
          <PetCardForm
            passportData={passportData}
            photoInputKey={photoInputKey}
            onFieldChange={updateField}
            onPhotoChange={handlePhotoChange}
            onCountryChange={handleCountryChange}
          />

          <TermsConfirmationField
            checked={termsAccepted}
            onChange={setTermsAccepted}
          />

          <button
            type="button"
            onClick={handlePreviewFinalCard}
            className="passport-form-submit mt-5 w-full rounded-full border border-[#C8A97E]/35 bg-[#111827] px-7 py-4 text-[#FFFDF8] shadow-[0_16px_42px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1E293B]"
          >
            Register Companion
          </button>
        </div>

        <div className="min-w-0 max-w-full overflow-x-hidden lg:sticky lg:top-8">
          <PetCardPreview passportData={passportData} />
        </div>
      </div>
    </>
  );
}
