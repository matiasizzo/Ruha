"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retraso en ms, para escalonar elementos de una misma fila. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Revela el contenido cuando entra en pantalla. El estado inicial lo pone el
 * propio componente en el efecto, así que si JS no corre el contenido queda
 * visible en lugar de quedar oculto para siempre.
 */
export default function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    node.dataset.reveal = "";
    node.style.setProperty("--reveal-delay", `${delay}ms`);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.dataset.reveal = "shown";
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
