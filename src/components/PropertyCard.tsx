import type { Locale, Property } from "@/content/site";
import { t, ui } from "@/lib/i18n";
import { RoundArrowLink } from "./brand/BrandArrow";

/**
 * Tarjeta de propiedad, con el esquema de Chaletô:
 *  - foto apaisada (1.4), sin redondear;
 *  - sello en la esquina inferior derecha, con sólo esa esquina redondeada.
 *    Donde Chaletô pone el precio, RÜHA pone las llaves o el año de apertura:
 *    el sitio no vende noches;
 *  - título, ubicación con pin y datos separados por filetes verticales.
 *
 * Toda la tarjeta es el enlace saliente al sitio del hotel, en pestaña nueva,
 * tal como pide el brief.
 */
export default function PropertyCard({
  property,
  locale,
}: {
  property: Property;
  locale: Locale;
  /** Se mantiene por compatibilidad con los listados que ya la pasan. */
  index?: number;
}) {
  const isOperating = property.status === "operating";

  // Sello: si abre, el año manda; si opera, las llaves.
  const openingYear = property.opening ? t(property.opening, locale).match(/\d{4}/)?.[0] : undefined;
  const seal = !isOperating && openingYear
    ? { top: ui("opening", locale), main: openingYear }
    : property.keys
      ? { top: ui("operating", locale), main: `${property.keys} ${ui("keys", locale)}` }
      : { top: ui("operating", locale), main: `${property.units} ${ui("units", locale)}` };

  const specs = [
    property.keys ? `${property.keys} ${ui("keys", locale)}` : null,
    property.units ? `${property.units} ${ui("units", locale)}` : null,
    property.brandLabel ?? null,
  ].filter(Boolean) as string[];

  const body = (
    <>
      <div className="relative aspect-[1.4] overflow-hidden bg-page-alt">
        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="photo-placeholder grain h-full w-full" aria-hidden="true" />
        )}

        <div
          className={`absolute bottom-0 right-0 flex flex-col items-end gap-0.5 rounded-tl-lg px-4 py-3 text-page ${
            isOperating ? "bg-terra" : "bg-ink"
          }`}
        >
          <span className="text-[12px]">{seal.top}</span>
          <span className="text-[15px] font-semibold">{seal.main}</span>
        </div>
      </div>

      <div className="flex grow flex-col gap-3 pt-4">
        <h3 className="text-[19px] font-medium leading-snug text-ink transition-colors group-hover:text-terra">
          {property.name}
        </h3>

        <p className="flex items-start gap-1.5 text-[14px] text-ink-soft">
          <PinIcon />
          {t(property.city, locale)}, {t(property.state, locale)}
        </p>

        {specs.length > 0 && (
          <ul className="mt-auto flex flex-wrap items-center text-[14px] text-ink">
            {specs.map((spec, index) => (
              <li key={spec} className="flex items-center">
                {index > 0 && <span className="mx-3 h-4 w-px bg-line-strong" aria-hidden="true" />}
                {spec}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (!property.href) {
    return <article className="group flex h-full flex-col pb-2">{body}</article>;
  }

  return (
    <a
      href={property.href}
      target="_blank"
      rel="noopener noreferrer"
      title={ui("externalLink", locale)}
      className="group flex h-full flex-col pb-2"
    >
      {body}
    </a>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 20" className="mt-0.5 h-4 w-auto shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7.35c2.03-1.87 3.54-3.56 4.53-5.09.98-1.53 1.47-2.88 1.47-4.06 0-1.82-.58-3.3-1.74-4.46A5.9 5.9 0 0 0 8 2c-1.68 0-3.1.58-4.26 1.74C2.58 4.9 2 6.38 2 8.2c0 1.18.49 2.53 1.47 4.06.99 1.53 2.5 3.22 4.53 5.09ZM8 20c-2.68-2.28-4.69-4.4-6.01-6.36C.66 11.68 0 9.87 0 8.2 0 5.7.8 3.71 2.41 2.23A7.7 7.7 0 0 1 8 0c2.12 0 3.98.74 5.59 2.23C15.2 3.71 16 5.7 16 8.2c0 1.67-.66 3.48-1.99 5.44C12.69 15.6 10.68 17.72 8 20Z" />
    </svg>
  );
}

/** Último bloque de la grilla o el carrusel: "Ver todo", en color de marca. */
export function SeeAllCard({ href, locale }: { href: string; locale: Locale }) {
  const label = locale === "es" ? "Ver todo el portafolio" : "See the full portfolio";
  return (
    <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-8 bg-terra p-8 text-center text-page">
      <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium italic leading-tight">
        {locale === "es" ? "Ver todo" : "See all"}
      </p>
      <RoundArrowLink href={href} label={label} tone="light" />
    </div>
  );
}
