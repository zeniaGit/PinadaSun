"use client";

import { useState } from "react";
import { APARTMENT } from "@/lib/apartment";
import { IconPin, IconExternalLink } from "@/components/icons";

export function InteractiveMap({ lang = "es" }: { lang?: "es" | "en" }) {
  const [mapActive, setMapActive] = useState(false);

  // URL del mapa incrustado gratuito de Google Maps (no requiere API Key)
  const embedUrl = `https://maps.google.com/maps?q=${APARTMENT.lat},${APARTMENT.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-cream/20 bg-pine-deep shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 bg-black/25 px-5 py-3.5 text-[13.5px]">
        <div className="flex items-center gap-2.5 text-cream">
          <IconPin className="h-4.5 w-4.5 text-sun-light shrink-0" />
          <span className="font-semibold">{APARTMENT.address}</span>
        </div>
        <a
          href={APARTMENT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-sun-light transition-colors hover:text-cream"
        >
          <span>{lang === "en" ? "Open in Google Maps" : "Cómo llegar en Google Maps"}</span>
          <IconExternalLink className="h-4 w-4" />
        </a>
      </div>
      
      {/* Contenedor relativo para el iframe y el overlay */}
      <div className="relative h-[360px] w-full sm:h-[440px]">
        {/* Iframe de Google Maps gratuito */}
        <iframe 
          src={embedUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0, pointerEvents: mapActive ? "auto" : "none" }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />

        {/* Overlay: bloquea el mapa hasta que el usuario hace clic */}
        {!mapActive && (
          <div
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/10"
            onClick={() => setMapActive(true)}
            aria-label={lang === "en" ? "Click to interact with the map" : "Toca para interactuar con el mapa"}
          >
            <span className="rounded-full bg-pine-deep/90 px-4 py-2 text-xs font-semibold tracking-wide text-cream/90 shadow-lg backdrop-blur-sm select-none transition-transform hover:scale-105 border border-sun/30">
              {lang === "en" ? "Click to interact" : "Toca para interactuar con el mapa"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
