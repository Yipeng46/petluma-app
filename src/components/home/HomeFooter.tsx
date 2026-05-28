import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export function HomeFooter() {
  return (
    <div>
      <p className="border-t border-[#E6DED2]/60 bg-[#FAF6F0]/90 px-6 py-6 text-center font-sans text-[10px] leading-relaxed text-[#6E6A64]/75 md:px-10">
        PetLuma passports are commemorative companion identity products and are not
        government-issued travel documents.
      </p>
      <SiteFooter />
    </div>
  );
}
