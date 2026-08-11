import type { Locale } from "@/content/site";
import { destinations } from "@/content/site";

/**
 * Mapa del país completo con el núcleo operativo marcado.
 *
 * El brief pide alcance nacional sin sobrevender cobertura: el país entero se
 * dibuja, pero sólo se marcan los destinos donde hoy hay operación. La forma
 * se genera proyectando coordenadas reales, no con un trazo dibujado a mano,
 * para que sumar un destino sea agregar una línea en `site.ts`.
 */

type Point = [lon: number, lat: number];

const MAINLAND: Point[] = [
  [-114.8, 31.7], [-111.0, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6],
  [-102.5, 29.8], [-101.4, 29.8], [-100.0, 28.2], [-99.5, 27.5], [-97.9, 26.1],
  [-97.5, 25.0], [-97.7, 23.7], [-97.8, 22.3], [-97.4, 21.3], [-96.4, 19.9],
  [-95.0, 18.7], [-94.4, 18.2], [-93.0, 18.5], [-92.0, 18.6], [-91.4, 18.6],
  [-90.7, 19.8], [-90.4, 21.0], [-89.0, 21.6], [-87.7, 21.5], [-86.8, 21.2],
  [-87.0, 20.2], [-87.4, 19.6], [-87.8, 18.5], [-89.0, 18.0], [-90.4, 17.8],
  [-91.4, 17.2], [-91.0, 16.1], [-92.2, 15.3], [-92.2, 14.6], [-93.9, 16.1],
  [-95.2, 16.2], [-96.5, 15.7], [-98.0, 16.3], [-99.9, 16.8], [-101.5, 17.9],
  [-103.5, 18.8], [-104.8, 19.3], [-105.7, 20.4], [-105.5, 21.5], [-106.4, 23.2],
  [-108.9, 25.5], [-109.9, 27.1], [-110.9, 27.9], [-112.8, 30.0], [-113.5, 31.2],
];

const BAJA: Point[] = [
  [-117.1, 32.5], [-116.6, 31.5], [-116.2, 30.5], [-115.2, 28.5], [-114.5, 27.8],
  [-114.8, 27.0], [-112.9, 25.2], [-112.1, 24.4], [-110.9, 23.4], [-109.9, 23.6],
  [-109.5, 24.3], [-110.6, 25.0], [-111.6, 26.0], [-112.2, 27.0], [-113.1, 28.4],
  [-114.0, 29.3], [-114.7, 30.5], [-115.0, 31.7], [-115.3, 32.0],
];

const BOUNDS = { minLon: -118.5, maxLon: -85.5, minLat: 14.0, maxLat: 33.2 };
const W = 1000;
const H = 640;
/** Aire a la derecha para que las etiquetas del Caribe no queden cortadas. */
const LABEL_GUTTER = 250;

function project([lon, lat]: Point): [number, number] {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * W;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function toPath(points: Point[]): string {
  return points.map((p) => project(p).join(",")).join(" ");
}

export default function MapMexico({ locale }: { locale: Locale }) {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W + LABEL_GUTTER} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={
          locale === "es"
            ? "Mapa de México con el núcleo operativo de RÜHA marcado en Cancún, Playa del Carmen, Tulum y Mérida."
            : "Map of Mexico with RÜHA's operating core marked in Cancún, Playa del Carmen, Tulum and Mérida."
        }
      >
        <polygon
          points={toPath(MAINLAND)}
          fill="rgba(136,91,61,0.16)"
          stroke="rgba(237,235,223,0.34)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points={toPath(BAJA)}
          fill="rgba(136,91,61,0.16)"
          stroke="rgba(237,235,223,0.34)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {destinations.map((destination, index) => {
          const [x, y] = project([destination.lon, destination.lat]);
          const toLeft = destination.side === "left";
          // La guía sale del punto, se separa en horizontal y sube o baja hasta
          // la altura de su etiqueta.
          const elbowX = toLeft ? x - 28 : x + 28;
          const labelY = y + destination.labelDy;
          const textX = toLeft ? elbowX - 10 : elbowX + 10;
          return (
            <g key={destination.id}>
              {/* El pulso va en CSS y no en SMIL para que respete
                  prefers-reduced-motion. */}
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="rgba(165,79,12,0.35)"
                className="map-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
              <circle cx={x} cy={y} r="6" fill="#A54F0C" />
              <polyline
                points={`${x},${y} ${elbowX},${y} ${elbowX},${labelY}`}
                fill="none"
                stroke="rgba(237,235,223,0.34)"
                strokeWidth="1"
              />
              <text
                x={textX}
                y={labelY + 7}
                textAnchor={toLeft ? "end" : "start"}
                fill="#EDEBDF"
                fontSize="21"
                fontFamily="var(--font-sans)"
              >
                {destination.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
