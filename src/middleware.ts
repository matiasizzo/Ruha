import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Toda página vive bajo /es o /en. Si alguien entra a la raíz —o a una ruta
 * sin idioma— lo mandamos al idioma que dice su navegador, con español como
 * salida por defecto.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accepts = request.headers.get("accept-language") ?? "";
  const preferred = accepts.toLowerCase().startsWith("en") ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Todo menos assets estáticos, la API y los archivos con extensión.
  matcher: ["/((?!_next|api|media|brands|.*\\..*).*)"],
};
