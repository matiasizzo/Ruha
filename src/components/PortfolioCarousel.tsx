"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, Property } from "@/content/site";
import { href, routes } from "@/lib/i18n";
import PropertyCard, { SeeAllCard } from "./PropertyCard";

/**
 * Carrusel del portafolio. Reemplaza al zoom del logo, que la devolución
 * calificó —con razón— de efectista.
 *
 * Está hecho sobre scroll horizontal nativo con snap, no con transformaciones:
 * el gesto de arrastrar en touch, la rueda del trackpad y el teclado funcionan
 * sin código extra, y si el JavaScript falla el carrusel sigue siendo una fila
 * que se puede recorrer.
 *
 * Sin autoplay a propósito. Un carrusel que avanza solo obliga a sumar pausa,
 * y además mueve el contenido mientras alguien lo está leyendo.
 *
 * Usa la misma tarjeta que la página de portafolio, y cierra con el bloque
 * "Ver todo", como la grilla de Chaletô.
 */
export default function PortfolioCarousel({
  properties,
  locale,
}: {
  properties: Property[];
  locale: Locale;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Ancho de un paso: una tarjeta más el espacio entre tarjetas. */
  const stepWidth = useCallback(() => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = stepWidth();
    if (step > 0) {
      setCurrent(Math.min(properties.length - 1, Math.round(el.scrollLeft / step)));
    }
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, [properties.length, stepWidth]);

  useEffect(() => {
    sync();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const go = (direction: 1 | -1) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current?.scrollBy({
      left: direction * stepWidth(),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const labels = {
    previous: locale === "es" ? "Propiedad anterior" : "Previous property",
    next: locale === "es" ? "Propiedad siguiente" : "Next property",
    region: locale === "es" ? "Portafolio" : "Portfolio",
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region}>
      <div className="mb-8 flex items-center justify-end gap-3">
        {/* Posición anunciada a lectores de pantalla al cambiar. */}
        <p className="mr-2 text-[14px] tabular text-ink-faint" aria-live="polite">
          {String(current + 1).padStart(2, "0")} / {String(properties.length).padStart(2, "0")}
        </p>
        <ArrowButton label={labels.previous} disabled={atStart} onClick={() => go(-1)}>
          ←
        </ArrowButton>
        <ArrowButton label={labels.next} disabled={atEnd} onClick={() => go(1)}>
          →
        </ArrowButton>
      </div>

      <ul
        ref={track}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 [scrollbar-width:none] lg:-mx-12 lg:scroll-px-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {properties.map((property, index) => (
          <li
            key={property.slug}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${properties.length}`}
            className="w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <PropertyCard property={property} locale={locale} />
          </li>
        ))}
        <li className="w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
          <SeeAllCard href={href(locale, routes.portfolio)} locale={locale} />
        </li>
      </ul>
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line-strong text-[18px] text-ink transition-colors duration-200 hover:border-terra hover:bg-terra hover:text-page active:translate-y-px disabled:cursor-default disabled:opacity-35 disabled:hover:border-line-strong disabled:hover:bg-transparent disabled:hover:text-ink"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
