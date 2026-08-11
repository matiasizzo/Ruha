import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Privacy notice" : "Aviso de privacidad" };
}

/**
 * BORRADOR. Es obligatorio en México en cuanto hay formularios, y el sitio
 * tiene tres. Este texto es una base de trabajo, no un documento legal:
 * tiene que revisarlo y firmarlo un abogado en México antes de publicar,
 * con los datos del responsable y el domicilio reales.
 */
export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const sections =
    locale === "es"
      ? [
          {
            title: "Responsable",
            body: `${brand.legalName}, con domicilio en [DOMICILIO FISCAL], es responsable del tratamiento de tus datos personales.`,
          },
          {
            title: "Datos que recabamos",
            body: "Nombre, correo electrónico, teléfono, empresa y la información que decidas incluir en el mensaje. En las postulaciones de empleo, además, el currículum que adjuntes.",
          },
          {
            title: "Para qué los usamos",
            body: "Para responder tu solicitud, hacerte llegar el material que pediste, dar seguimiento comercial y, en el caso de postulaciones, evaluar tu candidatura. No vendemos ni compartimos tus datos con terceros con fines comerciales.",
          },
          {
            title: "Conservación",
            body: "Conservamos los datos mientras exista una relación o un interés legítimo de seguimiento, y los eliminamos cuando lo solicites.",
          },
          {
            title: "Derechos ARCO",
            body: `Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos escribiendo a ${brand.email}. Responderemos en los plazos que marca la ley.`,
          },
          {
            title: "Cookies",
            body: "Usamos medición de tráfico para entender cómo se usa el sitio. No usamos cookies publicitarias ni de seguimiento entre sitios.",
          },
          {
            title: "Cambios",
            body: "Si este aviso cambia, publicaremos la versión actualizada en esta misma página.",
          },
        ]
      : [
          {
            title: "Data controller",
            body: `${brand.legalName}, with registered address at [REGISTERED ADDRESS], is responsible for processing your personal data.`,
          },
          {
            title: "Data we collect",
            body: "Name, email address, phone number, company and whatever you choose to include in your message. For job applications, also the CV you attach.",
          },
          {
            title: "How we use it",
            body: "To answer your enquiry, send you the material you requested, follow up commercially and, for applications, assess your candidacy. We do not sell or share your data with third parties for commercial purposes.",
          },
          {
            title: "Retention",
            body: "We keep your data while a relationship or a legitimate follow-up interest exists, and delete it whenever you ask us to.",
          },
          {
            title: "Your rights",
            body: `You may access, rectify, cancel or object to the processing of your data by writing to ${brand.email}. We will respond within the periods set by law.`,
          },
          {
            title: "Cookies",
            body: "We measure traffic to understand how the site is used. We do not use advertising or cross-site tracking cookies.",
          },
          {
            title: "Changes",
            body: "If this notice changes, we will publish the updated version on this page.",
          },
        ];

  return (
    <>
      <PageHero
        eyebrow={locale === "es" ? "Legal" : "Legal"}
        title={locale === "es" ? "Aviso de privacidad" : "Privacy notice"}
        intro={
          locale === "es"
            ? "Borrador pendiente de revisión legal. No publicar sin la firma del abogado."
            : "Draft pending legal review. Do not publish without sign-off."
        }
      />

      <Section>
        <div className="flex max-w-3xl flex-col">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-hairline py-8">
              <h2 className="text-[19px] font-medium text-cream">{section.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-cream-dim">{section.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
