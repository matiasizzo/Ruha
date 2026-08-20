import Link from "next/link";
import type { Locale } from "@/content/site";
import { brand, brands, destinations } from "@/content/site";
import { href, routes, t, ui } from "@/lib/i18n";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import Isotipo from "./brand/Isotipo";

/**
 * Portada. Es la tesis del sitio: en una pantalla tienen que quedar los dos
 * mensajes del brief —operadora multimarca y operadora nacional— antes de que
 * el visitante haga scroll.
 *
 * El logo va al centro y alrededor flotan, siguiendo al puntero, las marcas con
 * las que se opera y los destinos donde hay operación. No son adornos: son
 * exactamente los dos mensajes, y salen de site.ts, así que sumar una marca o
 * un destino los agrega también acá.
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

/** Posiciones y profundidades de las piezas flotantes, alrededor del centro. */
const SLOTS = [
  { top: "14%", left: "7%", depth: 0.6 },
  { top: "9%", left: "31%", depth: 1.4 },
  { top: "17%", left: "63%", depth: 2.2 },
  { top: "11%", left: "83%", depth: 0.9 },
  { top: "47%", left: "4%", depth: 1.8 },
  { top: "54%", left: "85%", depth: 2.6 },
  { top: "77%", left: "13%", depth: 3.2 },
  { top: "81%", left: "64%", depth: 1.1 },
];

function FloatingLabel({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="border border-hairline bg-cacao-deep/45 px-4 py-2.5 backdrop-blur-[2px]">
      <p className="whitespace-nowrap text-[13px] font-medium text-cream/85">{label}</p>
      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream-faint">
        {meta}
      </p>
    </div>
  );
}

export default function Hero({ locale }: { locale: Locale }) {
  // Se intercalan marcas y destinos para que ninguno de los dos mensajes
  // quede agrupado en una esquina.
  const pieces = [
    { label: destinations[0].name, meta: locale === "es" ? "Destino" : "Destination" },
    { label: brands[0].name, meta: brands[0].group },
    { label: destinations[1].name, meta: locale === "es" ? "Destino" : "Destination" },
    { label: brands[3].name, meta: brands[3].group },
    { label: brands[2].name, meta: brands[2].group },
    { label: destinations[2].name, meta: locale === "es" ? "Destino" : "Destination" },
    { label: destinations[3].name, meta: locale === "es" ? "Destino" : "Destination" },
    { label: brands[1].name, meta: brands[1].group },
  ];

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

        {pieces.map((piece, index) => (
          <FloatingElement
            key={piece.label}
            depth={SLOTS[index].depth}
            className="animate-fade-up"
            style={{ top: SLOTS[index].top, left: SLOTS[index].left }}
          >
            <FloatingLabel label={piece.label} meta={piece.meta} />
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
          className="display animate-fade-up mt-10 max-w-[18ch] text-[clamp(1.75rem,4.4vw,3.5rem)] text-cream"
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
          <Link
            href={href(locale, routes.developers)}
            className="bg-cream px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cacao transition-colors duration-200 hover:bg-gold"
          >
            {locale === "es" ? "Para desarrolladores" : "For developers"}
          </Link>
          <Link
            href={href(locale, routes.portfolio)}
            className="border border-hairline-strong px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-gold hover:text-gold"
          >
            {ui("viewPortfolio", locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
