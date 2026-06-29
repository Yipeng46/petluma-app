"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";
import {
  createInitialPassportData,
  updatePassportField,
  type PassportData,
} from "@/lib/passport-data";
import { displayOwnerEmail, isRecoverableOwnerEmail } from "@/lib/pet-identity";
import { notifyWelcomeEmail } from "@/lib/welcome-email-client";
import {
  isAllowedPassportPhotoType,
  PASSPORT_PHOTO_MAX_BYTES,
  validatePassportUserInput,
} from "@/lib/passport-form";
import { getCountryByCode } from "@/lib/countries";
import { getRecordCountryCode } from "@/lib/companion-lookup";
import { getAuthenticatedGuardian } from "@/lib/guardian-session";
import {
  clearPassportDraft,
  loadPassportDraft,
} from "@/lib/passport-draft";
import { PASSPORT_ACCESS_PATH } from "@/lib/passport-routes";
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
  const searchParams = useSearchParams();
  const resumeAttempted = useRef(false);
  const [passportData, setPassportData] = useState<PassportData>(() =>
    createInitialPassportData(),
  );
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [photoInputKey, setPhotoInputKey] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function issueOfficialPassport(
    data: PassportData,
    acceptedTerms: boolean,
    guardian: { id: string; email: string },
  ) {
    if (!acceptedTerms) {
      alert("Please confirm the Terms and Privacy Policy before continuing.");
      return;
    }

    const validationError = validatePassportUserInput(data);

    if (validationError) {
      alert(validationError);
      return;
    }

    trackClarityEvent(CLARITY_EVENTS.CREATE_IDENTITY_CLICKED);

    const guardianEmail = guardian.email.trim();

    const { record, isDuplicate, message, cloudSynced, cloudSyncError } =
      await createRegistryRecordWithFallback({
        ownerEmail: guardianEmail,
        petName: data.name,
        species: data.species,
        breed: data.breed,
        gender: data.gender,
        dateOfBirth: data.birthdate,
        countryCode: data.countryCode,
        placeOfOrigin: data.placeOfOrigin,
        photoUrl: data.photo,
        story: data.story,
        specialMemory: data.specialMemory,
        favoriteThings: data.favoriteThings,
        isPublic: data.isPublic,
        guardianEmail: null,
        guardianName: null,
        guardianId: guardian.id,
      });

    const card: StoredCompanionCard = isDuplicate
      ? {
          ownerEmail: displayOwnerEmail(record.ownerEmail),
          photo: record.photoUrl ?? data.photo,
          name: record.petName,
          breed: record.breed,
          gender: record.gender,
          birthdate: record.dateOfBirth,
          species: record.species,
          countryCode: getRecordCountryCode(record),
          placeOfOrigin: record.placeOfOrigin,
          passportNo: record.passportNo,
          companionId: record.companionId,
          story: record.story ?? data.story,
          specialMemory: record.specialMemory ?? data.specialMemory,
          favoriteThings: record.favoriteThings ?? data.favoriteThings,
          isPublic: record.isPublic,
        }
      : {
          ...data,
          ownerEmail: guardianEmail,
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
        petName: data.name.trim(),
        companionId: record.companionId,
        passportNo: record.passportNo,
        date: record.createdAt,
        country: record.placeOfOrigin || data.placeOfOrigin || "—",
        archiveUrl: buildCompanionUrl(record.companionId),
      });
    }

    clearPassportDraft();
    localStorage.setItem(companionCardStorageKey, JSON.stringify(card));
    router.push("/result");
  }

  async function handleIssueOfficialPassport() {
    if (isSubmitting) {
      return;
    }

    if (!termsAccepted) {
      alert("Please confirm the Terms and Privacy Policy before continuing.");
      return;
    }

    const validationError = validatePassportUserInput(passportData);

    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const guardian = await getAuthenticatedGuardian();

      if (!guardian) {
        router.push(PASSPORT_ACCESS_PATH);
        return;
      }

      await issueOfficialPassport(passportData, termsAccepted, guardian);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (resumeAttempted.current || searchParams.get("resume") !== "1") {
      return;
    }

    resumeAttempted.current = true;

    async function resumePassportIssue() {
      const draft = loadPassportDraft();

      if (!draft) {
        return;
      }

      setPassportData(draft.passportData);
      setTermsAccepted(draft.termsAccepted);

      const guardian = await getAuthenticatedGuardian();

      if (!guardian) {
        return;
      }

      setIsSubmitting(true);

      try {
        await issueOfficialPassport(
          draft.passportData,
          draft.termsAccepted,
          guardian,
        );
      } finally {
        setIsSubmitting(false);
      }
    }

    void resumePassportIssue();
  }, [searchParams]);

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
            onClick={handleIssueOfficialPassport}
            disabled={isSubmitting}
            className="passport-form-submit mt-5 w-full rounded-full border border-[#C8A97E]/35 bg-[#111827] px-7 py-4 text-[#FFFDF8] shadow-[0_16px_42px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1E293B] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Issuing…" : "Issue Official Passport"}
          </button>
        </div>

        <div className="min-w-0 max-w-full overflow-x-hidden lg:sticky lg:top-8">
          <PetCardPreview passportData={passportData} />
        </div>
      </div>
    </>
  );
}
