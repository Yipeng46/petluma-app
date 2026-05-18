"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";
import { PetCardForm } from "./PetCardForm";
import { PetCardPreview } from "./PetCardPreview";

export function CardGenerator() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [personality, setPersonality] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  function handlePhotoChange(file: File | null) {
    if (!file) {
      setPhotoUrl(null);
      setFileName("");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handlePreviewFinalCard() {
    const card: StoredCompanionCard = {
      name,
      breed,
      personality,
      favoritePlace,
      photoUrl,
    };

    try {
      console.log("[PetLuma] Preview Final Card clicked", {
        pet_name: name,
        breed,
        hasPhotoUrl: Boolean(photoUrl),
      });

      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pet_name: name,
          breed,
          photo_url: photoUrl,
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
          name={name}
          breed={breed}
          personality={personality}
          favoritePlace={favoritePlace}
          fileName={fileName}
          onNameChange={setName}
          onBreedChange={setBreed}
          onPersonalityChange={setPersonality}
          onFavoritePlaceChange={setFavoritePlace}
          onPhotoChange={handlePhotoChange}
        />

        <button
          type="button"
          onClick={handlePreviewFinalCard}
          className="mt-5 w-full rounded-full border border-[#b8944d]/35 bg-[#081526] px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#fff8eb] shadow-[0_18px_50px_rgba(8,21,38,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b1c32]"
        >
          Generate Passport
        </button>
      </div>

      <div className="lg:sticky lg:top-8">
        <PetCardPreview
          name={name}
          breed={breed}
          personality={personality}
          favoritePlace={favoritePlace}
          photoUrl={photoUrl}
        />
      </div>
    </div>
  );
}
