/**
 * Isotipo de RÜHA: la gota.
 *
 * PROVISIONAL. Esto es una aproximación tipográficamente neutra a la gota de
 * Monarca, hecha para poder construir el sistema de profundidad antes de que
 * lleguen los vectoriales. Los tres elementos del isotipo original —contorno,
 * líneas escalonadas y espiral— están separados en capas para que el parallax
 * pueda usarlas por separado.
 *
 * TODO: reemplazar los trazados por el SVG oficial. La estructura de capas y
 * las props se mantienen, así que sustituirlo no toca el resto del sitio.
 *
 * A tamaños chicos la gota pierde legibilidad, así que como marca de agua se
 * usa siempre grande y con opacidad baja; nunca como ícono.
 */

type Layer = "full" | "outline" | "strokes" | "spiral";

/**
 * Espiral logarítmica generada por cálculo, no dibujada a mano: así el trazo
 * queda parejo y se puede afinar cambiando una constante.
 */
function spiralPath(cx: number, cy: number, turns = 2.4, start = 3, growth = 0.29): string {
  const steps = turns * 48;
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / 48) * Math.PI * 2;
    const radius = start * Math.exp(growth * angle);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`);
  }
  return `M${points.join(" L")}`;
}

const SPIRAL = spiralPath(58, 104);

/** Contorno de la gota: punta arriba, panza abajo. */
const OUTLINE =
  "M50 2 C62 34 94 70 94 98 A44 44 0 1 1 6 98 C6 70 38 34 50 2 Z";

/** Líneas escalonadas: leen como terrazas, olas u horizontes. */
const STROKES = [
  { y: 42, x: 42, w: 18 },
  { y: 58, x: 34, w: 34 },
  { y: 74, x: 26, w: 50 },
];

export default function Isotipo({
  layer = "full",
  className = "",
}: {
  layer?: Layer;
  className?: string;
}) {
  const show = (which: Layer) => layer === "full" || layer === which;

  return (
    <svg
      viewBox="0 0 100 148"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {show("outline") && (
        <path d={OUTLINE} stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      )}

      {show("strokes") &&
        STROKES.map((stroke) => (
          <rect
            key={stroke.y}
            x={stroke.x}
            y={stroke.y}
            width={stroke.w}
            height="5"
            rx="2.5"
            fill="currentColor"
          />
        ))}

      {show("spiral") && (
        <path d={SPIRAL} stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      )}
    </svg>
  );
}
