import type { I18nText, Locale } from "@/content/site";

export const locales = ["es", "en"] as const;
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Toma el texto del idioma activo. */
export function t(text: I18nText, locale: Locale): string {
  return text[locale];
}

/** Construye una ruta con prefijo de idioma. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Los slugs son los mismos en ambos idiomas a propósito: un solo árbol de
 * archivos, enlaces que sobreviven al cambio de idioma y nada que sincronizar.
 * Si más adelante se quieren slugs traducidos, se resuelve con un mapa acá.
 */
export const routes = {
  home: "",
  about: "nosotros",
  what: "que-hacemos",
  portfolio: "portafolio",
  openings: "portafolio/aperturas",
  brands: "marcas",
  developers: "desarrolladores",
  deck: "desarrolladores/deck",
  cases: "casos",
  contact: "contacto",
  jobs: "trabaja-con-nosotros",
  privacy: "aviso-de-privacidad",
} as const;

type Dict = {
  nav: { label: I18nText; route: string }[];
  ui: Record<string, I18nText>;
};

export const dict: Dict = {
  nav: [
    { label: { es: "Quiénes somos", en: "About" }, route: routes.about },
    { label: { es: "Qué hacemos", en: "What we do" }, route: routes.what },
    { label: { es: "Portafolio", en: "Portfolio" }, route: routes.portfolio },
    { label: { es: "Marcas", en: "Brands" }, route: routes.brands },
    { label: { es: "Para desarrolladores", en: "For developers" }, route: routes.developers },
    { label: { es: "Contacto", en: "Contact" }, route: routes.contact },
  ],
  ui: {
    ownersPortal: { es: "Portal de Propietarios", en: "Owners' Portal" },
    downloadDeck: { es: "Descargar el deck", en: "Download the deck" },
    talkToUs: { es: "Hablemos de tu activo", en: "Let's talk about your asset" },
    viewPortfolio: { es: "Ver el portafolio", en: "See the portfolio" },
    operating: { es: "En operación", en: "Operating" },
    opening: { es: "Próxima apertura", en: "Opening soon" },
    keys: { es: "llaves", en: "keys" },
    units: { es: "unidades", en: "units" },
    visitSite: { es: "Sitio del hotel", en: "Hotel website" },
    allBrands: { es: "Todas", en: "All" },
    menu: { es: "Menú", en: "Menu" },
    close: { es: "Cerrar", en: "Close" },
    photoPending: { es: "Imagen pendiente", en: "Image pending" },
    externalLink: { es: "Abre en una pestaña nueva", en: "Opens in a new tab" },
    jobs: { es: "Trabaja con nosotros", en: "Careers" },
    privacy: { es: "Aviso de privacidad", en: "Privacy notice" },
    cases: { es: "Casos", en: "Cases" },
    openings: { es: "Próximas aperturas", en: "Upcoming openings" },
    backToPortfolio: { es: "Volver al portafolio", en: "Back to the portfolio" },
  },
};

/** Atajo para las etiquetas de interfaz. */
export function ui(key: keyof typeof dict.ui, locale: Locale): string {
  return dict.ui[key][locale];
}
