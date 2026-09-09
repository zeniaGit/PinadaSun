"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_STORAGE_KEY = "ps_analytics_sid";
const SESSION_START_KEY = "ps_analytics_start";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid = "ps_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
      sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
      sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
    }
    return sid;
  } catch {
    return "";
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Excluir rutas internas de administración y endpoints de API
    if (!pathname || pathname.startsWith("/panel") || pathname.startsWith("/api")) {
      return;
    }

    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    let startVal: string | null = null;
    try {
      startVal = sessionStorage.getItem(SESSION_START_KEY);
    } catch {}
    const sessionStartTime = startVal ? parseInt(startVal, 10) : Date.now();

    // 1. Envío asíncrono no bloqueante diferido (requestIdleCallback) para no competir con el LCP
    const runNonBlocking = (fn: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(fn, { timeout: 2000 });
      } else {
        setTimeout(fn, 300);
      }
    };

    runNonBlocking(() => {
      try {
        const isWebdriver = Boolean(
          (window.navigator as any).webdriver ||
          (window as any).__nightmare ||
          (window as any)._phantom ||
          (window as any).callPhantom
        );

        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            page: pathname || "/",
            referrer: document.referrer || null,
            isWebdriver,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {}
    });

    // 2. Baliza para registrar la duración de estancia de forma eficiente
    const sendDurationUpdate = (isClosing = false) => {
      const now = Date.now();
      const totalDurationSec = Math.max(1, Math.round((now - sessionStartTime) / 1000));

      const payload = JSON.stringify({
        sessionId,
        durationSeconds: totalDurationSec,
        page: pathname || "/",
      });

      if (isClosing && typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/ping", payload);
      } else {
        fetch("/api/analytics/ping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const interval = setInterval(() => {
      sendDurationUpdate(false);
    }, 20000); // 20s heartbeat

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendDurationUpdate(true);
      }
    };

    const handlePageHide = () => {
      sendDurationUpdate(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    window.addEventListener("pagehide", handlePageHide, { passive: true });
    window.addEventListener("beforeunload", handlePageHide, { passive: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      sendDurationUpdate(false);
    };
  }, [pathname]);

  return null;
}
