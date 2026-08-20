"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Capa de profundidad.
 *
 * Un único listener de scroll para toda la página, compartido por todas las
 * capas y sincronizado con requestAnimationFrame: mover tres capas cuesta lo
 * mismo que mover una. Con tres o cuatro capas no hace falta GSAP.
 *
 * Reglas que respeta, y que no son negociables:
 *  - Sólo se mueven capas decorativas. Nunca texto de lectura ni controles.
 *  - Desplazamientos chicos (entre 3% y 15%): más que eso desincroniza los
 *    planos y marea.
 *  - El contenedor recorta con overflow hidden, si no la capa se escapa.
 *  - Con prefers-reduced-motion el efecto no se registra y todo queda quieto.
 */

type Subscriber = (viewportProgress: number) => void;

const subscribers = new Set<Subscriber>();
let frame = 0;
let listening = false;

function notify() {
  frame = 0;
  const viewport = window.innerHeight || 1;
  for (const subscriber of subscribers) subscriber(window.scrollY / viewport);
}

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(notify);
}

function subscribe(subscriber: Subscriber) {
  subscribers.add(subscriber);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    listening = true;
  }
  subscriber(window.scrollY / (window.innerHeight || 1));

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && listening) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      listening = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

export default function Parallax({
  children,
  /** Porcentaje de altura de viewport que la capa se desplaza por pantalla scrolleada. */
  speed,
  className = "",
}: {
  children: ReactNode;
  speed: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.style.willChange = "transform";

    const unsubscribe = subscribe((progress) => {
      node.style.transform = `translate3d(0, ${progress * speed}vh, 0)`;
    });

    return () => {
      unsubscribe();
      node.style.willChange = "";
      node.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
