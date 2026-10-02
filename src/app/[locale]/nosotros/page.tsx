import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand, history, purpose, story, team, values } from "@/content/site";
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
        eyebrow={
          brand.founded
            ? locale === "es"
              ? `Quiénes somos · Desde ${brand.founded}`
              : `About · Since ${brand.founded}`
            : locale === "es"
              ? "Quiénes somos"
              : "About"
        }
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

      {/* Historia. La devolución pidió el año de fundación y un relato en lugar
          de un párrafo institucional. */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Nuestra historia" : "Our story"}
              title={locale === "es" ? "De la villa al hotel" : "From villa to hotel"}
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-6">
            {story.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "lead text-ink" : "lead"}
              >
                {t(paragraph, locale)}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Hitos. Un año sin confirmar se muestra como pendiente, no se inventa. */}
        <ol className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {history.map((milestone, index) => (
            <Reveal key={index} delay={index * 90} as="li" className="panel flex flex-col gap-3 p-7">
              {milestone.year ? (
                <span className="display text-h2 text-terra">{milestone.year}</span>
              ) : (
                <span className="display text-h2 text-ink-faint" title={locale === "es" ? "Año por confirmar" : "Year to be confirmed"}>
                  ····
                </span>
              )}
              <p className="text-[15px] leading-snug text-ink">{t(milestone.label, locale)}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* La misión y la visión existen porque los franquiciantes y los
          desarrolladores las piden. En el sitio van en tres frases; la versión
          larga vive en el deck. */}
      <Section className="border-t border-line bg-page-alt">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Postura" : "Where we stand"}
            title={locale === "es" ? "Propósito, rumbo y método" : "Purpose, direction and method"}
          />
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {purpose.map((item, index) => (
            <Reveal key={index} delay={index * 100} className="panel p-8 lg:p-10">
              <p className="eyebrow mb-5">{t(item.label, locale)}</p>
              <p className="text-[17px] leading-relaxed text-ink lg:text-[19px]">
                {t(item.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
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
              className="grid gap-3 border-t border-line py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-12"
            >
              <h3 className="text-h3 font-medium leading-tight text-ink">
                {t(value.title, locale)}
              </h3>
              <p className="prose-body">{t(value.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-page-alt">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Socios fundadores" : "Founding partners"}
            title={locale === "es" ? "Nuestros líderes" : "Our leaders"}
            intro={
              locale === "es"
                ? `Están en las propiedades, no sólo en la junta. Para cualquier consulta, el primer contacto es nuestro equipo de operación: ${brand.email}.`
                : `They are at the properties, not only in the boardroom. For any enquiry, our operations team is the first point of contact: ${brand.email}.`
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 100} className="flex flex-col gap-4">
              {/* TODO: retratos de los tres socios. */}
              <div
                className="photo-placeholder grain aspect-[4/5] w-full rounded-3xl"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-h3 font-medium text-ink">{member.name}</h3>
                <p className="mt-1 text-[13px] tracking-normal text-gold-ink">
                  {t(member.role, locale)}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
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
