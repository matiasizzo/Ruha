import { brand } from "@/content/site";

/**
 * Marca denominativa provisional en tipografía.
 *
 * TODO: reemplazar por los vectoriales de Monarca cuando lleguen. Dos
 * restricciones del manual que hay que respetar al hacerlo: la "A" resuelta
 * como gota pierde legibilidad en tamaños chicos —de ahí el mínimo de 18px en
 * el header— y la diéresis nunca se omite.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-medium tracking-[0.3em] text-cream ${className}`}
      aria-label={brand.name}
    >
      {brand.name}
    </span>
  );
}
