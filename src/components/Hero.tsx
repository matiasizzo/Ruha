import type { Locale } from "@/content/site";
import { heroVideo } from "@/content/site";
import { href, routes, ui } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import Isotipo from "./brand/Isotipo";
import HeroVideo from "./HeroVideo";

/**
 * Portada: video de dron a sangre, velo oscuro, isotipo al centro y el
 * titular abajo a la izquierda. Es el esquema de Chaletô adaptado a RÜHA.
 *
 * - No ocupa toda la pantalla (unos 740px en escritorio): asoma lo que sigue,
 *   y eso invita a bajar.
 * - El velo al 30% es lo que deja leer el texto blanco sobre cualquier toma.
 *   Si el video final es muy claro, se sube acá y en ningún otro lado.
 * - El isotipo va centrado en el tercio superior, no en el centro exacto: ahí
 *   pisaba la última palabra del titular. Sólo aparece en pantallas grandes.
 */
export default function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative h-[40.75rem] overflow-hidden bg-cacao md:h-[46.375rem]">
      <HeroVideo src={heroVideo.src} poster={heroVideo.poster} />

      {/* Velo: 30% de negro parejo, más un degradado abajo donde va el texto. */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/45 to-transparent"
        aria-hidden="true"
      />

      <Isotipo
        className="animate-fade-up absolute left-1/2 top-[24%] hidden h-32 w-auto -translate-x-1/2 -translate-y-1/2 text-cream xl:block"
        style={{ animationDelay: "200ms" }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-end px-6 pb-12 pt-32 lg:px-12 lg:pb-[7.5rem]">
        <div className="flex max-w-[40rem] flex-col gap-10">
          <h1
            className="animate-fade-up text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white"
            style={{ animationDelay: "300ms" }}
          >
            {locale === "es"
              ? "Operamos hoteles de marca internacional en México."
              : "We operate internationally branded hotels in Mexico."}
          </h1>

          <div
            className="animate-fade-up flex flex-wrap items-center gap-4"
            style={{ animationDelay: "450ms" }}
          >
            <ButtonLink href={href(locale, routes.developers)} variant="dark" arrow>
              {locale === "es" ? "Para desarrolladores" : "For developers"}
            </ButtonLink>
            <ButtonLink href={href(locale, routes.portfolio)} variant="light" arrow>
              {ui("viewPortfolio", locale)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
