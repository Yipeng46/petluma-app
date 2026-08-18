"use client";

import { PassportOfficeTrackedButton } from "./PassportOfficeTrackedButton";

type HeaderCreateIdentityLinkProps = {
  className?: string;
};

export function HeaderCreateIdentityLink({ className = "" }: HeaderCreateIdentityLinkProps) {
  return (
    <PassportOfficeTrackedButton
      variant="primary"
      className={`site-header__create-identity ${className}`.trim()}
    >
      Create Identity
    </PassportOfficeTrackedButton>
  );
}
