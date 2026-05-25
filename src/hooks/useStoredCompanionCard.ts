"use client";

import { useEffect, useState } from "react";
import {
  companionCardStorageKey,
  type StoredCompanionCard,
} from "@/lib/cardStorage";
import {
  createInitialPassportData,
  normalizePassportData,
} from "@/lib/passport-data";

export function useStoredCompanionCard() {
  const [passportData, setPassportData] = useState<StoredCompanionCard>(() =>
    createInitialPassportData(),
  );

  useEffect(() => {
    const savedCard = localStorage.getItem(companionCardStorageKey);

    if (!savedCard) {
      return;
    }

    try {
      setPassportData(normalizePassportData(JSON.parse(savedCard)));
    } catch {
      setPassportData(createInitialPassportData());
    }
  }, []);

  return passportData;
}
