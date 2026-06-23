"use client";

import dynamic from "next/dynamic";

const NavigationFeedback = dynamic(
  () =>
    import("@/components/NavigationFeedback").then((module) => module.NavigationFeedback),
  { ssr: false },
);

export function NavigationFeedbackLoader() {
  return <NavigationFeedback />;
}
