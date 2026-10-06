import Link from "next/link";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
import { dict, href, routes, t, ui } from "@/lib/i18n";
import { RoundArrowLink } from "./brand/BrandArrow";
import DropPattern from "./brand/DropPattern";
import Wordmark from "./Wordmark";

/**
 * Footer oscuro con el logotipo de lado a lado, como el de Chaletô.
 *
 * Es el único bloque café oscuro del sitio junto con uno de los bloques por
 * audiencia: la base sigue siendo clara, como pidió la devolución, y el
 * oscuro queda para cerrar.
 *
 * El logo gigante es el oficial en su variante crema, a todo el ancho.
 */

const columnTitle = "text-[15px] font-medium text-page";
const link = "text-[15px] text-page/70 transition-colors hover:text-gold";

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-cacao text-page">
      <DropPattern className="pointer-events-none absolute inset-x-0 top-0 h-80 text-gold" opacity={0.08} />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-8 pt-20 lg:px-12">
        <div className="flex flex-col gap-14 xl:flex-row xl:justify-between">
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-tight tracking-[-0.02em]">
                {locale === "es" ? "Hablemos de tu activo." : "Let's talk about your asset."}
              </p>
              <p className="mt-2 text-[17px] text-page/70">{brand.email}</p>
            </div>
            <RoundArrowLink
              href={href(locale, routes.contact)}
              label={locale === "es" ? "Ir a contacto" : "Go to contact"}
              tone="light"
            />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:gap-16">
            <nav className="flex flex-col gap-3" aria-label={locale === "es" ? "Sitio" : "Site"}>
              <p className={columnTitle}>{locale === "es" ? "Sitio" : "Site"}</p>
              {dict.nav.map((item) => (
                <Link key={item.route} href={href(locale, item.route)} className={link}>
                  {t(item.label, locale)}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-3" aria-label={locale === "es" ? "Más" : "More"}>
              <p className={columnTitle}>{locale === "es" ? "Más" : "More"}</p>
              <Link href={href(locale, routes.cases)} className={link}>
                {ui("cases", locale)}
              </Link>
              <Link href={href(locale, routes.openings)} className={link}>
                {ui("openings", locale)}
              </Link>
              <Link href={href(locale, routes.jobs)} className={link}>
                {ui("jobs", locale)}
              </Link>
              <Link href={href(locale, routes.privacy)} className={link}>
                {ui("privacy", locale)}
              </Link>
            </nav>

            <nav className="flex flex-col gap-3" aria-label={locale === "es" ? "Enlaces" : "Links"}>
              <p className={columnTitle}>{locale === "es" ? "Enlaces" : "Links"}</p>
              <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                LinkedIn ↗
              </a>
            </nav>
          </div>
        </div>

        {/* Logo de lado a lado. */}
        <Wordmark className="mt-20 h-auto w-full text-cream" />

        <div className="mt-8 flex flex-col gap-3 border-t border-page/15 pt-6 text-[13px] text-page/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name} · {brand.legalName}
          </p>
          <p>{locale === "es" ? "Riviera Maya · México" : "Riviera Maya · Mexico"}</p>
        </div>
      </div>
    </footer>
  );
}
