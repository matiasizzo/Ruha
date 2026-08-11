import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { privatePortfolioNote, properties } from "@/content/site";
import { href, isLocale, routes, t, ui } from "@/lib/i18n";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Portfolio" : "Portafolio" };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Portafolio" : "Portfolio"}
        title={
          locale === "es"
            ? "Seis propiedades, cuatro destinos, dos grupos hoteleros."
            : "Six properties, four destinations, two hotel groups."
        }
        intro={
          locale === "es"
            ? "Cada tarjeta lleva al sitio del hotel o del proyecto. Las reservas se hacen ahí, no aquí."
            : "Each card links out to the hotel or project website. Bookings happen there, not here."
        }
      />

      <Section>
        <PortfolioGrid properties={properties} locale={locale} />

        <Reveal className="mt-14 border-t border-hairline pt-10">
          <p className="max-w-2xl text-[16px] leading-relaxed text-cream-dim">
            {t(privatePortfolioNote, locale)}
          </p>
          <Link
            href={href(locale, routes.openings)}
            className="mt-8 inline-block border border-hairline-strong px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {ui("openings", locale)}
          </Link>
        </Reveal>
      </Section>

      <CTABand locale={locale} />
    </>
  );
}
