"use client";

import dynamic from "next/dynamic";

const CardGenerator = dynamic(
  () => import("@/components/CardGenerator").then((module) => module.CardGenerator),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[24px] border border-[#E6DED2] bg-[#FFFDF8]/86 px-6 py-12 text-center text-sm text-[#6E6A64]">
        Preparing Passport Office…
      </div>
    ),
  },
);

export function PassportCardGenerator() {
  return <CardGenerator />;
}
