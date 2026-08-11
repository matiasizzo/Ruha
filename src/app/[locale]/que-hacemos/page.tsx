import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { operatingModels, privatePortfolioNote, services } from "@/content/site";
import { isLocale, t } from "@/lib/i18n";
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
  return { title: locale === "en" ? "What we do" : "Qué hacemos" };
}

export default async function WhatWeDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Qué hacemos" : "What we do"}
        title={
          locale === "es"
            ? "Operamos el activo y respondemos por sus números."
            : "We operate the asset and answer for its numbers."
        }
        intro={
          locale === "es"
            ? "Tres modelos de operación, un mismo estándar: el del franquiciante. Y un mismo compromiso: reporteo mensual sin letra chica."
            : "Three operating models, one standard: the franchisor's. And one commitment: monthly reporting with no fine print."
        }
      />

      <Section>
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Modelos" : "Models"}
            title={locale === "es" ? "Cómo se estructura cada activo" : "How each asset is structured"}
          />
        </Reveal>

        <div className="mt-14 flex flex-col">
          {operatingModels.map((model, index) => (
            <Reveal
              key={model.id}
              delay={index * 90}
              className="grid gap-6 border-t border-hairline py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14"
            >
              <div>
                <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-cream">
                  {t(model.title, locale)}
                </h3>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-terra">
                  {t(model.example, locale)}
                </p>
              </div>
              <p className="text-[17px] leading-relaxed text-cream-dim lg:text-[19px]">
                {t(model.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-[15px] leading-relaxed text-cream-faint">
            {t(privatePortfolioNote, locale)}
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Servicios" : "Services"}
            title={locale === "es" ? "Lo que entra en el contrato" : "What the contract covers"}
          />
        </Reveal>
        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 60} as="li" className="bg-cacao-deep px-6 py-8">
              <p className="text-[16px] leading-snug text-cream">{t(service, locale)}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTABand locale={locale} />
    </>
  );
}
