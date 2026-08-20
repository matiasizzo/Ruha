import type { Locale, Property } from "@/content/site";
import { t, ui } from "@/lib/i18n";

/**
 * Tarjeta de propiedad. Toda la tarjeta es el enlace saliente al sitio del
 * hotel, en pestaña nueva, tal como pide el brief.
 *
 * Mientras no lleguen las fotos, la imagen se resuelve con un degradado de
 * marca en lugar de un placeholder gris: el grid se ve terminado desde hoy y
 * cambiarlo después es agregar `image` en site.ts.
 */
export default function PropertyCard({
  property,
  locale,
  index = 0,
}: {
  property: Property;
  locale: Locale;
  index?: number;
}) {
  const isOperating = property.status === "operating";
  const meta = [
    property.keys ? `${property.keys} ${ui("keys", locale)}` : null,
    property.units ? `${property.units} ${ui("units", locale)}` : null,
  ].filter(Boolean);

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="grain h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(155deg,#3B2312 0%,#271406 55%,#180B02 100%)"
                  : "linear-gradient(155deg,#4A2A12 0%,#2E1708 60%,#180B02 100%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span
            className={`text-[13px] tracking-normal ${
              isOperating ? "text-gold" : "text-cream-dim"
            }`}
          >
            {isOperating ? ui("operating", locale) : ui("opening", locale)}
          </span>
        </div>

        {/* El logo de la marca es la prueba visual de que somos multimarca.
            TODO: sustituir por el PNG del franquiciante cuando esté aprobado;
            hasta entonces va el nombre en texto, que no requiere permiso. */}
        {property.brandLabel && (
          <div className="absolute inset-x-0 bottom-0 border-t border-hairline bg-cacao-deep/72 px-4 py-2.5 backdrop-blur-sm">
            <span className="text-[13px] tracking-normal text-cream-dim">
              {property.brandLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-h3 font-medium leading-tight text-cream">{property.name}</h3>
        <p className="text-[13px] tracking-normal text-cream-faint">
          {t(property.city, locale)} · {t(property.state, locale)}
          {meta.length > 0 && ` · ${meta.join(" · ")}`}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-cream-dim">
          {t(property.summary, locale)}
        </p>
        {property.opening && (
          <p className="mt-1 text-[13px] tracking-normal text-terra">
            {t(property.opening, locale)}
          </p>
        )}
        {property.href && (
          <span className="mt-auto pt-4 text-[13px] tracking-normal text-cream-faint transition-colors group-hover:text-gold">
            {ui("visitSite", locale)} ↗
          </span>
        )}
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden rounded-3xl border border-hairline bg-cacao-raised/40 transition-colors duration-500 hover:border-hairline-strong";

  if (!property.href) {
    return <article className={className}>{inner}</article>;
  }

  return (
    <a
      href={property.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={ui("externalLink", locale)}
    >
      {inner}
    </a>
  );
}
