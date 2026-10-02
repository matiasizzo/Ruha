import type { Audience, Locale } from "@/content/site";
import { audiences } from "@/content/site";
import { href, routes, t } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DropPattern from "./brand/DropPattern";
import Reveal from "./Reveal";

/**
 * Bloques por audiencia: los tres modelos de operación del brief, contados
 * desde quien llega al sitio. Es el esquema de Chaletô ("I own…", "I want to
 * invest…", "I'm planning to build…") adaptado a RÜHA.
 *
 * En escritorio cada bloque mide una pantalla y es sticky: al bajar, el
 * siguiente sube y tapa al anterior, sin una línea de JavaScript. En móvil se
 * apilan normal, porque una pantalla fija con este texto no entra.
 *
 * Las fotos son PROVISIONALES (stock) y viven en site.ts.
 */

const TONES: Record<
  Audience["tone"],
  { section: string; body: string; button: "light" | "dark"; pattern?: string }
> = {
  // Crema sobre terracota: 5.09:1.
  terra: { section: "bg-terra text-page", body: "text-page", button: "light" },
  cacao: {
    section: "bg-cacao text-page",
    body: "text-page/80",
    button: "light",
    pattern: "text-gold",
  },
  cream: { section: "bg-page-alt text-ink", body: "text-ink-soft", button: "dark" },
};

const LINKS: Record<string, string> = {
  patrimonial: routes.what,
  condohotel: routes.developers,
  rental: routes.contact,
};

export default function AudienceStack({ locale }: { locale: Locale }) {
  return (
    <div>
      {audiences.map((audience, index) => {
        const tone = TONES[audience.tone];
        return (
          <section
            key={audience.id}
            aria-labelledby={`audience-${audience.id}`}
            // z-index creciente: cada bloque tapa al anterior al apilarse.
            style={{ zIndex: index + 1 }}
            className={cn(
              "relative overflow-hidden lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-[720px]",
              tone.section,
            )}
          >
            {tone.pattern && (
              <DropPattern className={cn("pointer-events-none absolute inset-0", tone.pattern)} opacity={0.1} />
            )}

            <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col gap-12 px-6 pb-20 pt-24 lg:px-12 lg:pt-32">
              <Reveal>
                <h2
                  id={`audience-${audience.id}`}
                  className="max-w-[16ch] text-[clamp(2.75rem,6vw,5rem)] font-medium italic leading-[1.05] tracking-[-0.025em]"
                >
                  {t(audience.title, locale)}
                </h2>
              </Reveal>

              <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
                <Reveal delay={120} className="flex max-w-xl flex-col gap-6">
                  <p className="text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium leading-snug">
                    {t(audience.lead, locale)}
                  </p>
                  <p className={cn("text-[16px] leading-[1.75]", tone.body)}>
                    {t(audience.body, locale)}
                  </p>
                  <div className="pt-2">
                    <ButtonLink href={href(locale, LINKS[audience.id])} variant={tone.button} arrow>
                      {t(audience.cta, locale)}
                    </ButtonLink>
                  </div>
                </Reveal>

                {/* Dos fotos desfasadas: una alta arriba, otra apaisada más abajo
                    y corrida, como en Chaletô. En móvil van en fila. */}
                <div className="relative grid grid-cols-2 gap-4 lg:block lg:min-h-[420px]">
                  <Reveal
                    delay={200}
                    className="aspect-[0.93] overflow-hidden lg:absolute lg:right-[34%] lg:top-0 lg:w-[42%]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={audience.images[0]} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </Reveal>
                  <Reveal
                    delay={320}
                    className="aspect-[1.39] self-end overflow-hidden lg:absolute lg:right-0 lg:top-44 lg:w-[48%]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={audience.images[1]} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
