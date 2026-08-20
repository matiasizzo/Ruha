/**
 * Fuente única de contenido del sitio.
 *
 * Todo lo que RÜHA puede querer cambiar sin tocar diseño vive acá: cifras
 * agregadas, propiedades, marcas, equipo y textos. Cuando se conecte un CMS
 * (Sanity/Payload), este archivo es el esquema a replicar.
 *
 * Pendientes marcados con TODO son datos que el cliente todavía debe confirmar.
 */

export type Locale = "es" | "en";

/** Texto con las dos versiones de idioma. */
export type I18nText = Record<Locale, string>;

/* ------------------------------------------------------------------ */
/* Identidad                                                          */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "RÜHA",
  legalName: "SURHA Capital, S.A. de C.V.",
  // La diéresis es parte del nombre: no se omite nunca, tampoco en metadatos.
  tagline: {
    es: "Hotel operations & property management · Mexico",
    en: "Hotel operations & property management · Mexico",
  } satisfies I18nText,
  linkedin: "https://www.linkedin.com/company/ruha-hospitality-group",
  // TODO: definir dominio definitivo antes de publicar. No tocar los MX del
  // dominio donde vive el correo corporativo.
  siteUrl: "https://example.com",
  // TODO: enlace real del portal (Comunidad Feliz).
  ownersPortalUrl: "https://comunidadfeliz.com",
  email: "TODO@example.com",
} as const;

/* ------------------------------------------------------------------ */
/* Cifras agregadas del home                                           */
/* ------------------------------------------------------------------ */

/** TODO: cifras pendientes de confirmación del cliente (brief §9). */
export const stats: { value: number; suffix?: string; label: I18nText }[] = [
  { value: 642, label: { es: "Llaves en operación y pipeline", en: "Keys operating and in pipeline" } },
  { value: 6, label: { es: "Propiedades", en: "Properties" } },
  { value: 4, label: { es: "Destinos", en: "Destinations" } },
  { value: 5, label: { es: "Marcas internacionales", en: "International brands" } },
];

/* ------------------------------------------------------------------ */
/* Marcas de franquicia                                                */
/* ------------------------------------------------------------------ */

/**
 * El uso público de marca de franquicia suele requerir aprobación del
 * franquiciante. Por eso cada marca declara `logo` opcional: si el archivo no
 * está (o el franquiciante pide retirarlo), el componente cae a texto solo.
 */
export type Brand = {
  id: string;
  name: string;
  group: "Wyndham" | "IHG";
  /** Ruta en /public/brands. TODO: cargar los PNG de alta que pasa el cliente. */
  logo?: string;
  segment: I18nText;
};

export const brands: Brand[] = [
  {
    id: "ramada",
    name: "Ramada by Wyndham",
    group: "Wyndham",
    segment: { es: "Midscale internacional", en: "International midscale" },
  },
  {
    id: "dazzler",
    name: "Dazzler by Wyndham",
    group: "Wyndham",
    segment: { es: "Lifestyle upper-midscale", en: "Upper-midscale lifestyle" },
  },
  {
    id: "holiday-inn",
    name: "Holiday Inn",
    group: "IHG",
    segment: { es: "Midscale internacional", en: "International midscale" },
  },
  {
    id: "voco",
    name: "Vöco",
    group: "IHG",
    segment: { es: "Upscale premium", en: "Premium upscale" },
  },
];

export const brandGroups = [
  {
    id: "wyndham",
    name: "Wyndham Hotels & Resorts",
    blurb: {
      es: "El grupo hotelero con mayor número de propiedades del mundo. Distribución global, programa de lealtad Wyndham Rewards y estándares de operación por marca.",
      en: "The world's largest hotel group by number of properties. Global distribution, Wyndham Rewards loyalty programme and brand-level operating standards.",
    },
  },
  {
    id: "ihg",
    name: "IHG Hotels & Resorts",
    blurb: {
      es: "Grupo británico con presencia en más de cien países. Su programa IHG One Rewards y sus manuales de marca fijan el estándar operativo de cada propiedad.",
      en: "A British group present in more than a hundred countries. Its IHG One Rewards programme and brand manuals set each property's operating standard.",
    },
  },
] satisfies { id: string; name: string; blurb: I18nText }[];

/* ------------------------------------------------------------------ */
/* Portafolio                                                          */
/* ------------------------------------------------------------------ */

export type PropertyStatus = "operating" | "opening";

