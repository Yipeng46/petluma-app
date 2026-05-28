import type { Metadata } from "next";
import { RegistryHallExperience } from "@/components/registry-hall/RegistryHallExperience";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import "@/styles/registry-hall.css";

export const metadata: Metadata = {
  title: "The Registry Hall — PetLuma Kingdom Archive",
  description:
    "A quiet public archive of registered companions whose guardians have chosen to share their official Kingdom identity.",
};

export default function RegistryHallPage() {
  return (
    <div className="registry-hall registry-home min-h-screen font-sans text-kingdom-ink antialiased">
      <SiteHeader />
      <main className="px-6 py-14 md:px-10 md:py-20 lg:py-24">
        <RegistryHallExperience />
      </main>
      <SiteFooter />
    </div>
  );
}
