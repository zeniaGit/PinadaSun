"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Envuelve contenido y lo revela al entrar en el viewport. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rv ${inView ? "in" : ""} ${className}`}
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Titular que aparece línea a línea tras una máscara (uso en hero). */
export function MaskLines({
  lines,
  lineClassName = "",
  stagger = 140,
  delay = 150,
}: {
  lines: ReactNode[];
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${go ? "in" : ""}`}>
          <span
            className={lineClassName}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
