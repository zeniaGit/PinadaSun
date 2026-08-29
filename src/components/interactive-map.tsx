"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { APARTMENT } from "@/lib/apartment";
import { IconPin, IconExternalLink } from "@/components/icons";

export function InteractiveMap({ lang = "es" }: { lang?: "es" | "en" }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [mapActive, setMapActive] = useState(false);

  // Activa/desactiva interacción con el mapa
  const activateMap = () => {
    setMapActive(true);
    const m = mapInstanceRef.current;
    if (m) { m.dragging.enable(); m.scrollWheelZoom.enable(); }
  };
  const deactivateMap = () => {
    setMapActive(false);
    const m = mapInstanceRef.current;
    if (m) { m.dragging.disable(); m.scrollWheelZoom.disable(); }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const position: [number, number] = [APARTMENT.lat, APARTMENT.lng];

      // Inicializar mapa (dragging y scrollWheel deshabilitados por defecto)
      const map = L.map(mapContainerRef.current, {
        center: position,
        zoom: 17,
        scrollWheelZoom: false,
        dragging: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Capa de mosaicos CartoDB Voyager (diseño limpio y moderno)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        },
      ).addTo(map);

      // Icono personalizado con casita Material Icons
      const customHouseIcon = L.divIcon({
        className: "custom-house-pin",
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute -inset-2 rounded-full bg-sun/40 animate-ping"></span>
            <div class="relative flex h-11 w-11 items-center justify-center rounded-full bg-pine-deep p-2 text-sun-light shadow-xl border-2 border-sun">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <div class="absolute -bottom-1.5 h-2 w-2 rotate-45 bg-pine-deep border-r-2 border-b-2 border-sun"></div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -46],
      });

      // Marcador
      const marker = L.marker(position, { icon: customHouseIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; padding: 4px 2px; text-align: center; color: #1c2833;">
          <strong style="font-size: 14px; display: block; color: #0f3b5c;">Pinada Sun</strong>
          <span style="font-size: 12px; color: #566573; display: block; margin-top: 2px;">
            ${APARTMENT.address}
          </span>
          <a
            href="${APARTMENT.googleMapsUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-block; margin-top: 8px; font-size: 11.5px; font-weight: 600; color: #c99a4e; text-decoration: underline;"
          >
            ${lang === "en" ? "Open Google Maps directions →" : "Cómo llegar en Google Maps →"}
          </a>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lang]);

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
      {/* Contenedor relativo para poder superponer el overlay */}
      <div className="relative">
        <div
          ref={mapContainerRef}
          className="h-[360px] w-full sm:h-[440px] z-0"
          style={{ minHeight: "360px" }}
          onMouseLeave={deactivateMap}
        />
        {/* Overlay: bloquea el mapa hasta que el usuario hace clic */}
        {!mapActive && (
          <div
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent"
            onClick={activateMap}
            onTouchStart={activateMap}
            aria-label={lang === "en" ? "Click to interact with the map" : "Toca para interactuar con el mapa"}
          >
            <span className="rounded-full bg-pine-deep/80 px-4 py-2 text-xs font-semibold tracking-wide text-cream/90 shadow-lg backdrop-blur-sm select-none">
              {lang === "en" ? "Click to interact" : "Toca para interactuar"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
