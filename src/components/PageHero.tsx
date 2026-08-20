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
    <section className="relative overflow-hidden border-b border-hairline">
      <div
        className="grain pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 90% at 88% 0%, rgba(218,173,75,0.20), transparent 60%)," +
            "radial-gradient(80% 80% at 0% 100%, rgba(165,79,12,0.24), transparent 65%)," +
            "linear-gradient(170deg,#33200F 0%,#271406 60%,#1D0E04 100%)",
        }}
        aria-hidden="true"
      />

      {/* La misma gota del home, en versión corta: mantiene el idioma visual
          entre páginas sin competir con el titular. */}
      <Parallax
        speed={-6}
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[150%] w-auto text-gold/[0.06]"
      >
        <Isotipo layer="outline" className="h-full w-auto" />
      </Parallax>

      <Container className="relative pb-16 pt-40 lg:pb-24 lg:pt-48">
        <p className="eyebrow animate-fade-up mb-6">{eyebrow}</p>
        <h1
          className="display animate-fade-up max-w-[22ch] text-[clamp(2.25rem,6vw,5rem)] text-cream"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="animate-fade-up mt-8 max-w-2xl text-[17px] leading-relaxed text-cream-dim lg:text-[19px]"
            style={{ animationDelay: "220ms" }}
          >
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
