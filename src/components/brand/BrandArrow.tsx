import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Flecha de marca. La punta es media gota —el mismo trazo curvo del isotipo—
 * en lugar del ángulo recto de una flecha genérica.
 *
 * PROVISIONAL, como el isotipo: cuando llegue el SVG oficial de Monarca, la
 * punta se redibuja con su curva real.
 */
export function BrandArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" aria-hidden="true" className={className}>
      <path d="M2 12h24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M17 3c2.5 5 6.5 8 11 9-4.5 1-8.5 4-11 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Botón redondo con flecha. Al pasar el mouse, la flecha sale por la derecha y
 * entra otra desde la izquierda: el movimiento apunta a dónde lleva el enlace.
 */
export function RoundArrowLink({
  href,
  label,
  tone = "light",
  className = "",
}: {
  href: string;
  /** Texto para lectores de pantalla: el botón no tiene texto visible. */
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-colors duration-300",
        tone === "light" ? "bg-page text-ink hover:bg-gold" : "bg-ink text-page hover:bg-terra",
        className,
      )}
    >
      <BrandArrow className="h-5 w-auto transition-transform duration-300 ease-out group-hover:translate-x-12 motion-reduce:transition-none" />
      <BrandArrow className="absolute h-5 w-auto -translate-x-12 transition-transform duration-300 ease-out group-hover:translate-x-0 motion-reduce:hidden" />
    </Link>
  );
}
