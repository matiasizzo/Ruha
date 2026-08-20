import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases y resuelve conflictos de Tailwind (la última gana).
 * Es la convención de shadcn; este proyecto no usa shadcn, pero varios
 * componentes de terceros la dan por sentada.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
