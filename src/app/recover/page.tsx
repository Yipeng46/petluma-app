import type { Metadata } from "next";
import { RecoverExperience } from "@/components/RecoverExperience";

export const metadata: Metadata = {
  title: "Recover PetLuma Passport",
  description: "Recover PetLuma Passports registered to your owner email.",
};

export default function RecoverPage() {
  return <RecoverExperience />;
}
