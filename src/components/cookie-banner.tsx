"use client";

import { useEffect, useState } from "react";
import { IconShieldCheck } from "@/components/icons";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("pinada_consent");
      if (!consent) {
        setShow(true);
      } else if (consent === "all" && typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted",
        });
      }
    } catch {
      // localStorage disabled or error
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("pinada_consent", "all");
      if (typeof window !== "undefined") {
        const win = window as unknown as {
          gtag?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        if (win.gtag) {
          win.gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted",
          });
        }
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({ event: "cookie_consent_accepted" });
      }
    } catch {
      // ignore
    }
    setShow(false);
  };

  const handleNecessaryOnly = () => {
    try {
      localStorage.setItem("pinada_consent", "necessary");
      if (typeof window !== "undefined") {
        const win = window as unknown as {
          gtag?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        if (win.gtag) {
          win.gtag("consent", "update", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
          });
        }
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({ event: "cookie_consent_necessary_only" });
      }
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-transparent pointer-events-none">
      <div className="mx-auto max-w-4xl border border-line bg-cream p-5 sm:p-6 shadow-2xl pointer-events-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1 text-ink">
          <div className="flex items-center gap-2">
            <IconShieldCheck className="h-4 w-4 text-ocean" />
            <h4 className="font-display font-bold text-sm sm:text-base text-ocean">
              Tu privacidad y cookies
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed max-w-2xl">
            Utilizamos cookies y tecnologías de medición (Google Tag Manager y Analytics) para analizar visitas y optimizar tu experiencia de reserva conforme al RGPD y normativas europeas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleNecessaryOnly}
            className="border border-line bg-linen/80 px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-linen hover:text-ink transition-colors cursor-pointer"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="bg-ocean px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-ocean-light transition-colors cursor-pointer"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
