import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetLuma Companion Card Generator",
  description: "Create refined companion cards for pets and their people.",
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
