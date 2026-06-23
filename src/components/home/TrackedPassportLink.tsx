"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackPassportEntryClick } from "@/lib/clarity";

type TrackedPassportLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function TrackedPassportLink({
  href,
  className,
  children,
  onNavigate,
}: TrackedPassportLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        onNavigate?.();
        if (href === "/passport") {
          trackPassportEntryClick();
        }
      }}
    >
      {children}
    </Link>
  );
}