export type Property = {
  slug: string;
  name: string;
  brandId?: string;
  brandLabel?: string;
  city: I18nText;
  state: I18nText;
  keys?: number;
  units?: number;
  status: PropertyStatus;
  opening?: I18nText;
  /** Link saliente al sitio del hotel o del proyecto. Abre en pestaña nueva. */
  href?: string;
  /** TODO: fotos pendientes. Mientras no haya, la tarjeta usa su gradiente. */
  image?: string;
  summary: I18nText;
  facts?: { label: I18nText; value: I18nText }[];
};

export const properties: Property[] = [
  {
    slug: "casa-selva",
    name: "Ramada Residences by Wyndham Tulum",
    brandId: "ramada",
    brandLabel: "Ramada by Wyndham",
    city: { es: "Tulum", en: "Tulum" },
    state: { es: "Quintana Roo", en: "Quintana Roo" },
    keys: 190,
    units: 120,
    status: "opening",
    opening: { es: "Apertura 30 de octubre de 2026", en: "Opening 30 October 2026" },
    summary: {
      es: "Proyecto en régimen de condominio con rental pool y operación hotelera unificada, a unos metros del centro de Tulum. Conocido como Casa Selva.",
      en: "Condominium-regime project with a rental pool and unified hotel operation, steps from central Tulum. Known as Casa Selva.",
    },
    facts: [
      { label: { es: "Tipologías", en: "Room types" }, value: { es: "Estudio (140) · Doble (31) · Garden Doble (19)", en: "Studio (140) · Double (31) · Garden Double (19)" } },
      { label: { es: "Amenidades", en: "Amenities" }, value: { es: "Alberca rooftop, gym, coworking, lounge, área de yoga, estacionamiento", en: "Rooftop pool, gym, coworking, lounge, yoga area, parking" } },
    ],
  },
  {
    slug: "holiday-inn-tulum",
    name: "Holiday Inn Tulum",
    brandId: "holiday-inn",
    brandLabel: "Holiday Inn · IHG",
    city: { es: "Tulum", en: "Tulum" },
    state: { es: "Quintana Roo", en: "Quintana Roo" },
    keys: 120,
    status: "operating",
    summary: {
      es: "Operación bajo marca IHG en uno de los destinos de mayor crecimiento del Caribe mexicano.",
      en: "IHG-branded operation in one of the fastest-growing destinations in the Mexican Caribbean.",
    },
  },
  {
    slug: "macondo-5ta-avenida",
    name: "Macondo 5ta Avenida",
    brandLabel: undefined,
    city: { es: "Playa del Carmen", en: "Playa del Carmen" },
    state: { es: "Quintana Roo", en: "Quintana Roo" },
    units: 37,
    status: "operating",
    summary: {
      es: "Hotel patrimonial en operación: un solo dueño, propiedad completa, administrada por RÜHA.",
      en: "Single-owner hotel in operation: one asset, one owner, managed end to end by RÜHA.",
    },
  },
  {
    slug: "ixuh-beach-living",
    name: "IXUH Beach Living",
    city: { es: "Playa del Carmen", en: "Playa del Carmen" },
    state: { es: "Quintana Roo", en: "Quintana Roo" },
    units: 32,
    keys: 40,
    status: "operating",
    summary: {
      es: "Condominio con rental pool y operación hotelera unificada. Nuestro mejor caso de condohotel.",
      en: "Condominium with a rental pool and unified hotel operation. Our strongest condo-hotel case.",
    },
  },
  {
    slug: "dazzler-playa-del-carmen",
    name: "Dazzler by Wyndham Playa del Carmen",
    brandId: "dazzler",
    brandLabel: "Dazzler by Wyndham",
    city: { es: "Playa del Carmen", en: "Playa del Carmen" },
    state: { es: "Quintana Roo", en: "Quintana Roo" },
    keys: 64,
    status: "opening",
    opening: { es: "Apertura marzo 2027", en: "Opening March 2027" },
    href: "https://macondocorazon.com",
    summary: {
      es: "Siete niveles más rooftop a un minuto de la Quinta Avenida y tres de la playa. Proyecto Macondo Corazón.",
      en: "Seven floors plus rooftop, one minute from Fifth Avenue and three from the beach. The Macondo Corazón project.",
    },
    facts: [
      { label: { es: "Amenidades", en: "Amenities" }, value: { es: "Alberca infinita rooftop, sky bar, grill, gym, coworking, solárium, estacionamiento subterráneo", en: "Rooftop infinity pool, sky bar, grill, gym, coworking, solarium, underground parking" } },
      { label: { es: "Conectividad", en: "Access" }, value: { es: "45 minutos del aeropuerto de Cancún", en: "45 minutes from Cancún airport" } },
    ],
  },
  {
    slug: "voco-distrito-arte-merida",
    name: "Vöco Distrito Arte Mérida",
    brandId: "voco",
    brandLabel: "Vöco · IHG",
    city: { es: "Mérida", en: "Mérida" },
    state: { es: "Yucatán", en: "Yucatán" },
    keys: 210,
    status: "opening",
    opening: { es: "Pipeline 2027", en: "2027 pipeline" },
    summary: {
      es: "La propiedad de mayor escala del pipeline, fuera del corredor de la Riviera Maya.",
      en: "The largest property in the pipeline, outside the Riviera Maya corridor.",
    },
  },
];

