import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "@/content/site";
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
  return { title: locale === "en" ? "Contact" : "Contacto" };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Contacto" : "Contact"}
        title={
          locale === "es"
            ? "Cuéntanos del activo y te decimos qué haríamos con él."
            : "Tell us about the asset and we'll tell you what we'd do with it."
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24">
          <Reveal>
            <div className="flex flex-col gap-10">
              <div>
                <p className="eyebrow mb-4">{locale === "es" ? "Base" : "Based in"}</p>
                <p className="text-[17px] leading-relaxed text-cream">
                  {locale === "es" ? "Riviera Maya, México" : "Riviera Maya, Mexico"}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-cream-dim">
                  {locale === "es"
                    ? "Operación en Tulum, Playa del Carmen, Cancún y Mérida."
                    : "Operations in Tulum, Playa del Carmen, Cancún and Mérida."}
                </p>
              </div>

              <div>
                <p className="eyebrow mb-4">{locale === "es" ? "Correo" : "Email"}</p>
                {/* TODO: correo definitivo, atado al dominio que se elija. */}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-[17px] text-cream underline underline-offset-4 transition-colors hover:text-gold"
                >
                  {brand.email}
                </a>
              </div>

              <div>
                <p className="eyebrow mb-4">LinkedIn</p>
                <a
                  href={brand.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] text-cream underline underline-offset-4 transition-colors hover:text-gold"
                >
                  {brand.name} Hospitality Group ↗
                </a>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="max-w-md text-[14px] leading-relaxed text-cream-faint">
                  {locale === "es"
                    ? "Si eres propietario de una unidad en una de nuestras propiedades, usa el Portal de Propietarios en el menú: ahí está tu estado de cuenta."
                    : "If you own a unit in one of our properties, use the Owners' Portal in the menu: your statement is there."}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm kind="contact" locale={locale} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
