import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand, purpose, team, values } from "@/content/site";
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
  return { title: locale === "en" ? "About" : "Quiénes somos" };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Quiénes somos" : "About"}
        title={
          locale === "es"
            ? "Empezamos administrando villas. Hoy abrimos hoteles de marca."
            : "We started managing villas. Today we open branded hotels."
        }
        intro={
          locale === "es"
            ? `${brand.name} —razón social ${brand.legalName}— es una operadora hotelera y administradora de propiedades en México, con base en la Riviera Maya.`
            : `${brand.name} — legally ${brand.legalName} — is a hotel operator and property manager in Mexico, based in the Riviera Maya.`
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Origen" : "Origin"}
              title={locale === "es" ? "De la villa al hotel" : "From villa to hotel"}
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-6">
            <p className="lead">
              {locale === "es"
                ? "Nacimos administrando villas boutique de renta vacacional en la Riviera Maya. Ese trabajo —trato directo con el propietario, cuidado del activo, cuentas claras cada mes— es el que nos enseñó el oficio."
                : "We started out managing boutique vacation-rental villas in the Riviera Maya. That work — dealing directly with the owner, caring for the asset, clear accounts every month — is what taught us the trade."}
            </p>
            <p className="lead">
              {locale === "es"
                ? "De ahí evolucionamos a la operación hotelera bajo marcas de franquicia internacional. Hoy operamos con Wyndham e IHG, y seguimos administrando patrimonio privado en la región."
                : "From there we moved into hotel operations under international franchise brands. Today we operate with Wyndham and IHG, and we still manage private assets across the region."}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* La misión y la visión existen porque los franquiciantes y los
          desarrolladores las piden. En el sitio van en tres frases; la versión
          larga vive en el deck. */}
      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Postura" : "Where we stand"}
            title={locale === "es" ? "Propósito, rumbo y método" : "Purpose, direction and method"}
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {purpose.map((item, index) => (
            <Reveal key={index} delay={index * 100} className="bg-cacao-deep p-8 lg:p-10">
              <p className="eyebrow mb-5">{t(item.label, locale)}</p>
              <p className="text-[17px] leading-relaxed text-cream lg:text-[19px]">
                {t(item.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Valores" : "Values"}
            title={
              locale === "es"
                ? "Cinco que aplicamos, no cinco genéricos"
                : "Five we actually apply, not five generic ones"
            }
          />
        </Reveal>
        <div className="mt-12 flex flex-col">
          {values.map((value, index) => (
            <Reveal
              key={index}
              delay={index * 80}
              className="grid gap-3 border-t border-hairline py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-12"
            >
              <h3 className="text-h3 font-medium leading-tight text-cream">
                {t(value.title, locale)}
              </h3>
              <p className="prose-body">{t(value.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Socios fundadores" : "Founding partners"}
            title={locale === "es" ? "Quién responde" : "Who answers"}
          />
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 100} className="flex flex-col gap-4">
              {/* TODO: retratos de los tres socios. */}
              <div
                className="grain aspect-[4/5] w-full"
                style={{
                  background: "linear-gradient(160deg,rgba(136,91,61,0.42) 0%,rgba(39,20,6,1) 78%)",
                }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-h3 font-medium text-cream">{member.name}</h3>
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
    </>
  );
}
