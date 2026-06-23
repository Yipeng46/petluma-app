"use client";

import { useEffect } from "react";
import { type ClarityEventName, trackClarityEvent } from "@/lib/clarity";

type ClarityEventOnMountProps = {
  event: ClarityEventName;
};

export function ClarityEventOnMount({ event }: ClarityEventOnMountProps) {
  useEffect(() => {
    trackClarityEvent(event);
  }, [event]);

  return null;
}
