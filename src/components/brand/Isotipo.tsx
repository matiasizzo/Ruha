import type { CSSProperties } from "react";
import { ISOTIPO_PATH, ISOTIPO_VIEWBOX } from "./logo-paths";

/**
 * Isotipo de RÜHA: la gota, en su versión oficial.
 *
 * El color sale de `currentColor`, así que la variante se elige con una clase
 * de texto: `text-terra`, `text-cacao` o `text-cream` son las tres del manual.
 *
 * A tamaños chicos la gota pierde legibilidad: como marca de agua va grande y
 * tenue, y como ícono no baja de unos 24px de alto.
 */
export default function Isotipo({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={ISOTIPO_VIEWBOX}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ISOTIPO_PATH} />
    </svg>
  );
}
