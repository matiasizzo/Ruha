"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/site";
import { brand } from "@/content/site";
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

  const isActive = (route: string) => {
    const full = href(locale, route);
    return route === "" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-cacao-deep/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-5 lg:px-12">
        <Link href={href(locale)} className="shrink-0">
          {/* 18px es el mínimo con el que la "A" gota del logo sigue legible. */}
          <Wordmark className="text-[18px]" />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {dict.nav.map((item) => (
            <Link
              key={item.route}
              href={href(locale, item.route)}
              className={`text-[13px] transition-colors hover:text-cream ${
                isActive(item.route) ? "text-gold" : "text-cream-dim"
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
                className={`text-[13px] tracking-normal transition-colors ${
                  code === locale ? "text-cream" : "text-cream-faint hover:text-cream-dim"
                }`}
                hrefLang={code}
              >
                {code}
              </Link>
            ))}
          </div>

          <a
            href={brand.ownersPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-hairline-strong px-5 py-2.5 text-[13px] text-cream-dim transition-colors hover:border-gold hover:text-gold xl:block"
          >
            {ui("ownersPortal", locale)}
          </a>

          <Link
            href={href(locale, routes.deck)}
            className="hidden rounded-full bg-terra px-6 py-2.5 text-[13px] font-medium text-cream transition-colors hover:bg-gold hover:text-cacao md:block"
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
              className={`block h-px w-5 bg-cream transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-cream transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-hairline transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[80vh]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {dict.nav.map((item) => (
            <Link
              key={item.route}
              href={href(locale, item.route)}
              className="border-b border-hairline py-3 text-[15px] text-cream-dim"
            >
              {t(item.label, locale)}
            </Link>
          ))}
          <Link
            href={href(locale, routes.jobs)}
            className="border-b border-hairline py-3 text-[15px] text-cream-dim"
          >
            {ui("jobs", locale)}
          </Link>
          <a
            href={brand.ownersPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-hairline py-3 text-[15px] text-cream-dim"
          >
            {ui("ownersPortal", locale)}
          </a>
          <div className="flex gap-4 py-4">
            {locales.map((code) => (
              <Link
                key={code}
                href={swapLocale(code)}
                className={`text-[14px] uppercase ${
                  code === locale ? "text-gold" : "text-cream-faint"
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
