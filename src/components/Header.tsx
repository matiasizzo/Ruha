"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/site";
import { dict, href, locales, routes, t, ui } from "@/lib/i18n";
import Wordmark from "./Wordmark";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al navegar.
  useEffect(() => setOpen(false), [pathname]);

  /** Misma página, otro idioma. */
  const swapLocale = (target: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return href(target, rest);
  };

  // Sobre el video del home y sin scroll, el header va en blanco; al bajar o
  // abrir el menú vuelve al fondo claro con texto café.
  const overHero = pathname === href(locale) && !scrolled && !open;

  const isActive = (route: string) => {
    const full = href(locale, route);
    return route === "" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <header
      data-over={overHero}
      className={`group fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-page/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-5 lg:px-12">
        <Link href={href(locale)} className="shrink-0">
          {/* Terracota sobre la base clara; crema encima del video del hero. */}
          <Wordmark className="h-9 w-auto text-terra transition-colors group-data-[over=true]:text-cream" />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {dict.nav.map((item) => (
            <Link
              key={item.route}
              href={href(locale, item.route)}
              className={`text-[13px] transition-colors hover:text-ink group-data-[over=true]:text-white/90 group-data-[over=true]:hover:text-white ${
                isActive(item.route) ? "text-gold-ink" : "text-ink-soft"
              }`}
            >
              {t(item.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <div className="hidden items-center gap-2 md:flex">
            {locales.map((code) => (
              <Link
                key={code}
                href={swapLocale(code)}
                className={`text-[13px] tracking-normal transition-colors group-data-[over=true]:text-white ${
                  code === locale ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                }`}
                hrefLang={code}
              >
                {code}
              </Link>
            ))}
          </div>

          <Link
            href={href(locale, routes.deck)}
            className="hidden rounded-full bg-terra px-6 py-2.5 text-[13px] font-medium text-page transition-colors hover:bg-ink hover:text-page md:block"
          >
            {ui("downloadDeck", locale)}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? ui("close", locale) : ui("menu", locale)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 group-data-[over=true]:bg-white ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 group-data-[over=true]:bg-white ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-line transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[80vh]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {dict.nav.map((item) => (
            <Link
              key={item.route}
              href={href(locale, item.route)}
              className="border-b border-line py-3 text-[15px] text-ink-soft"
            >
              {t(item.label, locale)}
            </Link>
          ))}
          <Link
            href={href(locale, routes.jobs)}
            className="border-b border-line py-3 text-[15px] text-ink-soft"
          >
            {ui("jobs", locale)}
          </Link>
          <div className="flex gap-4 py-4">
            {locales.map((code) => (
              <Link
                key={code}
                href={swapLocale(code)}
                className={`text-[14px] uppercase ${
                  code === locale ? "text-gold-ink" : "text-ink-faint"
                }`}
                hrefLang={code}
              >
                {code}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
