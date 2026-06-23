export const CLARITY_EVENTS = {
  CREATE_IDENTITY_CLICKED: "create_identity_clicked",
  REGISTRY_HALL_OPENED: "registry_hall_opened",
  ARCHIVE_OPENED: "archive_opened",
  PASSPORT_CREATED_SUCCESSFULLY: "passport_created_successfully",
} as const;

export type ClarityEventName = (typeof CLARITY_EVENTS)[keyof typeof CLARITY_EVENTS];

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackClarityEvent(eventName: ClarityEventName) {
  if (typeof window === "undefined") {
    return;
  }

  window.clarity?.("event", eventName);
}

export function trackPassportEntryClick() {
  trackClarityEvent(CLARITY_EVENTS.CREATE_IDENTITY_CLICKED);
}
