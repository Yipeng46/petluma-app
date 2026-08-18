export type PassportOfficeNavItem = {
  label: string;
  href: string;
};

export const PASSPORT_OFFICE_NAV = {
  label: "Passport Office",
  items: [
    { label: "The Registry", href: "/hall" },
    { label: "Physical Passport", href: "/#passport-product" },
  ] satisfies PassportOfficeNavItem[],
} as const;

export const HOME_NAV_LINKS = [
  { label: "Founding Chamber", href: "/founding" },
] as const;
