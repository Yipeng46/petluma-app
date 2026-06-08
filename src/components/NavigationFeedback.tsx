"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAVIGATION_TIMEOUT_MS = 12_000;

function isInternalNavigationLink(anchor: HTMLAnchorElement, pathname: string) {
  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);

    if (url.origin !== window.location.origin) {
      return false;
    }

    if (url.pathname === pathname && url.search === window.location.search) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function NavigationFeedback() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const stopNavigating = useCallback(() => {
    setIsNavigating(false);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startNavigating = useCallback(() => {
    setIsNavigating(true);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsNavigating(false);
      timeoutRef.current = null;
    }, NAVIGATION_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    stopNavigating();
  }, [pathname, stopNavigating]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");

      if (!anchor || !isInternalNavigationLink(anchor, pathname)) {
        return;
      }

      startNavigating();
    }

    function handlePopState() {
      startNavigating();
    }

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, startNavigating]);

  if (!isNavigating) {
    return null;
  }

  return (
    <div className="nav-feedback" role="status" aria-live="polite" aria-label="Opening archive">
      <div className="nav-feedback__line" aria-hidden="true" />
      <p className="nav-feedback__label">Opening archive...</p>
    </div>
  );
}
