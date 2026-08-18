export type PassportRegistrationNavItem = {
  label: string;
  href: string;
  passport?: true;
};

export const PASSPORT_REGISTRATION_NAV = {
  label: "Passport Registration",
  items: [
    { label: "The Registry", href: "/hall" },
    { label: "Companion Identity", href: "/passport", passport: true },
    { label: "Physical Passport", href: "/#passport-product" },
  ] satisfies PassportRegistrationNavItem[],
} as const;

export const HOME_NAV_LINKS = [
  { label: "Founding Chamber", href: "/founding" },
] as const;
