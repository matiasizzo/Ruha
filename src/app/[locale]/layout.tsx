import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
import { isLocale, locales, t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

// Poppins es la tipografía de la identidad de Monarca.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang={locale} className={poppins.variable}>
      <body className="min-h-screen bg-cacao">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-cream focus:px-4 focus:py-2 focus:text-cacao"
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