/**
 * Property management: son propietarios privados y sus nombres no se publican
 * (brief §6). Sólo la frase agregada.
 */
export const privatePortfolioNote: I18nText = {
  es: "Además administramos un portafolio de villas, penthouses y desarrollos residenciales privados en la Riviera Maya.",
  en: "We also manage a portfolio of private villas, penthouses and residential developments across the Riviera Maya.",
};

/* ------------------------------------------------------------------ */
/* Imágenes flotantes del hero                                         */
/* ------------------------------------------------------------------ */

/**
 * PROVISIONAL. Fotos de stock de Unsplash, puestas para poder evaluar el
 * efecto del hero antes de que lleguen las fotos reales.
 *
 * Ninguna de estas imágenes es de una propiedad de RÜHA y no deben publicarse
 * como si lo fueran. Cuando lleguen las fotos: subirlas a /public/media y
 * cambiar `src` por la ruta local. Es lo único que hay que tocar.
 *
 * `label` y `meta` son reales y salen del portafolio: aunque la foto sea de
 * stock, lo que se lee sí comunica los dos mensajes del brief.
 */
export const heroMedia: { src: string; label: string; meta: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    label: "Tulum",
    meta: "Quintana Roo",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    label: "Ramada by Wyndham",
    meta: "Wyndham",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
    label: "Playa del Carmen",
    meta: "Quintana Roo",
  },
  {
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
    label: "Vöco",
    meta: "IHG",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop",
    label: "Holiday Inn",
    meta: "IHG",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    label: "Cancún",
    meta: "Quintana Roo",
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
    label: "Mérida",
    meta: "Yucatán",
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    label: "Dazzler by Wyndham",
    meta: "Wyndham",
  },
];

/* ------------------------------------------------------------------ */
/* Destinos para el mapa                                               */
/* ------------------------------------------------------------------ */

/**
 * Destinos del núcleo operativo, en coordenadas reales. El mapa los proyecta;
 * agregar un destino nuevo es agregar una línea acá.
 */
export const destinations: {
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** Lado al que sale la etiqueta. */
  side: "left" | "right";
  /**
   * Corrimiento vertical de la etiqueta, en unidades del viewBox del mapa.
   * Cancún, Playa y Tulum caen a menos de veinte píxeles uno de otro: sin
   * separarlos a mano los tres textos se pisan.
   */
  labelDy: number;
}[] = [
  { id: "cancun", name: "Cancún", lon: -86.85, lat: 21.16, side: "right", labelDy: -34 },
  { id: "playa", name: "Playa del Carmen", lon: -87.07, lat: 20.63, side: "right", labelDy: 0 },
  { id: "tulum", name: "Tulum", lon: -87.47, lat: 20.21, side: "right", labelDy: 34 },
  { id: "merida", name: "Mérida", lon: -89.62, lat: 20.97, side: "left", labelDy: 0 },
];

/* ------------------------------------------------------------------ */
/* Modelos de operación                                                */
/* ------------------------------------------------------------------ */

export const operatingModels = [
  {
    id: "patrimonial",
    title: { es: "Hotel patrimonial", en: "Single-owner hotel" },
    body: {
      es: "Un dueño, un hotel completo. Operamos bajo marca internacional y respondemos por el activo entero, del estándar de marca al estado de resultados.",
      en: "One owner, one whole hotel. We operate it under an international brand and answer for the entire asset, from brand standard to P&L.",
    },
    example: { es: "Macondo 5ta Avenida", en: "Macondo 5ta Avenida" },
  },
  {
    id: "condohotel",
    title: { es: "Condohotel · régimen en condominio", en: "Condo-hotel · condominium regime" },
    body: {
      es: "Muchos propietarios, unidades en rental pool y una sola operación hotelera. Sumamos la administración del condominio y el reporteo mensual a cada propietario.",
      en: "Many owners, units in a rental pool and a single hotel operation. We add condominium administration and monthly reporting to every owner.",
    },
    example: { es: "Casa Selva · IXUH", en: "Casa Selva · IXUH" },
  },
  {
    id: "rental",
    title: { es: "Renta vacacional y administración patrimonial", en: "Vacation rental and asset management" },
    body: {
      es: "Villas y departamentos individuales: comercialización en OTAs, home care y cuidado del activo. Es el origen de la casa y sigue siendo parte del negocio.",
      en: "Individual villas and apartments: OTA distribution, home care and asset upkeep. This is where the company started, and it is still part of the business.",
    },
    example: { es: "Portafolio de villas", en: "Villa portfolio" },
  },
] satisfies { id: string; title: I18nText; body: I18nText; example: I18nText }[];

