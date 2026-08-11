import Link from "next/link";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
import { href, routes, t, ui } from "@/lib/i18n";

/**
 * Portada. Es la tesis del sitio: en una pantalla tienen que quedar los dos
 * mensajes del brief —operadora multimarca y operadora nacional— antes de que
 * el visitante haga scroll.
 *
 * El fondo es una atmósfera construida en CSS a propósito: todavía no hay
 * fotos y los dos hoteles insignia no abren hasta 2026 y 2027. Cuando llegue
 * el material, se sustituye la capa `atmosphere` por la imagen o el video sin
 * tocar el resto de la composición.
 */
export default function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Capa de atmósfera. TODO: reemplazar por foto o video cuando lleguen. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="grain animate-drift absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 78% 8%, rgba(218,173,75,0.30), transparent 58%)," +
              "radial-gradient(95% 75% at 8% 92%, rgba(165,79,12,0.34), transparent 62%)," +
              "radial-gradient(70% 60% at 55% 45%, rgba(136,91,61,0.28), transparent 70%)," +
              "linear-gradient(168deg,#3A2110 0%,#271406 46%,#150902 100%)",
          }}
        />
        {/* Oscurecido inferior, para que el texto siempre tenga contraste
            aunque mañana el fondo sea una foto clara. */}
        <div className="absolute inset-0 bg-gradient-to-t from-cacao via-cacao/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-6 pb-14 pt-36 lg:px-12 lg:pb-20">
        <p className="eyebrow animate-fade-up mb-8" style={{ animationDelay: "120ms" }}>
          {t(brand.tagline, locale)}
        </p>

        <h1
          className="display animate-fade-up max-w-[20ch] text-[clamp(2.75rem,8.2vw,7.5rem)] text-cream"
          style={{ animationDelay: "220ms" }}
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
          className="animate-fade-up mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          style={{ animationDelay: "360ms" }}
        >
          <p className="max-w-xl text-[17px] leading-relaxed text-cream-dim lg:text-[19px]">
            {locale === "es"
              ? "Somos una operadora multimarca: elegimos la marca que le conviene a cada activo en lugar de imponer la nuestra. Trabajamos con Wyndham e IHG, desde la Riviera Maya y para todo el país."
              : "We are a multi-brand operator: we pick the brand that suits each asset instead of imposing our own. We work with Wyndham and IHG, from the Riviera Maya and across the country."}
          </p>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href={href(locale, routes.developers)}
              className="bg-cream px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cacao transition-colors hover:bg-gold"
            >
              {locale === "es" ? "Para desarrolladores" : "For developers"}
            </Link>
            <Link
              href={href(locale, routes.portfolio)}
              className="border border-hairline-strong px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {ui("viewPortfolio", locale)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
