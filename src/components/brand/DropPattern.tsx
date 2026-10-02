import { useId } from "react";
import { OUTLINE } from "./Isotipo";

/**
 * Patrón de gotas para fondos. Es decoración pura: va siempre tenue, detrás
 * del contenido y oculto para lectores de pantalla.
 *
 * Las gotas se alternan en tresbolillo para que el patrón no se lea como una
 * cuadrícula, y se desvanece hacia abajo para no competir con el texto.
 */
export default function DropPattern({
  className = "",
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="100%">
      <defs>
        <pattern id={`drop-${id}`} width="120" height="176" patternUnits="userSpaceOnUse">
          <g transform="translate(14 8) scale(0.36)" stroke="currentColor" strokeWidth="5" fill="none">
            <path d={OUTLINE} />
          </g>
          <g transform="translate(74 96) scale(0.36)" stroke="currentColor" strokeWidth="5" fill="none">
            <path d={OUTLINE} />
          </g>
        </pattern>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`mask-${id}`}>
          <rect width="100%" height="100%" fill={`url(#fade-${id})`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#drop-${id})`}
        mask={`url(#mask-${id})`}
        opacity={opacity}
      />
    </svg>
  );
}
