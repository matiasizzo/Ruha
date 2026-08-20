import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { properties } from "@/content/site";
import { href, isLocale, routes, t, ui } from "@/lib/i18n";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Upcoming openings" : "Próximas aperturas" };
}

export default async function OpeningsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const openings = properties.filter((property) => property.status === "opening");

  return (
    <>
      <PageHero
        eyebrow={ui("openings", locale)}
        title={
          locale === "es"
            ? "Lo que abre entre 2026 y 2027."
            : "What opens between 2026 and 2027."
        }
        intro={
          locale === "es"
            ? "El pipeline es la mejor prueba de que la operación crece. Estas son las propiedades en pre-apertura."
            : "The pipeline is the clearest proof that the operation is growing. These are the properties in pre-opening."
        }
      />

      <Section>
        <div className="flex flex-col">
          {openings.map((property, index) => (
            <Reveal
              key={property.slug}
              delay={index * 90}
              className="grid gap-8 border-t border-hairline py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16"
            >
              <div>
                {/* TODO: render o foto de obra cuando el cliente los pase. */}
                <div
                  className="grain aspect-[4/3] w-full"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(155deg,#4A2A12 0%,#2E1708 60%,#180B02 100%)"
                        : "linear-gradient(155deg,#3B2312 0%,#271406 55%,#180B02 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-5">
                {property.brandLabel && (
                  <p className="eyebrow">{property.brandLabel}</p>
                )}
                <h2 className="display text-h2 text-cream">
                  {property.name}
                </h2>
                <p className="text-[13px] tracking-normal text-cream-faint">
                  {t(property.city, locale)} · {t(property.state, locale)}
                  {property.keys ? ` · ${property.keys} ${ui("keys", locale)}` : ""}
                </p>
                <p className="max-w-2xl lead">
                  {t(property.summary, locale)}
                </p>

                {property.facts && (
                  <dl className="mt-2 flex flex-col gap-4 border-t border-hairline pt-6">
                    {property.facts.map((fact, factIndex) => (
                      <div key={factIndex} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                        <dt className="eyebrow">{t(fact.label, locale)}</dt>
                        <dd className="prose-body text-small">
                          {t(fact.value, locale)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {property.opening && (
                    <span className="border border-terra px-4 py-2 text-[13px] tracking-normal text-terra">
                      {t(property.opening, locale)}
                    </span>
                  )}
                  {property.href && (
                    <a
                      href={property.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] tracking-normal text-cream-dim underline underline-offset-4 transition-colors hover:text-gold"
                    >
                      {ui("visitSite", locale)} ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <ButtonLink href={href(locale, routes.portfolio)} variant="secondary" arrow>
              {ui("backToPortfolio", locale)}
            </ButtonLink>
        </Reveal>
      </Section>

      <CTABand locale={locale} />
    </>
  );
}
