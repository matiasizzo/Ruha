import Link from "next/link";
import { notFound } from "next/navigation";
import {
  operatingModels,
  privatePortfolioNote,
  properties,
  purpose,
  team,
} from "@/content/site";
import { href, isLocale, routes, t, ui } from "@/lib/i18n";
import BrandStrip from "@/components/BrandStrip";
import CTABand from "@/components/CTABand";
import Hero from "@/components/Hero";
import MapMexico from "@/components/MapMexico";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { Container, Section, SectionHead } from "@/components/Section";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const featured = properties.slice(0, 3);

  return (
    <>
      <Hero locale={locale} />

      {/* Todo lo que sigue sube por encima del hero, que queda fijo detrás:
          de ahí sale el efecto cortina. Necesita fondo propio y opaco, si no
          se transparenta el hero. */}
      <div className="relative z-0 bg-cacao">

      {/* Cifras + marcas: los dos mensajes del brief, demostrados y no
          explicados, apenas termina la portada. */}
      <Section className="border-t border-hairline">
        <StatsBand locale={locale} />

        <Reveal className="mt-16">
          <p className="eyebrow mb-6">
            {locale === "es" ? "Marcas con las que operamos" : "Brands we operate"}
          </p>
          <BrandStrip locale={locale} />
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-cream-dim">
            {locale === "es"
              ? "El dueño no está casado con nuestro logo, sino con la marca que mejor rinde para su producto. Esa es la diferencia entre una operadora multimarca y una cadena."
              : "The owner isn't tied to our logo, but to the brand that performs best for their product. That is the difference between a multi-brand operator and a chain."}
          </p>
        </Reveal>
      </Section>

      {/* Alcance: el país entero dibujado, sólo los destinos reales marcados. */}
      <Section className="border-t border-hairline bg-cacao-deep">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Alcance" : "Reach"}
              title={
                locale === "es" ? (
                  <>
                    Operamos en México.
                    <br />
                    Nuestro núcleo está en el sureste.
                  </>
                ) : (
                  <>
                    We operate in Mexico.
                    <br />
                    Our core is in the southeast.
                  </>
                )
              }
              intro={
                locale === "es"
                  ? "Tulum, Playa del Carmen, Cancún y Mérida concentran hoy la operación. La estructura —equipos, sistemas y relación con franquiciantes— está armada para operar activos en cualquier destino del país."
                  : "Tulum, Playa del Carmen, Cancún and Mérida hold today's operation. The structure — teams, systems and franchisor relationships — is built to operate assets in any destination in the country."
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <MapMexico locale={locale} />
          </Reveal>
        </div>
      </Section>

      {/* Modelos de operación */}
      <Section className="border-t border-hairline">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Modelos de operación" : "Operating models" }
            title={
              locale === "es"
                ? "Tres formas de entregarnos un activo"
                : "Three ways to hand us an asset"
            }
            intro={
              locale === "es"
                ? "Es lo que nos separa de una simple administradora: cada modelo tiene su estructura legal, su operación y su forma de reportar."
                : "This is what separates us from a plain property manager: each model has its own legal structure, operation and reporting."
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {operatingModels.map((model, index) => (
            <Reveal key={model.id} delay={index * 100} className="flex flex-col gap-4 bg-cacao p-8 lg:p-10">
              <h3 className="text-[20px] font-medium leading-tight text-cream">
                {t(model.title, locale)}
              </h3>
              <p className="text-[15px] leading-relaxed text-cream-dim">{t(model.body, locale)}</p>
              <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-terra">
                {t(model.example, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Portafolio destacado */}
      <Section className="border-t border-hairline bg-cacao-deep">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Portafolio" : "Portfolio"}
              title={locale === "es" ? "Lo que operamos hoy" : "What we operate today"}
            />
          </Reveal>
          <Reveal delay={80}>
            <Link
              href={href(locale, routes.portfolio)}
              className="border border-hairline-strong px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {ui("viewPortfolio", locale)}
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((property, index) => (
            <Reveal key={property.slug} delay={index * 100}>
              <PropertyCard property={property} locale={locale} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-[15px] leading-relaxed text-cream-faint">
            {t(privatePortfolioNote, locale)}
          </p>
        </Reveal>
      </Section>

      {/* Postura: la misión y la visión en tres frases, no en tres párrafos. */}
      <Section className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Quiénes somos" : "Who we are"}
              title={locale === "es" ? "Nuestra postura" : "Where we stand"}
            />
          </Reveal>
          <div className="flex flex-col">
            {purpose.map((item, index) => (
              <Reveal
                key={index}
                delay={index * 110}
                className="border-t border-hairline py-8 first:border-t-0 first:pt-0"
              >
                <p className="eyebrow mb-4">{t(item.label, locale)}</p>
                <p className="max-w-2xl text-[19px] leading-relaxed text-cream lg:text-[22px]">
                  {t(item.body, locale)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Equipo: en este negocio se contrata a las personas, no a la empresa. */}
      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Equipo" : "Team"}
            title={
              locale === "es"
                ? "Los socios están en las propiedades"
                : "The partners are at the properties"
            }
            intro={
              locale === "es"
                ? "No sólo en la junta. En este negocio se contrata a las personas, no a la empresa."
                : "Not only in the boardroom. In this business you hire the people, not the company."
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 100} className="flex flex-col gap-4">
              {/* TODO: retratos pendientes. Hasta entonces, un plano de color
                  de marca en lugar de un avatar genérico. */}
              <div
                className="grain aspect-[4/5] w-full"
                style={{
                  background:
                    "linear-gradient(160deg,rgba(136,91,61,0.42) 0%,rgba(39,20,6,1) 78%)",
                }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-[18px] font-medium text-cream">{member.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  {t(member.role, locale)}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-cream-dim">
                  {t(member.bio, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

        <CTABand locale={locale} />
      </div>
    </>
  );
}
