import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Corporate deck" : "Deck corporativo",
    // Es una página de conversión, no de posicionamiento.
    robots: { index: false },
  };
}

/**
 * Descarga del deck a cambio del correo.
 *
 * Tiene URL propia a propósito: se comparte por WhatsApp sin obligar a recorrer
 * la página entera, y permite medir de dónde viene cada descarga.
 */
export default async function DeckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const contents =
    locale === "es"
      ? [
          "Quiénes somos y cómo está armada la operación",
          "Los tres modelos de operación, con su estructura legal",
          "Portafolio completo y pipeline al día",
          "El proceso de trabajo, del diagnóstico al reporteo",
          "Marcas con las que operamos y qué implica cada franquicia",
        ]
      : [
          "Who we are and how the operation is structured",
          "The three operating models and their legal structure",
          "Full portfolio and current pipeline",
          "Our process, from diagnosis to monthly reporting",
          "The brands we operate and what each franchise involves",
        ];

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Deck corporativo" : "Corporate deck"}
        title={
          locale === "es"
            ? "Todo lo que preguntarías en la primera llamada, por escrito."
            : "Everything you'd ask on a first call, in writing."
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <p className="eyebrow mb-6">{locale === "es" ? "Qué incluye" : "What's inside"}</p>
            <ul className="flex flex-col">
              {contents.map((item, index) => (
                <li
                  key={index}
                  className="border-t border-hairline py-5 text-[16px] leading-relaxed text-cream-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-[14px] leading-relaxed text-cream-faint">
              {locale === "es"
                ? "Te lo mandamos al correo en cuanto envíes el formulario. Usamos tus datos para hacerte llegar el deck y dar seguimiento; nada más."
                : "We'll email it to you as soon as you submit the form. We use your details to send the deck and follow up; nothing else."}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm kind="deck" locale={locale} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
