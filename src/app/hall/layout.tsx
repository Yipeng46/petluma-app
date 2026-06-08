import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Registry Hall — PetLuma Kingdom Archive",
  description:
    "A public archive of companions preserved within the Kingdom. Only companions shared with guardian consent are displayed here.",
};

export default function RegistryHallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
