import Link from "next/link";
import type { Locale } from "@/content/site";
import { href, routes, ui } from "@/lib/i18n";
import { Container } from "./Section";
import { ButtonLink } from "@/components/ui/button";

/**
 * Cierre de página. El brief es claro en que el sitio no vende noches: vende
 * la conversación con el dueño del activo, así que cada página termina acá.
 */
export default function CTABand({ locale }: { locale: Locale }) {
  return (
    <section className="grain relative overflow-hidden border-t border-hairline bg-cacao-raised">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 120% at 85% 0%, rgba(218,173,75,0.16), transparent 60%), radial-gradient(70% 90% at 0% 100%, rgba(165,79,12,0.22), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-20 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">
              {locale === "es" ? "Para desarrolladores y dueños" : "For developers and owners"}
            </p>
            <h2 className="display text-h1 text-cream">
              {locale === "es" ? (
                <>
                  Tienes un activo.
                  <br />
                  Nosotros sabemos operarlo.
                </>
              ) : (
                <>
                  You have an asset.
                  <br />
                  We know how to operate it.
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cream-dim">
              {locale === "es"
                ? "Descarga el deck corporativo con los modelos de operación, el portafolio y el proceso completo, o escríbenos y lo vemos sobre tu proyecto."
                : "Download the corporate deck with our operating models, portfolio and full process, or write to us and we'll go through it on your project."}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={href(locale, routes.deck)} variant="primary" arrow>
              {ui("downloadDeck", locale)}
            </ButtonLink>
            <ButtonLink href={href(locale, routes.contact)} variant="secondary" arrow>
              {ui("talkToUs", locale)}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
