"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackPassportEntryClick } from "@/lib/clarity";
import { RegistryButton, type RegistryButtonProps } from "./RegistryButton";

export function TrackedRegistryButton(props: RegistryButtonProps) {
  const { href, onClick, ...rest } = props;

  return (
    <RegistryButton
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (href === "/passport") {
          trackPassportEntryClick();
        }
      }}
    />
  );
}
