import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
import { isLocale, locales, t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandLoader, { introScript } from "@/components/brand/BrandLoader";
import "../globals.css";

// Poppins es la tipografía de la identidad de Monarca y, como pide el brief,
// la única del sitio. La cursiva se carga para los titulares grandes de los
// bloques por audiencia.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const current: Locale = isLocale(locale) ? locale : "es";

  const description =
    current === "es"
      ? "Operadora hotelera multimarca y administradora de propiedades en México. Operamos bajo marcas internacionales de Wyndham e IHG."
      : "Multi-brand hotel operator and property manager in Mexico. We operate under international Wyndham and IHG brands.";

  return {
    metadataBase: new URL(brand.siteUrl),
    // La diéresis es parte del nombre y tampoco se omite en los metadatos.
    title: {
      default: `${brand.name} · ${t(brand.tagline, current)}`,
      template: `%s · ${brand.name}`,
    },
    description,
    alternates: {
      canonical: `/${current}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      // Los enlaces se comparten sobre todo por WhatsApp: la tarjeta importa.
      type: "website",
      siteName: brand.name,
      title: `${brand.name} · ${t(brand.tagline, current)}`,
      description,
      locale: current === "es" ? "es_MX" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Antes de pintar: decide si el cargador de entrada ya se vio. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-screen bg-page">
        <BrandLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-page"
        >
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
