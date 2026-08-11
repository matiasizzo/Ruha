import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases } from "@/content/site";
import { isLocale, t } from "@/lib/i18n";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Cases" : "Casos" };
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const blocks = [
    { key: "problem", label: { es: "El problema", en: "The problem" } },
    { key: "action", label: { es: "Qué hicimos", en: "What we did" } },
    { key: "result", label: { es: "Resultado", en: "Result" } },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Casos" : "Cases"}
        title={
          locale === "es"
            ? "Problema, qué hicimos, resultado."
            : "Problem, what we did, result."
        }
        intro={
          locale === "es"
            ? "Sin adornos. Es la forma más rápida de entender cómo trabajamos."
            : "No embellishment. It's the fastest way to understand how we work."
        }
      />

      <Section>
        <div className="flex flex-col gap-16">
          {cases.map((item, index) => (
            <Reveal key={item.slug} delay={index * 100} className="border-t border-hairline pt-12">
              <h2 className="display max-w-4xl text-[clamp(1.75rem,4vw,3rem)] text-cream">
                {t(item.title, locale)}
              </h2>
              <dl className="mt-12 grid gap-10 lg:grid-cols-3">
                {blocks.map((block) => (
                  <div key={block.key}>
                    <dt className="eyebrow mb-4">{t(block.label, locale)}</dt>
                    <dd
                      className={`text-[16px] leading-relaxed ${
                        block.key === "result" ? "text-cream" : "text-cream-dim"
                      }`}
                    >
                      {t(item[block.key], locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        {/* TODO: sumar un segundo caso —IXUH da para uno de condohotel— cuando
            el cliente confirme cifras publicables. */}
      </Section>

      <CTABand locale={locale} />
    </>
  );
}
