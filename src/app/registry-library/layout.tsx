import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Registry Library — PetLuma Kingdom Archive",
  description:
    "An interactive archival library of registered companions preserved in the PetLuma Kingdom Registry.",
};

export default function RegistryLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
