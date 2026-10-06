import type { ReactNode } from "react";
import Isotipo from "./brand/Isotipo";
import Parallax from "./Parallax";
import { Container } from "./Section";

/**
 * Portada de página interior. Mismo lenguaje que el hero del home pero a media
 * altura: la atmósfera se mantiene, el protagonismo se lo lleva el contenido.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="atmosphere-soft grain pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* La misma gota del home, en versión corta: mantiene el idioma visual
          entre páginas sin competir con el titular. */}
      <Parallax
        speed={-6}
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[150%] w-auto text-cafe/[0.10]"
      >
        <Isotipo className="h-full w-auto" />
      </Parallax>

      <Container className="relative pb-16 pt-40 lg:pb-24 lg:pt-48">
        <p className="eyebrow animate-fade-up mb-6">{eyebrow}</p>
        <h1
          className="display animate-fade-up max-w-[22ch] text-h1 text-ink"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="lead animate-fade-up mt-8 max-w-2xl"
            style={{ animationDelay: "220ms" }}
          >
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
