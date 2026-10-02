import Link from "next/link";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
import { dict, href, routes, t, ui } from "@/lib/i18n";
import Wordmark from "./Wordmark";

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-page-alt">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Wordmark className="text-[22px]" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {t(brand.tagline, locale)}
            </p>
            <p className="mt-6 text-[13px] tracking-normal text-ink-faint">
              {brand.legalName}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow">{locale === "es" ? "Sitio" : "Site"}</span>
              {dict.nav.map((item) => (
                <Link
                  key={item.route}
                  href={href(locale, item.route)}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {t(item.label, locale)}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-3">
              <span className="eyebrow">{locale === "es" ? "Más" : "More"}</span>
              <Link
                href={href(locale, routes.cases)}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {ui("cases", locale)}
              </Link>
              <Link
                href={href(locale, routes.openings)}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {ui("openings", locale)}
              </Link>
              <Link
                href={href(locale, routes.jobs)}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {ui("jobs", locale)}
              </Link>
              <Link
                href={href(locale, routes.privacy)}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {ui("privacy", locale)}
              </Link>
            </nav>

            <nav className="flex flex-col gap-3">
              <span className="eyebrow">{locale === "es" ? "Enlaces" : "Links"}</span>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                LinkedIn ↗
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] tracking-normal text-ink-faint">
            © {year} {brand.name}
          </p>
          <p className="text-[13px] tracking-normal text-ink-faint">
            {locale === "es" ? "Riviera Maya · México" : "Riviera Maya · Mexico"}
          </p>
        </div>
      </div>
    </footer>
  );
}
