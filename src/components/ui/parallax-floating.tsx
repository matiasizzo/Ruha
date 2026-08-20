"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useAnimationFrame } from "motion/react";

import { cn } from "@/lib/utils";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

/**
 * Parallax de puntero. Cada hijo declara su profundidad y deriva siguiendo al
 * mouse: cuanto mayor la profundidad, más se desplaza.
 *
 * Basado en el componente Floating de la librería fancy (danielpetho), con dos
 * cambios respecto del original:
 *
 *  1. Respeta prefers-reduced-motion. El original anima siempre, y este es
 *     justo el tipo de movimiento que molesta a quien lo desactivó: si está
 *     activo, las capas quedan en su posición de reposo.
 *  2. Tipado para React 19, donde useRef(null) produce RefObject<T | null>.
 *
 * Un solo bucle de animación mueve todos los elementos, así que sumar capas no
 * agrega listeners. Aun así conviene no pasarse: el efecto vive de que las
 * profundidades se distingan entre sí, no de la cantidad de piezas.
 */

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  /** Cuánto acompaña el movimiento del puntero. En negativo, va en contra. */
  sensitivity?: number;
  /** Qué tan rápido alcanza la posición objetivo. Más bajo, más inercia. */
  easingFactor?: number;
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >(),
  );
  const mousePositionRef = useMousePositionRef(containerRef);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      });
    },
    [],
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current || reducedMotion) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;

      const targetX = mousePositionRef.current.x * strength;
      const targetY = mousePositionRef.current.y * strength;

      // Interpolación hacia el objetivo: de acá sale la inercia.
      data.currentPosition.x += (targetX - data.currentPosition.x) * easingFactor;
      data.currentPosition.y += (targetY - data.currentPosition.y) * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn("absolute left-0 top-0 h-full w-full", className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

export default Floating;

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  /** Para posicionar la pieza; el transform lo maneja el bucle de animación. */
  style?: CSSProperties;
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
  style,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !context) return;

    const id = idRef.current;
    context.registerElement(id, element, depth ?? 0.01);
    return () => context.unregisterElement(id);
  }, [context, depth]);

  return (
    <div
      ref={elementRef}
      style={style}
      className={cn("absolute will-change-transform", className)}
    >
      {children}
    </div>
  );
};
