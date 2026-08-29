"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: "page_404_error",
        page_path: window.location.pathname,
        page_url: window.location.href,
      });
    }
  }, []);

  return (
    <div className="flex min-h-svh flex-col justify-between bg-linen px-5 py-12 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Link href="/" className="inline-block transition-transform hover:opacity-90">
          <Logo />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-xl text-center py-16">
        <span className="inline-block rounded-full bg-ocean/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ocean">
          Error 404
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ocean sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Lo sentimos, la página que buscas no existe o ha sido trasladada. Puedes volver al inicio para ver la información de Pinada Sun o realizar tu reserva directa.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-ocean px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-ocean-light transition-all"
          >
            Volver a la página principal
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl text-center text-xs text-ink-soft">
        Pinada Sun Exclusive Living · Orihuela Costa
      </div>
    </div>
  );
}
