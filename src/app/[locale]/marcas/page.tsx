import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brandGroups, brands } from "@/content/site";
import { isLocale, t } from "@/lib/i18n";
import BrandStrip from "@/components/BrandStrip";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, SectionHead } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Brands" : "Marcas" };
}

/** Qué gana un propietario al entrar a una franquicia internacional. */
const benefits = [
  {
    title: { es: "Distribución global", en: "Global distribution" },
    body: {
      es: "El hotel entra a los canales de venta del grupo desde el día uno, con tarifas corporativas y acuerdos que una operación independiente tarda años en construir.",
      en: "The hotel enters the group's sales channels from day one, with corporate rates and agreements an independent operation takes years to build.",
    },
  },
  {
    title: { es: "Programa de lealtad", en: "Loyalty programme" },
    body: {
      es: "Millones de socios con motivo para elegir tu propiedad por sobre la de al lado. Es demanda que no se compra con publicidad.",
      en: "Millions of members with a reason to choose your property over the one next door. That is demand you cannot buy with advertising.",
    },
  },
  {
    title: { es: "Estándares de operación", en: "Operating standards" },
    body: {
      es: "Manuales, auditorías y capacitación del franquiciante. El estándar deja de depender del criterio de quien opera.",
      en: "The franchisor's manuals, audits and training. The standard stops depending on the operator's own judgement.",
    },
  },
  {
    title: { es: "Valor del activo", en: "Asset value" },
    body: {
      es: "Una propiedad con bandera internacional y operación auditada se financia, se vende y se valúa distinto que una independiente.",
      en: "A property with an international flag and audited operations is financed, sold and valued differently from an independent one.",
    },
  },
];

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Marcas" : "Brands"}
        title={
          locale === "es"
            ? "No vendemos una bandera. Elegimos la que le sirve a tu activo."
            : "We don't sell one flag. We choose the one your asset needs."
        }
        intro={
          locale === "es"
            ? "Operamos bajo marcas de Wyndham e IHG. Esa es la ventaja frente a una cadena: el dueño no está casado con nuestro logo."
            : "We operate under Wyndham and IHG brands. That is the advantage over a chain: the owner isn't tied to our logo."
        }
      />

      <Section>
        <Reveal>
          <BrandStrip locale={locale} showSegment />
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {brandGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 100} className="panel p-8 lg:p-12">
              <h2 className="display text-h2 text-cream">{group.name}</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-cream-dim">
                {t(group.blurb, locale)}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {brands
                  .filter((item) => item.group === (group.id === "ihg" ? "IHG" : "Wyndham"))
                  .map((item) => (
                    <li
                      key={item.id}
                      className="border border-hairline px-4 py-2 text-[13px] tracking-normal text-cream-dim"
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Para el propietario" : "For the owner"}
            title={
              locale === "es"
                ? "Qué gana tu activo al entrar a una franquicia"
                : "What your asset gains inside a franchise"
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={index * 90} className="panel p-8 lg:p-10">
              <h3 className="text-h3 font-medium text-cream">{t(benefit.title, locale)}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cream-dim">
                {t(benefit.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>

        {/* El uso público de marca de franquicia suele requerir aprobación del
            franquiciante: los bloques de arriba son fáciles de intercambiar. */}
      </Section>

      <CTABand locale={locale} />
    </>
  );
}
