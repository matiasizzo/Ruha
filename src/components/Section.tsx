import type { ReactNode } from "react";

/** Contenedor de ancho máximo, para no repetir la misma clase en cada página. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-6 lg:px-12 ${className}`}>{children}</div>;
}

/** Sección estándar, con el respiro vertical del sistema. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Encabezado de sección: etiqueta mono arriba, titular grande, bajada opcional. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="display text-h1 text-cream">{title}</h2>
      {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
    </div>
  );
}
