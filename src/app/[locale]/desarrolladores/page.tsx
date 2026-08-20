import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases, process, services, stats } from "@/content/site";
import { href, isLocale, routes, t, ui } from "@/lib/i18n";
import BrandStrip from "@/components/BrandStrip";
import Counter from "@/components/Counter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, SectionHead } from "@/components/Section";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "For developers" : "Para desarrolladores" };
}

/**
 * La página que vende. Sigue la estructura del brief: el problema, qué
 * entregamos, cómo trabajamos, la prueba y la salida al deck.
 */
export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const mainCase = cases[0];

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Para desarrolladores y dueños" : "For developers and owners"}
        title={
          locale === "es"
            ? "Tienes un activo. O lo estás construyendo. Falta quién lo opere."
            : "You have an asset. Or you're building one. What's missing is who operates it."
        }
        intro={
          locale === "es"
            ? "Elegir operadora es elegir con quién vas a estar los próximos diez años. Esto es lo que hacemos, cómo lo hacemos y con qué lo respaldamos."
            : "Choosing an operator means choosing who you'll be with for the next ten years. This is what we do, how we do it and what backs it up."
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionHead
              eyebrow={locale === "es" ? "Qué entregamos" : "What we deliver"}
              title={
                locale === "es"
                  ? "Del terreno al reporte mensual"
                  : "From the site to the monthly report"
              }
              intro={
                locale === "es"
                  ? "Seleccionamos la marca que más le conviene al activo —somos multimarca, no vendemos una sola bandera—, abrimos llave en mano bajo esa marca y operamos el día a día."
                  : "We select the brand that best fits the asset — we are multi-brand, we don't sell one flag — open turnkey under that brand and run the day-to-day."
              }
            />
          </Reveal>
          <div className="grid gap-4 self-start sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 60} className="panel px-6 py-7">
                <p className="text-[15px] leading-snug text-cream">{t(service, locale)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* El proceso sí es una secuencia real, y por eso va numerado. */}
      <Section className="border-t border-hairline bg-cacao-deep">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Cómo trabajamos" : "How we work"}
            title={locale === "es" ? "El proceso, en seis pasos" : "The process, in six steps"}
          />
        </Reveal>

        <ol className="mt-14 flex flex-col">
          {process.map((step, index) => (
            <Reveal
              key={index}
              delay={index * 80}
              as="li"
              className="grid gap-4 border-t border-hairline py-8 lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-10"
            >
              <span className="font-display text-[15px] italic tabular text-terra">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-medium leading-tight text-cream">
                {t(step.title, locale)}
              </h3>
              <p className="prose-body">{t(step.body, locale)}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <Reveal>
          <SectionHead
            eyebrow={locale === "es" ? "Prueba" : "Proof"}
            title={locale === "es" ? "Lo que hay detrás del discurso" : "What's behind the pitch"}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 80} className="panel px-6 py-10">
              <p className="display text-[clamp(2.25rem,5vw,3.75rem)] text-cream">
                <Counter value={stat.value} />
              </p>
              <p className="mt-3 max-w-[18ch] text-[13px] leading-snug text-cream-dim">
                {t(stat.label, locale)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <BrandStrip locale={locale} />
        </Reveal>

        {mainCase && (
          <Reveal className="mt-16 rounded-lg border border-hairline bg-cacao-raised/40 p-8 lg:p-12">
            <p className="eyebrow mb-5">{locale === "es" ? "Caso" : "Case"}</p>
            <h3 className="display max-w-3xl text-h2 text-cream">
              {t(mainCase.title, locale)}
            </h3>
            <dl className="mt-10 grid gap-8 lg:grid-cols-3">
              <div>
                <dt className="eyebrow mb-3">{locale === "es" ? "El problema" : "The problem"}</dt>
                <dd className="prose-body text-small">
                  {t(mainCase.problem, locale)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-3">{locale === "es" ? "Qué hicimos" : "What we did"}</dt>
                <dd className="prose-body text-small">
                  {t(mainCase.action, locale)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-3">{locale === "es" ? "Resultado" : "Result"}</dt>
                <dd className="text-[15px] leading-relaxed text-cream">
                  {t(mainCase.result, locale)}
                </dd>
              </div>
            </dl>
            <Link
              href={href(locale, routes.cases)}
              className="mt-10 inline-block text-[13px] tracking-normal text-cream-dim underline underline-offset-4 transition-colors hover:text-gold"
            >
              {ui("cases", locale)} →
            </Link>
          </Reveal>
        )}
      </Section>

      {/* Cierre propio: en esta página el deck es la acción principal, así que
          no usamos la banda genérica. */}
      <section className="grain relative overflow-hidden border-t border-hairline bg-cacao-raised">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 120% at 80% 0%, rgba(218,173,75,0.20), transparent 60%), radial-gradient(70% 90% at 0% 100%, rgba(165,79,12,0.26), transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">{locale === "es" ? "Siguiente paso" : "Next step"}</p>
            <h2 className="display text-h1 text-cream">
              {locale === "es"
                ? "Llévate el deck corporativo."
                : "Take the corporate deck with you."}
            </h2>
            <p className="mt-6 max-w-xl lead">
              {locale === "es"
                ? "Modelos de operación, portafolio completo, proceso y estructura de honorarios. Te lo mandamos al correo."
                : "Operating models, full portfolio, process and fee structure. We'll send it to your inbox."}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href(locale, routes.deck)} variant="primary" arrow>
              {ui("downloadDeck", locale)}
            </ButtonLink>
              <ButtonLink href={href(locale, routes.contact)} variant="secondary" arrow>
              {ui("talkToUs", locale)}
            </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
