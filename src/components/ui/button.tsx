import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botón del sistema.
 *
 * Hasta ahora los botones estaban copiados a mano en ocho lugares, con
 * variaciones mínimas entre uno y otro. Eso es lo que hacía que se vieran
 * genéricos: no eran un componente, eran ocho rectángulos parecidos.
 *
 * Lo que agrega respecto de lo que había:
 *  - Estado presionado. Sin él, el botón no responde al click y la interfaz
 *    se siente muerta.
 *  - Altura mínima de 48px, por encima del mínimo de 44px de área táctil.
 *  - cursor-pointer, que faltaba.
 *  - Una flecha que se corre en hover: el movimiento apunta a dónde lleva el
 *    botón en lugar de sólo cambiar de color.
 *  - Forma de píldora. El rectángulo a noventa grados con etiqueta en
 *    monoespaciada era el gesto más industrial de todo el sitio.
 *  - Foco visible heredado del global, sin anularlo nunca.
 */

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light";
type Size = "md" | "sm";

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full " +
  "text-[15px] font-medium tracking-normal " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // La acción principal: terracota que vira a café. Crema sobre terracota da 5.09:1.
  primary: "bg-terra text-page shadow-[0_10px_24px_-14px_rgba(165,79,12,0.8)] hover:bg-ink",
  // La alternativa: filete que se enciende.
  secondary:
    "border border-line-strong text-ink hover:border-terra hover:bg-terra/[0.06] hover:text-terra",
  // Para acciones terciarias dentro de bloques densos.
  ghost: "text-ink-soft hover:text-terra",
  // Sobre foto o color: píldora café y píldora crema, como en el hero.
  dark: "bg-ink text-page hover:bg-terra",
  light: "bg-page text-ink hover:bg-gold",
};

const sizes: Record<Size, string> = {
  md: "px-8 py-4",
  sm: "px-6 py-3",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Flecha que se corre en hover. Apagala en botones de formulario. */
  arrow?: boolean;
};

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  if (!arrow) return <>{children}</>;
  return (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
}

/** Botón que navega. Usa Link para rutas internas y ancla para las externas. */
export function ButtonLink({
  href,
  external = false,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  ...props
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn("group", base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        <Content arrow={arrow}>{children}</Content>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

/** Botón que ejecuta una acción. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn("group", base, variants[variant], sizes[size], className)} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
