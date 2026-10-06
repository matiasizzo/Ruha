import { brand } from "@/content/site";
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./brand/logo-paths";

/**
 * Logo completo de RÜHA (letras y gota), sin la frase de abajo.
 *
 * El color sale de `currentColor`: se elige con `text-terra`, `text-cacao` o
 * `text-cream`. El tamaño se da con alto y ancho automático (`h-8 w-auto`) o al
 * revés (`w-full h-auto`); la proporción sale del viewBox.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={className}
      fill="currentColor"
      role="img"
      aria-label={brand.name}
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}
