"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { type GalleryItem } from "@/lib/apartment";
import { IconChevronL, IconChevronR, IconX } from "@/components/icons";

export function GallerySlider({ items }: { items: GalleryItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setSelectedIdx(null);
    document.body.style.overflow = "";
  }, []);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIdx === null) return;
      setSelectedIdx((prev) => (prev === null ? 0 : prev === 0 ? items.length - 1 : prev - 1));
    },
    [selectedIdx, items.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIdx === null) return;
      setSelectedIdx((prev) => (prev === null ? 0 : prev === items.length - 1 ? 0 : prev + 1));
    },
    [selectedIdx, items.length],
  );

  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIdx, handleClose, handlePrev, handleNext]);

  return (
    <>
      {/* ── Carrusel Deslizante de fotos panorámicas ── */}
      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:px-8 [scrollbar-width:thin]">
        {items.map((g, i) => (
          <figure
            key={g.caption}
            onClick={() => handleOpen(i)}
            className={`group relative w-[78vw] shrink-0 snap-start overflow-hidden cursor-pointer rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl sm:w-[55vw] md:w-[42vw] lg:w-[34vw] ${
              i % 2 === 1 ? "md:translate-y-8" : ""
            }`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-[46vw] w-full object-cover transition-transform duration-700 group-hover:scale-106 sm:h-[38vw] md:h-[30vw]"
            />

            {/* Overlay sutil de lupa al pasar el cursor */}
            <div className="absolute inset-0 bg-ocean-deep/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
              <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold text-ocean shadow-lg backdrop-blur-xs flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Ampliar foto
              </span>
            </div>

            <figcaption className="absolute bottom-0 left-0 flex w-full items-baseline gap-3 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/50 to-transparent px-5 pb-4 pt-14">
              <span className="tnum font-display text-lg text-sun-light font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[14.5px] font-medium text-cream truncate">
                {g.caption}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* ── Modal Lightbox Fullscreen ── */}
      {selectedIdx !== null && (
        <LightboxModal
          items={items}
          selectedIdx={selectedIdx}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

export function DetailPhotoGrid({ items }: { items: GalleryItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setSelectedIdx(null);
    document.body.style.overflow = "";
  }, []);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIdx === null) return;
      setSelectedIdx((prev) => (prev === null ? 0 : prev === 0 ? items.length - 1 : prev - 1));
    },
    [selectedIdx, items.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIdx === null) return;
      setSelectedIdx((prev) => (prev === null ? 0 : prev === items.length - 1 ? 0 : prev + 1));
    },
    [selectedIdx, items.length],
  );

  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIdx, handleClose, handlePrev, handleNext]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {items.map((g, i) => (
          <figure
            key={g.caption}
            onClick={() => handleOpen(i)}
            className={`group relative cursor-pointer overflow-hidden rounded-lg border border-line bg-cream shadow-xs transition-all duration-300 hover:shadow-md hover:border-sun ${
              i === items.length - 1 && items.length % 2 !== 0 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-linen flex items-center justify-center">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
              />
            </div>

            {/* Overlay sutil al pasar el cursor */}
            <div className="absolute inset-0 bg-ocean/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
              <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ocean shadow-md backdrop-blur-xs">
                Ver detalle
              </span>
            </div>

            <figcaption className="p-2.5 text-center bg-cream border-t border-line/60">
              <p className="text-[12px] font-semibold text-ink truncate">{g.caption}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-ocean-light font-medium">{g.room}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* ── Modal Lightbox Fullscreen ── */}
      {selectedIdx !== null && (
        <LightboxModal
          items={items}
          selectedIdx={selectedIdx}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

function LightboxModal({
  items,
  selectedIdx,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  selectedIdx: number;
  onClose: () => void;
  onPrev: (e?: React.MouseEvent) => void;
  onNext: (e?: React.MouseEvent) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Barra superior */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 px-4 sm:px-8 flex w-full max-w-7xl mx-auto items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="font-display text-base sm:text-lg font-bold text-sun-light drop-shadow-md">
            {String(selectedIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {items[selectedIdx].room && (
            <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/90 border border-white/20 backdrop-blur-md">
              {items[selectedIdx].room}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60 active:scale-95 border border-white/20 cursor-pointer backdrop-blur-md"
          aria-label="Cerrar visor"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      {/* Contenedor central de la foto con botones de navegación */}
      <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-12 pointer-events-none">
        {items.length > 1 && (
          <button
            onClick={onPrev}
            className="pointer-events-auto absolute left-2 sm:left-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/20 shadow-xl cursor-pointer backdrop-blur-md"
            aria-label="Foto anterior"
          >
            <IconChevronL className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Imagen a máxima resolución y calidad */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto relative max-h-[80vh] sm:max-h-[90vh] max-w-full overflow-hidden flex items-center justify-center"
        >
          <img
            src={items[selectedIdx].src}
            alt={items[selectedIdx].alt}
            className="max-h-[80vh] sm:max-h-[90vh] max-w-full object-contain transition-transform duration-300 rounded-md"
          />
        </div>

        {items.length > 1 && (
          <button
            onClick={onNext}
            className="pointer-events-auto absolute right-2 sm:right-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/20 shadow-xl cursor-pointer backdrop-blur-md"
            aria-label="Foto siguiente"
          >
            <IconChevronR className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>

      {/* Barra inferior con pie de foto y descripción */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-auto w-[calc(100%-2rem)] sm:w-full sm:max-w-2xl mx-auto text-center z-20 rounded-lg bg-black/60 px-4 sm:px-6 py-3 sm:py-4 border border-white/15 backdrop-blur-md shadow-2xl pointer-events-auto"
      >
        <p className="text-sm sm:text-base font-semibold text-white">
          {items[selectedIdx].caption}
        </p>
        <p className="text-[11px] sm:text-xs text-white/80 mt-1">
          {items[selectedIdx].alt}
        </p>
      </div>
    </div>,
    document.body
  );
}
