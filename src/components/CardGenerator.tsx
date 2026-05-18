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

  function handlePreviewFinalCard() {
    const card: StoredCompanionCard = {
      name,
      breed,
      personality,
      favoritePlace,
      photoUrl,
    };

    try {
      localStorage.setItem(companionCardStorageKey, JSON.stringify(card));
      router.push("/result");
    } catch {
      alert("The selected photo is too large to preview on the result page.");
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
          className="mt-5 w-full rounded-full bg-[#2f2119] px-7 py-4 text-sm font-semibold text-[#fff8eb] shadow-[0_18px_50px_rgba(47,33,25,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3a291f]"
        >
          Preview Final Card
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
