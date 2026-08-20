import Link from "next/link";
import type { Locale } from "@/content/site";
import { brand, heroMedia } from "@/content/site";
import { href, routes, t, ui } from "@/lib/i18n";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import Isotipo from "./brand/Isotipo";
import { ButtonLink } from "@/components/ui/button";

/**
 * Portada. Es la tesis del sitio: en una pantalla tienen que quedar los dos
 * mensajes del brief —operadora multimarca y operadora nacional— antes de que
 * el visitante haga scroll.
 *
 * El logo va al centro y alrededor flotan, siguiendo al puntero, fotos con su
 * pie. Los pies no son adornos: nombran marcas y destinos reales, que son
 * exactamente los dos mensajes. Salen de heroMedia en site.ts.
 *
 * Tres cosas deliberadas:
 *  - Las piezas flotantes se ocultan en pantallas chicas. El parallax de
 *    puntero no existe en touch, y ocho etiquetas absolutas encima del titular
 *    en un teléfono es un desastre de composición.
 *  - El bloque central no flota. El titular y los botones se quedan quietos.
 *  - El hero es sticky y queda detrás: de ahí sale que las secciones siguientes
 *    suban por encima como una cortina, sin JavaScript.
 *
 * El fondo es una atmósfera en CSS a propósito: todavía no hay fotos y los dos
 * hoteles insignia no abren hasta 2026 y 2027. Cuando llegue el material se
 * sustituye esa capa sin tocar el resto de la composición.
 */

/**
 * Posiciones, profundidades y tamaño de las piezas flotantes.
 *
 * Los tamaños se varían a propósito: si todas las piezas miden lo mismo, la
 * diferencia de profundidad no se lee como profundidad sino como desorden.
 */
const SLOTS = [
  { top: "12%", left: "6%", depth: 0.6, size: "h-24 w-24 lg:h-28 lg:w-28" },
  { top: "7%", left: "28%", depth: 1.4, size: "h-28 w-36 lg:h-32 lg:w-44" },
  { top: "14%", left: "62%", depth: 2.2, size: "h-36 w-28 lg:h-48 lg:w-36" },
  { top: "9%", left: "84%", depth: 0.9, size: "h-24 w-24 lg:h-28 lg:w-28" },
  { top: "44%", left: "3%", depth: 1.8, size: "h-32 w-32 lg:h-40 lg:w-40" },
  { top: "52%", left: "85%", depth: 2.6, size: "h-36 w-28 lg:h-44 lg:w-32" },
  { top: "70%", left: "11%", depth: 3.2, size: "h-40 w-52 lg:h-44 lg:w-64" },
  // Corrida a la derecha: en 63% el marco rozaba el botón del centro.
  { top: "76%", left: "70%", depth: 1.1, size: "h-28 w-28 lg:h-32 lg:w-32" },
];

/**
 * Pieza flotante: la foto con su pie.
 *
 * El pie no es decorativo. Las fotos de hoy son de stock, pero lo que se lee
 * —marca o destino— es real, así que el hero comunica igual los dos mensajes.
 */
function FloatingCard({
  src,
  label,
  meta,
  size,
  delay,
}: {
  src: string;
  label: string;
  meta: string;
  size: string;
  delay: number;
}) {
  return (
    // La animación de entrada va acá y no en el elemento flotante: animate-fade-up
    // anima transform y termina en `transform: none` con fill-mode both, así que
    // su valor final pisaría el transform que escribe el bucle del parallax.
    <figure className="group animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className={`overflow-hidden border border-hairline ${size}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <figcaption className="mt-2">
        <p className="whitespace-nowrap text-[12px] font-medium text-cream/80">{label}</p>
        <p className="text-[12px] tracking-normal text-cream-faint">{meta}</p>
      </figcaption>
    </figure>
  );
}

export default function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="sticky top-0 -z-10 h-[100svh] overflow-hidden">
      {/* Atmósfera. TODO: reemplazar por foto o video cuando lleguen. */}
      <div
        className="grain animate-drift absolute inset-[-8%]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 85% at 78% 8%, rgba(218,173,75,0.30), transparent 58%)," +
            "radial-gradient(95% 75% at 8% 92%, rgba(165,79,12,0.34), transparent 62%)," +
            "radial-gradient(70% 60% at 55% 45%, rgba(136,91,61,0.28), transparent 70%)," +
            "linear-gradient(168deg,#3A2110 0%,#271406 46%,#150902 100%)",
        }}
      />

      {/* Capa flotante. Sensibilidad negativa: las piezas se alejan del
          puntero, que da mejor sensación de profundidad que perseguirlo. */}
      <Floating sensitivity={-1.2} easingFactor={0.06} className="hidden md:block">
        {/* Dos gotas al fondo, en los extremos de profundidad. */}
        <FloatingElement depth={0.4} className="left-[-6%] top-[8%]">
          <Isotipo className="h-[46vh] w-auto text-gold/[0.07]" />
        </FloatingElement>
        <FloatingElement depth={3.6} className="right-[-4%] top-[38%]">
          <Isotipo layer="spiral" className="h-[30vh] w-auto text-terra/[0.10]" />
        </FloatingElement>

        {heroMedia.map((piece, index) => (
          <FloatingElement
            key={piece.label}
            depth={SLOTS[index].depth}
            style={{ top: SLOTS[index].top, left: SLOTS[index].left }}
          >
            <FloatingCard
              src={piece.src}
              label={piece.label}
              meta={piece.meta}
              size={SLOTS[index].size}
              delay={index * 90}
            />
          </FloatingElement>
        ))}
      </Floating>

      {/* Oscurecido: el texto mantiene contraste sobre cualquier fondo. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(21,9,2,0.86),rgba(21,9,2,0.35)_70%,transparent)]"
        aria-hidden="true"
      />

      {/* Bloque central: quieto. */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Isotipo
          className="animate-fade-up h-16 w-auto text-gold lg:h-20"
          style={{ animationDelay: "80ms" }}
        />

        <p
          className="animate-fade-up mt-7 font-medium tracking-[0.34em] text-cream"
          style={{ animationDelay: "180ms", fontSize: "clamp(1.75rem,4vw,2.75rem)" }}
        >
          {brand.name}
        </p>

        <p className="eyebrow animate-fade-up mt-4" style={{ animationDelay: "280ms" }}>
          {t(brand.tagline, locale)}
        </p>

        <h1
          className="display animate-fade-up mt-10 max-w-[18ch] text-h1 text-cream"
          style={{ animationDelay: "380ms" }}
        >
          {locale === "es" ? (
            <>
              Operamos hoteles de <span className="text-gold">marca internacional</span> en México.
            </>
          ) : (
            <>
              We operate <span className="text-gold">internationally branded</span> hotels in Mexico.
            </>
          )}
        </h1>

        <div
          className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "500ms" }}
        >
          <ButtonLink href={href(locale, routes.developers)} variant="primary" arrow>
              {locale === "es" ? "Para desarrolladores" : "For developers"}
            </ButtonLink>
          <ButtonLink href={href(locale, routes.portfolio)} variant="secondary" arrow>
              {ui("viewPortfolio", locale)}
            </ButtonLink>
        </div>
      </div>
    </section>
  );
}
