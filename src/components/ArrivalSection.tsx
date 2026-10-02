"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Sección que avisa cuando "llegó": cuando su borde superior entra en el 20%
 * de arriba de la pantalla, o sea, cuando ya está prácticamente completa a la
 * vista. Marca `data-arrived="true"` y las piezas con la clase `arrive-item`
 * hacen su animación en ese momento, no apenas asoman.
 *
 * Así el efecto de las fotos se ve entero, y no empezado a medias mientras el
 * bloque todavía está subiendo.
 *
 * El estado oculto lo pone el JavaScript al montar: si el JS no corre, la
 * sección se renderiza sin el atributo y todo queda visible.
 */
export default function ArrivalSection({
  children,
  className,
  style,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.dataset.arrived = "false";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        node.dataset.arrived = "true";
        // Una vez que llegó, queda: no se vuelve a esconder al subir.
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={className} style={style} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
