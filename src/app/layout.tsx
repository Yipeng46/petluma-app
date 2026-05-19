import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetLuma Passport System",
  description: "Create refined PetLuma passports for beloved companions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
