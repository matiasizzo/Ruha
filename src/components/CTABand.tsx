import Link from "next/link";
import type { Locale } from "@/content/site";
import { href, routes, ui } from "@/lib/i18n";
import { Container } from "./Section";

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
            <h2 className="display text-[clamp(2rem,4.8vw,3.75rem)] text-cream">
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
            <Link
              href={href(locale, routes.deck)}
              className="bg-cream px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cacao transition-colors hover:bg-gold"
            >
              {ui("downloadDeck", locale)}
            </Link>
            <Link
              href={href(locale, routes.contact)}
              className="border border-hairline-strong px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {ui("talkToUs", locale)}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
