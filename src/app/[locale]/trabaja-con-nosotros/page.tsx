import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { jobFamilies } from "@/content/site";
import { isLocale, t } from "@/lib/i18n";
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
  return { title: locale === "en" ? "Careers" : "Trabaja con nosotros" };
}

/**
 * Bolsa de trabajo. Hoy esto se resuelve por WhatsApp; una página con
 * formulario ahorra trabajo real al equipo.
 */
export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Trabaja con nosotros" : "Careers"}
        title={
          locale === "es"
            ? "Contratamos todo el año, en todas las propiedades."
            : "We hire all year round, across every property."
        }
        intro={
          locale === "es"
            ? "Operamos bajo estándares de marca internacional, y eso empieza por la gente que está en el piso."
            : "We operate to international brand standards, and that starts with the people on the floor."
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24">
          <Reveal>
            <p className="eyebrow mb-6">
              {locale === "es" ? "Perfiles que buscamos" : "Roles we look for"}
            </p>
            <ul className="flex flex-col">
              {jobFamilies.map((family, index) => (
                <li
                  key={index}
                  className="border-t border-hairline py-5 text-[17px] leading-relaxed text-cream"
                >
                  {t(family, locale)}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-[14px] leading-relaxed text-cream-faint">
              {locale === "es"
                ? "Si tu perfil no está en la lista pero crees que sumas, escríbenos igual: el portafolio crece y las vacantes cambian cada mes."
                : "If your profile isn't on the list but you think you'd add something, write anyway: the portfolio is growing and openings change every month."}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm kind="job" locale={locale} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