/* ------------------------------------------------------------------ */
/* Proceso de trabajo (brief §7)                                       */
/* ------------------------------------------------------------------ */

export const process = [
  {
    title: { es: "Diagnóstico y estudio de mercado", en: "Diagnosis and market study" },
    body: {
      es: "Entendemos el activo, su competencia y su demanda real antes de prometer un número.",
      en: "We map the asset, its competitive set and its real demand before promising a number.",
    },
  },
  {
    title: { es: "Proyección financiera", en: "Financial projection" },
    body: {
      es: "Escenarios de ingreso, costo y rentabilidad para el propietario, con supuestos a la vista.",
      en: "Revenue, cost and profitability scenarios for the owner, with the assumptions on the table.",
    },
  },
  {
    title: { es: "Selección y gestión de marca", en: "Brand selection and management" },
    body: {
      es: "Elegimos la marca que le conviene al activo y llevamos el proceso con el franquiciante. Somos multimarca: no vendemos una sola bandera.",
      en: "We choose the brand that suits the asset and run the process with the franchisor. We are multi-brand: we are not selling one flag.",
    },
  },
  {
    title: { es: "Pre-apertura", en: "Pre-opening" },
    body: {
      es: "Presupuesto, ruta crítica, contratación y sistemas. Es la fase donde se gana o se pierde el primer año.",
      en: "Budget, critical path, hiring and systems. This is the phase where the first year is won or lost.",
    },
  },
  {
    title: { es: "Operación", en: "Operations" },
    body: {
      es: "Operación diaria bajo los manuales del franquiciante, comercialización y distribución.",
      en: "Day-to-day operation under the franchisor's manuals, plus commercial and distribution management.",
    },
  },
  {
    title: { es: "Reporteo mensual", en: "Monthly reporting" },
    body: {
      es: "Estado de resultados y de rentas cada mes, sin letra chica.",
      en: "P&L and rental statements every month, with no fine print.",
    },
  },
] satisfies { title: I18nText; body: I18nText }[];

/* ------------------------------------------------------------------ */
/* Servicios                                                           */
/* ------------------------------------------------------------------ */

export const services = [
  { es: "Selección y gestión de marca internacional", en: "International brand selection and management" },
  { es: "Apertura llave en mano", en: "Turnkey opening" },
  { es: "Operación hotelera diaria", en: "Day-to-day hotel operations" },
  { es: "Comercialización y distribución", en: "Commercial strategy and distribution" },
  { es: "Administración de condominio", en: "Condominium administration" },
  { es: "Reporteo mensual a propietarios", en: "Monthly owner reporting" },
  { es: "Home care y cuidado del activo", en: "Home care and asset upkeep" },
  { es: "Contratación y formación de equipos", en: "Hiring and team training" },
] satisfies I18nText[];

/* ------------------------------------------------------------------ */
/* Equipo                                                              */
/* ------------------------------------------------------------------ */

export const team = [
  {
    name: "Manuel González Guerrico",
    nickname: "Manu",
    role: { es: "Managing Partner", en: "Managing Partner" },
    /** TODO: trayectoria y retrato pendientes del cliente. */
    bio: {
      es: "Socio fundador. Dirige la relación con propietarios, franquiciantes e inversionistas.",
      en: "Founding partner. Leads relationships with owners, franchisors and investors.",
    },
  },
  {
    name: "Eduardo López",
    nickname: "Lalo",
    role: { es: "Director de Operaciones", en: "Director of Operations" },
    bio: {
      es: "Responsable de la operación diaria de las propiedades y del cumplimiento del estándar de marca.",
      en: "Responsible for day-to-day property operations and brand-standard compliance.",
    },
  },
  {
    name: "Juan José Valdez López",
    nickname: "Juanjo",
    role: { es: "Director Comercial", en: "Commercial Director" },
    bio: {
      es: "A cargo de comercialización, distribución y desempeño de ingresos del portafolio.",
      en: "In charge of commercial strategy, distribution and portfolio revenue performance.",
    },
  },
] satisfies { name: string; nickname: string; role: I18nText; bio: I18nText }[];

