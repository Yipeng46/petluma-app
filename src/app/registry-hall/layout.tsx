import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Registry Hall — PetLuma Kingdom Archive",
  description:
    "A quiet public archive of registered companions whose guardians have chosen to share their official Kingdom identity.",
};

export default function RegistryHallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
