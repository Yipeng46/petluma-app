import { RecoverExperience } from "@/components/RecoverExperience";
import { SiteFooter } from "@/components/SiteFooter";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Recover PetLuma Passport",
  description: "Recover PetLuma Passports registered to your owner email.",
  path: "/recover",
});

export default function RecoverPage() {
  return (
    <>
      <RecoverExperience />
      <SiteFooter />
    </>
  );
}
