import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "The Registry Hall — PetLuma Kingdom Archive",
  description:
    "A public archive of companions preserved within the Kingdom. Only companions shared with guardian consent are displayed here.",
  path: "/hall",
});

export default function RegistryHallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
