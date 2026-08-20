import { useEffect, useRef, type RefObject } from "react";

/**
 * Posición del puntero, relativa a un contenedor si se pasa uno.
 *
 * Guarda el valor en una ref y no en estado a propósito: esto se lee en cada
 * frame de animación, y con estado provocaría un render por movimiento de
 * mouse.
 */
export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>,
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Sigue calculando la posición aunque el puntero salga del contenedor.
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
};