/* ------------------------------------------------------------------ */
/* Propósito (versión corta para el sitio, brief §8)                   */
/* ------------------------------------------------------------------ */

export const purpose = [
  {
    label: { es: "Propósito", en: "Purpose" },
    body: {
      es: "Hacemos que un activo hotelero opere como debe: con estándar de marca internacional, números claros y gente que responde.",
      en: "We make a hotel asset operate the way it should: to international brand standard, with clear numbers and people who answer.",
    },
  },
  {
    label: { es: "Hacia dónde vamos", en: "Where we are going" },
    body: {
      es: "Ser la operadora multimarca de referencia en México para desarrolladores que quieren marca internacional sin perder el trato cercano.",
      en: "To become Mexico's reference multi-brand operator for developers who want an international brand without losing a close working relationship.",
    },
  },
  {
    label: { es: "Cómo trabajamos", en: "How we work" },
    body: {
      es: "Transparencia con el propietario, rigor operativo y presencia en sitio.",
      en: "Transparency with the owner, operational rigour and presence on site.",
    },
  },
] satisfies { label: I18nText; body: I18nText }[];

export const values = [
  {
    title: { es: "Transparencia con el propietario", en: "Transparency with the owner" },
    body: { es: "Estado de resultados y de rentas mensual, sin letra chica.", en: "Monthly P&L and rental statements, with no fine print." },
  },
  {
    title: { es: "Todo documentado", en: "Everything documented" },
    body: { es: "Inventarios, entregas y acuerdos por escrito. Lo que no está documentado no existe.", en: "Inventories, handovers and agreements in writing. What is not documented does not exist." },
  },
  {
    title: { es: "Estándar de marca", en: "Brand standard" },
    body: { es: "Operamos bajo los manuales del franquiciante, no bajo criterios propios, sea cual sea la marca.", en: "We operate under the franchisor's manuals, not our own criteria, whichever the brand." },
  },
  {
    title: { es: "Presencia en sitio", en: "Presence on site" },
    body: { es: "Los socios están en las propiedades, no sólo en la junta.", en: "The partners are at the properties, not only in the boardroom." },
  },
  {
    title: { es: "Alineación de intereses", en: "Aligned interests" },
    body: { es: "Nos va bien cuando al propietario le va bien.", en: "We do well when the owner does well." },
  },
] satisfies { title: I18nText; body: I18nText }[];

/* ------------------------------------------------------------------ */
/* Casos                                                               */
/* ------------------------------------------------------------------ */

export const cases = [
  {
    slug: "casa-selva",
    title: { es: "Casa Selva: de proyecto en obra a apertura bajo marca Wyndham", en: "Casa Selva: from a project under construction to a Wyndham-branded opening" },
    problem: {
      es: "Un desarrollo en régimen de condominio con 120 unidades vendidas a propietarios distintos y sin operación hotelera definida.",
      en: "A condominium-regime development with 120 units sold to different owners and no defined hotel operation.",
    },
    action: {
      es: "Diagnóstico y proyección, selección de marca y gestión de la franquicia con Wyndham, armado del rental pool, ruta crítica de pre-apertura, contratación y sistemas.",
      en: "Diagnosis and projection, brand selection and franchise management with Wyndham, rental-pool structuring, pre-opening critical path, hiring and systems.",
    },
    /** TODO: resultado a confirmar con el cliente al momento de publicar. */
    result: {
      es: "190 llaves listas para operar bajo Ramada by Wyndham en la fecha comprometida.",
      en: "190 keys ready to operate under Ramada by Wyndham on the committed date.",
    },
  },
] satisfies { slug: string; title: I18nText; problem: I18nText; action: I18nText; result: I18nText }[];

/* ------------------------------------------------------------------ */
/* Bolsa de trabajo                                                    */
/* ------------------------------------------------------------------ */

/** TODO: confirmar vacantes vigentes y correo de recepción de CVs. */
export const jobFamilies = [
  { es: "Gerencia de propiedad", en: "Property management" },
  { es: "Ama de llaves y camaristas", en: "Housekeeping" },
  { es: "Mantenimiento", en: "Maintenance" },
  { es: "Ventas y recepción", en: "Sales and front desk" },
] satisfies I18nText[];
